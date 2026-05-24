import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PerfilStlyes as styles } from '../../styles/cuentaUsuario/Perfil.js';
import { API_URL } from '../../config/api.js';

export default function UsuarioMediosPago() {
  const navigation = useNavigation();
  const [mediosPago, setMediosPago] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      cargarMediosDePago();
    }, [])
  );

  const cargarMediosDePago = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (!token || !userDataString) {
        Alert.alert("Error", "Debes iniciar sesión.");
        navigation.navigate('Login');
        return;
      }

      const usuario = JSON.parse(userDataString);

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMediosPago(data);
      } else {
        Alert.alert("Error", data.mensaje || "No se pudieron cargar los métodos de pago.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderDetalles = (tipo, detalleString) => {
    try {
      const detalle = JSON.parse(detalleString);
      
      if (tipo === 'TARJETA') {
        const ultimosDigitos = detalle.numero ? detalle.numero.slice(-4) : 'XXXX';
        return (
          <View>
            <Text style={styles.paymentDetailText}>Terminada en: •••• {ultimosDigitos}</Text>
            <Text style={styles.paymentDetailText}>Vencimiento: {detalle.vencimiento}</Text>
          </View>
        );
      } 
      
      if (tipo === 'CUENTA_BANCARIA') {
        return (
          <View>
            <Text style={styles.paymentDetailText}>Banco: {detalle.banco}</Text>
            <Text style={styles.paymentDetailText}>Cta: {detalle.numeroCuenta}</Text>
            <Text style={styles.paymentDetailText}>Titular: {detalle.titular}</Text>
          </View>
        );
      }

      if (tipo === 'CHEQUE') {
        return (
          <View>
            <Text style={styles.paymentDetailText}>Banco: {detalle.banco}</Text>
            <Text style={styles.paymentDetailText}>Monto: {detalle.moneda} {detalle.monto}</Text>
            <Text style={styles.paymentDetailText}>Vence: {detalle.vencimiento}</Text>
          </View>
        );
      }

    } catch (error) {
      return <Text style={styles.paymentDetailText}>{detalleString}</Text>;
    }
  };

  const getTipoLabel = (tipo) => {
    switch(tipo) {
      case 'TARJETA': return '💳 Tarjeta de Crédito';
      case 'CUENTA_BANCARIA': return '🏦 Cuenta Bancaria';
      case 'CHEQUE': return '📄 Cheque';
      default: return 'Método de pago';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mis Métodos de Pago</Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#D4AF37" style={{ marginTop: 40 }} />
        ) : (
          <View style={{ marginTop: 16 }}>
            {mediosPago.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aún no tienes métodos de pago registrados.</Text>
              </View>
            ) : (
              mediosPago.map((metodo) => (
                <View key={metodo._id} style={styles.paymentCard}>
                  <View style={styles.paymentHeader}>
                    <Text style={styles.paymentType}>{getTipoLabel(metodo.tipo)}</Text>
                    
                    <View style={[styles.badge, metodo.validado ? styles.badgeValidated : styles.badgePending]}>
                      <Text style={metodo.validado ? styles.badgeTextValidated : styles.badgeTextPending}>
                        {metodo.validado ? 'Validado' : 'Pendiente'}
                      </Text>
                    </View>
                  </View>
                  
                  {renderDetalles(metodo.tipo, metodo.detalle)}
                </View>
              ))
            )}

            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => navigation.navigate('SeleccionMetodoPago')}
            >
              <Text style={styles.addButtonText}>+ Añadir nuevo método</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}