import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 1. IMPORTAMOS LAS LIBRERÍAS CORRECTAS PARA LOS ÍCONOS
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { API_URL } from '../../config/api';

import { pujaStyles as styles, PujaTheme } from '../../styles/puja/Puja';
import PaymentModal from './MetodoPagoModulo';
import BottomNav from '../../components/BottomNav';

import PopupLimiteExcedido from './PopUps/PopupLimiteExcedido';
import PopupMontoInsuficiente from './PopUps/PopupMontoInsuficiente';
import PopupPujaExitosa from './PopUps/PopupPujaExitosa';

export default function PujaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { subastaId = '1', articuloId = '1002' } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showLimite, setShowLimite] = useState(false);
  const [showInsuficiente, setShowInsuficiente] = useState(false);
  const [showExito, setShowExito] = useState(false);

  // 2. CORREGIMOS EL MOCKUP USANDO FontAwesome PARA LAS TARJETAS Y BANCOS
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Visa ****1234', icon: <FontAwesome name="credit-card" size={PujaTheme.iconSize} /> }
  ]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

  useEffect(() => {
    const cargarMediosPago = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        if (!token || !userDataString) return;

        const usuario = JSON.parse(userDataString);
        const res = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            const mappedMethods = data.map(m => {
              const detalle = typeof m.detalle === 'string' ? JSON.parse(m.detalle) : m.detalle;
              let name = m.tipo;
              let IconComponent = <FontAwesome name="credit-card" size={PujaTheme.iconSize} />;

              if (m.tipo === 'TARJETA') {
                name = `Tarjeta ****${detalle.numero ? detalle.numero.slice(-4) : 'XXXX'}`;
              }
              if (m.tipo === 'CUENTA_BANCARIA') { 
                name = `Cuenta ${detalle.banco}`; 
                IconComponent = <FontAwesome name="bank" size={PujaTheme.iconSize} />; 
              }
              if (m.tipo === 'CHEQUE') { 
                name = `Cheque ${detalle.banco}`; 
                IconComponent = <AntDesign name="filetext1" size={PujaTheme.iconSize} />; 
              }

              return { id: m._id || m.id, name, icon: IconComponent };
            });
            setPaymentMethods(mappedMethods);
            setSelectedPayment(mappedMethods[0]);
          }
        }
      } catch (error) {
        console.error("Error cargando métodos de pago", error);
      }
    };
    cargarMediosPago();
  }, []);

  const handleRealizarPuja = async () => {
    if (!bidAmount || isNaN(bidAmount)) {
      Alert.alert("Atención", "Ingrese un monto numérico válido.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');

      const payload = {
        monto: parseFloat(bidAmount),
        medioPagoId: String(selectedPayment.id),
        confirmada: true
      };

      const response = await fetch(`${API_URL}/subastas/${subastaId}/articulos/${articuloId}/pujar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowExito(true);
      } else if (response.status === 409 || response.status === 400) {
        const data = await response.json();
        const msg = data.mensaje ? data.mensaje.toLowerCase() : '';

        if (msg.includes('mínim') || msg.includes('superar')) {
          setShowInsuficiente(true);
        } else if (msg.includes('máxim') || msg.includes('límite') || msg.includes('20%')) {
          setShowLimite(true);
        } else {
          Alert.alert("Puja Rechazada", data.mensaje || "Error al realizar la oferta.");
        }
      } else {
        Alert.alert("Error", "No se pudo procesar la puja.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de red", "Verifica tu conexión a internet.");
    } finally {
      setIsLoading(false);
    }
  };

  const cerrarExitoYRedirigir = () => {
    setShowExito(false);
    navigation.navigate('MensajeExitoPuja');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 3. CAMBIAMOS EL VIEW DE LA TARJETA POR UN SCROLLVIEW */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCardWrapper}>
        <View style={styles.card}>

          <View style={styles.headerContainer}>
            <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
            <View style={styles.headerTextContainer}>
              <View style={styles.tagOro}>
                <Text style={styles.tagText}>Oro</Text>
              </View>
              <Text style={styles.itemId}>1002</Text>
              <Text style={styles.itemName}>Cámara digital</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.arrowButton}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/camera.jpg')} style={styles.itemImage} />
            <TouchableOpacity style={styles.arrowButton}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Estado: Activa</Text>
            </View>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.offerText}>Oferta Actual: $100.000</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ingrese el monto de su puja"
              placeholderTextColor={PujaTheme.placeholderColor}
              keyboardType="numeric"
              value={bidAmount}
              onChangeText={setBidAmount}
              editable={!isLoading}
            />
          </View>

          <Text style={styles.limitsText}>
            Tu puja válida debe ser entre:{'\n'}
            Mínimo:  $101.000 (1%){'\n'}
            Máximo: $120.000 (20% sobre base)
          </Text>

          <Text style={styles.paymentLabel}>Método de Pago</Text>
          <TouchableOpacity style={styles.paymentSelector} onPress={() => setModalVisible(true)} disabled={isLoading}>
            <View style={styles.paymentSelectorContent}>
              <Text style={styles.paymentIcon}>{selectedPayment.icon}</Text>
              <Text style={styles.paymentText}>{selectedPayment.name}</Text>
            </View>
            <Text style={styles.paymentIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, isLoading ? styles.buttonDisabled : null]}
            onPress={handleRealizarPuja}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>{isLoading ? "Procesando..." : "Realizar Puja"}</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <BottomNav />

      <PaymentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectPayment={setSelectedPayment}
        currentSelectedId={selectedPayment.id}
        methodsData={paymentMethods}
      />

      <PopupLimiteExcedido visible={showLimite} onClose={() => setShowLimite(false)} maxAmount="120.000" />
      <PopupMontoInsuficiente visible={showInsuficiente} onClose={() => setShowInsuficiente(false)} minAmount="101.000" />
      <PopupPujaExitosa visible={showExito} onClose={cerrarExitoYRedirigir} />

    </SafeAreaView>
  );
}