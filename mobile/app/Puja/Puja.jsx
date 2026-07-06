import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, Alert, ScrollView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

import { pujaStyles as styles, PujaTheme } from '../../styles/puja/Puja';
import PaymentModal from '../../components/MetodoPagoModulo';
import BottomNav from '../../components/BottomNav';

import PopupLimiteExcedido from './PopUps/PopupLimiteExcedido';
import PopupMontoInsuficiente from './PopUps/PopupMontoInsuficiente';
import PopupPujaExitosa from './PopUps/PopupPujaExitosa';

import { obtenerMediosPagoFormateados } from '../../services/paymentService';

export default function PujaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { subastaId, articuloId } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [showLimite, setShowLimite] = useState(false);
  const [showInsuficiente, setShowInsuficiente] = useState(false);
  const [showExito, setShowExito] = useState(false);

  const [articuloInfo, setArticuloInfo] = useState(null);
  const [subastaInfo, setSubastaInfo] = useState(null);
  const [pujaActual, setPujaActual] = useState(null);

  const [limiteMin, setLimiteMin] = useState(0);
  const [limiteMax, setLimiteMax] = useState(Infinity);
  const [isPremium, setIsPremium] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [articuloId]);

  useEffect(() => {
    const cargarMediosPago = async () => {
      try {
        const metodos = await obtenerMediosPagoFormateados();
        if (metodos.length > 0) {
          setPaymentMethods(metodos);
          setSelectedPayment(metodos[0]);
        }
      } catch (error) {
        console.error("Error cargando métodos de pago", error);
      }
    };
    cargarMediosPago();
  }, []);

  useEffect(() => {
    if (!subastaId || !articuloId) return;

    let intervalId;

    const fetchEstadoPuja = async () => {
      try {
        const res = await fetch(`${API_URL}/subastas/${subastaId}/articulos/${articuloId}/pujas/estado`);
        if (res.ok) {
          const data = await res.json();

          setArticuloInfo(data.articulo);
          setSubastaInfo(data.subasta);
          setPujaActual(data.pujaActual);

          const baseValue = data.articulo?.precioBase || 0;
          const currentOffer = data.pujaActual ? data.pujaActual.monto : null;

          const userDataString = await AsyncStorage.getItem('userData');
          if (!userDataString) return;
          const usuario = JSON.parse(userDataString);

          const categoria = usuario.categoria;
          const esPremium = categoria === 'oro' || categoria === 'platino';
          setIsPremium(esPremium);

          if (esPremium) {
            setLimiteMin(currentOffer !== null ? currentOffer + 1 : baseValue);
            setLimiteMax(Infinity);
          } else {
            setLimiteMin(currentOffer !== null ? currentOffer + (baseValue * 0.01) : baseValue);
            setLimiteMax(currentOffer !== null ? currentOffer + (baseValue * 0.20) : baseValue + (baseValue * 0.20));
          }
        }
      } catch (error) {
        console.error("Error obteniendo estado de puja", error);
      }
    };

    fetchEstadoPuja();
    intervalId = setInterval(fetchEstadoPuja, 3000);

    return () => clearInterval(intervalId);
  }, [subastaId, articuloId]);

  const handleNext = () => {
    if (articuloInfo?.fotos?.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % articuloInfo.fotos.length);
    }
  };

  const handlePrev = () => {
    if (articuloInfo?.fotos?.length > 0) {
      setCurrentPhotoIndex((prev) => (prev - 1 + articuloInfo.fotos.length) % articuloInfo.fotos.length);
    }
  };

  const pujaBloqueada = isLoading || subastaInfo?.estado !== 'abierta' || articuloInfo?.estado !== 'disponible';

  const handleRealizarPuja = async () => {
    const amount = parseFloat(bidAmount.replace(',', '.'));
    if (!amount || isNaN(amount)) {
      Alert.alert("Atención", "Ingrese un monto numérico válido.");
      return;
    }
    if (amount < limiteMin) { setShowInsuficiente(true); return; }
    if (!isPremium && amount > limiteMax) { setShowLimite(true); return; }
    if (!selectedPayment) { Alert.alert("Atención", "Seleccione método de pago."); return; }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/subastas/${subastaId}/articulos/${articuloId}/pujar`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto: amount, medioPagoId: String(selectedPayment.id), confirmada: true })
      });

      if (response.ok) {
        setShowExito(true);
        setBidAmount('');
        setTimeout(() => setShowExito(false), 2000);
      } else {
        const data = await response.json();
        Alert.alert("Puja Rechazada", data.mensaje || "Error al realizar la oferta.");
      }
    } catch (error) {
      Alert.alert("Error", "Verifica tu conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenStream = async () => {
    const url = 'https://www.twitch.tv';
    await Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCardWrapper}>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
            <View style={styles.headerTextContainer}>
              <View style={styles.tagOro}><Text style={styles.tagText}>{subastaInfo?.categoriaRequerida?.toUpperCase() || '...'}</Text></View>
              <Text style={styles.itemId}>{articuloInfo ? articuloInfo._id.slice(-6).toUpperCase() : '...'}</Text>
              <Text style={styles.itemName}>{articuloInfo?.nombre || '...'}</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>

            {articuloInfo?.fotos && articuloInfo.fotos.length > 0 ? (
              <Image source={{ uri: articuloInfo.fotos[currentPhotoIndex] }} style={styles.itemImage} />
            ) : (
              <Image source={require('../../assets/images/camera.jpg')} style={styles.itemImage} />
            )}

            <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>
                {articuloInfo?.estado === 'disponible' ? 'Artículo: Disponible' : `Artículo: ${articuloInfo?.estado?.toUpperCase() || '...'}`}
              </Text>
            </View>
            <TouchableOpacity style={styles.detailsButton} onPress={handleOpenStream}>
              <Text style={styles.detailsButtonText}>Link al Stream</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.offerText}>
            Oferta Actual: ${pujaActual ? pujaActual.monto.toLocaleString('es-AR') : (articuloInfo?.precioBase?.toLocaleString('es-AR') || '0')}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.textInput}
              placeholder={pujaBloqueada ? "Pujas cerradas" : "Ingrese monto"}
              placeholderTextColor={PujaTheme.placeholderColor}
              keyboardType="numeric"
              value={bidAmount}
              onChangeText={setBidAmount}
              editable={!pujaBloqueada}
            />
          </View>

          <Text style={styles.limitsText}>
            Tu puja válida debe ser entre:{'\n'}
            Mínimo:  ${limiteMin.toLocaleString('es-AR')}{'\n'}
            {isPremium ? 'Máximo: Sin límite (Cat. Premium)' : `Máximo: $${limiteMax.toLocaleString('es-AR')}`}
          </Text>

          <Text style={styles.paymentLabel}>Método de Pago</Text>
          <TouchableOpacity style={styles.paymentSelector} onPress={() => setModalVisible(true)} disabled={pujaBloqueada}>
            <View style={styles.paymentSelectorContent}>
              <Text style={styles.paymentIcon}>{selectedPayment?.icon}</Text>
              <Text style={styles.paymentText}>{selectedPayment ? selectedPayment.name : 'Cargando...'}</Text>
            </View>
            <Text style={styles.paymentIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, pujaBloqueada ? styles.buttonDisabled : null]}
            onPress={handleRealizarPuja}
            disabled={pujaBloqueada}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Procesando..." : (pujaBloqueada ? "Artículo Cerrado" : "Realizar Puja")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav />

      {selectedPayment && (
        <PaymentModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectPayment={setSelectedPayment}
          currentSelectedId={selectedPayment.id}
          methodsData={paymentMethods}
        />
      )}

      <PopupLimiteExcedido visible={showLimite} onClose={() => setShowLimite(false)} maxAmount={limiteMax.toLocaleString('es-AR')} />
      <PopupMontoInsuficiente visible={showInsuficiente} onClose={() => setShowInsuficiente(false)} minAmount={limiteMin.toLocaleString('es-AR')} />
      <PopupPujaExitosa visible={showExito} onClose={() => setShowExito(false)} />

    </SafeAreaView>
  );
}