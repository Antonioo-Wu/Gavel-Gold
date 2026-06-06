import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Image, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importamos el theme
import { UsuarioMediosPagoStyles as styles, UsuarioMediosPagoTheme } from '../../styles/cuentaUsuario/UsuarioMediosPago.js';
import { API_URL } from '../../config/api.js';

import FormCard from '../../components/FormCard.jsx';
import BottomNav from '../../components/BottomNav.jsx';

export default function UsuarioMediosPago() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const mockData = [
    {
      _id: 'mock_1',
      tipo: 'TARJETA',
      validado: true,
      detalle: JSON.stringify({ numero: '1234567890121234', vencimiento: '12/25' })
    },
    {
      _id: 'mock_2',
      tipo: 'CUENTA_BANCARIA',
      validado: false,
      detalle: JSON.stringify({ banco: 'Santander', numeroCuenta: '456789123', titular: 'Juan Pérez' })
    }
  ];

  const [mediosPago, setMediosPago] = useState(mockData);

  useFocusEffect(
    useCallback(() => {
      cargarMediosDePago();
    }, [])
  );

  const cargarMediosDePago = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');

      if (!token || !userDataString) return;

      const usuario = JSON.parse(userDataString);

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.length > 0) {
        setMediosPago(data);
      }
    } catch (error) {
      console.error("Error cargando métodos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDetalles = (tipo, detalleData) => {
    try {
      // PREVENCIÓN DE CRASH: Si el backend manda String lo parseamos, si manda Objeto lo usamos directo.
      const detalle = typeof detalleData === 'string' ? JSON.parse(detalleData) : detalleData;

      if (tipo === 'TARJETA') {
        const ultimosDigitos = detalle.numero ? detalle.numero.slice(-4) : 'XXXX';
        return (
          <View style={styles.detailsContent}>
            <Text style={styles.paymentDetailText}>Terminada en: •••• {ultimosDigitos}</Text>
            <Text style={styles.paymentDetailText}>Vencimiento: {detalle.vencimiento}</Text>
          </View>
        );
      }

      if (tipo === 'CUENTA_BANCARIA') {
        return (
          <View style={styles.detailsContent}>
            <Text style={styles.paymentDetailText}>Banco: {detalle.banco}</Text>
            <Text style={styles.paymentDetailText}>Nº Cuenta: {detalle.numeroCuenta}</Text>
            <Text style={styles.paymentDetailText}>Titular: {detalle.titular}</Text>
          </View>
        );
      }

      if (tipo === 'CHEQUE') {
        return (
          <View style={styles.detailsContent}>
            <Text style={styles.paymentDetailText}>Banco: {detalle.banco}</Text>
            <Text style={styles.paymentDetailText}>Monto: {detalle.moneda || '$'} {detalle.monto}</Text>
            <Text style={styles.paymentDetailText}>Vence: {detalle.vencimiento}</Text>
          </View>
        );
      }
    } catch (error) {
      // Si falla, mostramos el dato crudo
      return <Text style={styles.paymentDetailText}>{String(detalleData)}</Text>;
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'TARJETA': return 'Tarjeta de Crédito';
      case 'CUENTA_BANCARIA': return 'Cuenta Bancaria';
      case 'CHEQUE': return 'Cheque';
      default: return 'Método de pago';
    }
  };

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.backgroundImage}>
      <View style={styles.mainContainer}>

        <View style={styles.headerOutside}>
          <Image source={require('../../assets/logos/logotipo.png')} style={styles.logoHeader} />
          <Text style={styles.titleHeader}>Métodos de Pago</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollWrapper}>
          <FormCard>
            <View style={styles.infoContainer}>

              {isLoading ? (
                <ActivityIndicator
                  size={UsuarioMediosPagoTheme.indicatorSize}
                  color={UsuarioMediosPagoTheme.colors.primary}
                  style={styles.loadingIndicator}
                />
              ) : (
                <View style={styles.listContainer}>
                  {mediosPago.length === 0 ? (
                    <Text style={styles.emptyText}>Aún no tienes métodos de pago registrados.</Text>
                  ) : (
                    mediosPago.map((metodo, index) => {
                      const isLast = index === mediosPago.length - 1;
                      return (
                        <View key={metodo._id || index} style={isLast ? styles.paymentItemLast : styles.paymentItem}>

                          <View style={styles.paymentHeaderRow}>
                            <Text style={styles.paymentTypeTitle}>{getTipoLabel(metodo.tipo)}</Text>
                            <View style={[styles.badge, metodo.validado ? styles.badgeValidated : styles.badgePending]}>
                              <Text style={metodo.validado ? styles.badgeTextValidated : styles.badgeTextPending}>
                                {metodo.validado ? 'Validado' : 'Pendiente'}
                              </Text>
                            </View>
                          </View>

                          {renderDetalles(metodo.tipo, metodo.detalle)}

                        </View>
                      );
                    })
                  )}

                  <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('SeleccionMetodoPago', { origen: 'UsuarioMediosPago' })}>
                    <Text style={styles.addButtonText}>Añadir nuevo método</Text>
                  </TouchableOpacity>

                </View>
              )}

            </View>
          </FormCard>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav />
      </View>
    </ImageBackground>
  );
}