import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';
import { API_URL } from '../../../config/api';

export default function SeguimientoArticulo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params; // Recibimos el ID del artículo seleccionado

  const [articulo, setArticulo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Obtener datos reales del Backend
  const fetchArticulo = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));

      // Según tu Swagger, consultamos la lista de artículos del usuario
      const response = await fetch(`${API_URL}/usuarios/${userData.id}/articulos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Filtramos el artículo específico que el usuario tocó
        const itemEncontrado = data.find(item => (item.id || item._id) === itemId);
        setArticulo(itemEncontrado);
      } else {
        Alert.alert("Error", "No se pudo cargar la información del artículo.");
      }
    } catch (error) {
      Alert.alert("Error", "Problema de conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticulo();
  }, [itemId]);

  // 2. Mapear estado del Backend al estado Visual del Tracker
  const getTrackerState = (estadoBackend) => {
    switch(estadoBackend) {
      case 'pendiente': return 'inspeccion';
      case 'pendiente_aceptacion': return 'propuesta';
      case 'aprobado': 
      case 'disponible': return 'deposito';
      case 'subastado': return 'listo';
      case 'rechazado': return 'rechazado';
      default: return 'inspeccion';
    }
  };

  // 3. Funciones para los endpoints de Aceptar/Rechazar propuesta (según Swagger)
  const handleAceptarPropuesta = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      
      const response = await fetch(`${API_URL}/usuarios/${userData.id}/articulos/${articulo.id || articulo._id}/aceptar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        Alert.alert("¡Éxito!", "Condiciones aceptadas. El artículo pasa a depósito.");
        fetchArticulo(); // Recargamos para ver la pantalla actualizarse sola a "deposito"
      } else {
        Alert.alert("Error", "No se pudo aceptar la propuesta.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRechazarPropuesta = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      
      const response = await fetch(`${API_URL}/usuarios/${userData.id}/articulos/${articulo.id || articulo._id}/rechazar`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ motivo: "No estoy de acuerdo con el precio base propuesto." })
      });

      if (response.ok) {
        Alert.alert("Propuesta Rechazada", "Se coordinará la devolución de tu artículo.");
        fetchArticulo(); // Recargamos para que la pantalla pase a estado "rechazado"
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 4. Renderizado dinámico del contenido inferior según el estado
  const renderContenidoEstado = () => {
    if (!articulo) return null;

    if (articulo.estado === 'pendiente') {
      return (
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>🔍 Inspección en Curso</Text>
          <Text style={styles.textDescription}>
            Hemos recibido el artículo en nuestra sucursal. En estos momentos, el equipo de expertos de Gavel & Gold está verificando su funcionalidad y autenticidad.
          </Text>
        </View>
      );
    }

    if (articulo.estado === 'pendiente_aceptacion') {
      const comisionValor = (articulo.precioBase * (articulo.comision / 100));
      return (
        <View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>⚠️ Aprobación de Valores Requerida</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Precio Base Propuesto:</Text>
              <Text style={styles.infoValue}>${articulo.precioBase?.toLocaleString('es-AR')}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Comisión ({articulo.comision}%):</Text>
              <Text style={styles.infoValue}>-${comisionValor.toLocaleString('es-AR')}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: '#E0BF66', fontWeight: 'bold' }]}>Ganancia Neta Estimada:</Text>
              <Text style={[styles.infoValue, { color: '#E0BF66', fontSize: 16 }]}>
                ${(articulo.precioBase - comisionValor).toLocaleString('es-AR')}
              </Text>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleAceptarPropuesta}>
              <Text style={styles.btnPrimaryText}>Aceptar Propuesta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnSecondary, { borderColor: '#D32F2F', marginTop: 10 }]} onPress={handleRechazarPropuesta}>
              <Text style={[styles.btnSecondaryText, { color: '#D32F2F' }]}>Rechazar y Solicitar Devolución</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (articulo.estado === 'rechazado') {
      return (
        <View style={[styles.infoCard, styles.infoCardError]}>
          <Text style={[styles.infoCardTitle, styles.infoCardTitleError]}>❌ Solicitud Rechazada</Text>
          <Text style={styles.textDescription}>
            {articulo.motivoRechazo || "El artículo no cumple con los estándares para ser subastado. Se coordinará la devolución."}
          </Text>
        </View>
      );
    }

    if (articulo.estado === 'aprobado' || articulo.estado === 'disponible') {
      return (
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📦 Resguardo Físico (En Depósito)</Text>
          <Text style={styles.textDescription}>
            El artículo se encuentra acondicionado en nuestras bóvedas a la espera de ser asignado a un evento de subasta.
          </Text>
        </View>
      );
    }

    if (articulo.estado === 'subastado' || articulo.estado === 'vendido') {
      return (
        <View style={[styles.infoCard, { borderColor: '#4CD964' }]}>
          <Text style={[styles.infoCardTitle, { color: '#4CD964' }]}>✅ Asignado a Subasta / Vendido</Text>
          <Text style={styles.textDescription}>
            Este artículo ya forma parte de un evento público.
          </Text>
          <TouchableOpacity style={[styles.btnPrimary, { marginTop: 15 }]} onPress={() => navigation.navigate('ListadeSubastas')}>
            <Text style={styles.btnPrimaryText}>Ir al Catálogo de Subastas</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver a Mis Subastas</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        {articulo && (
          <>
            <View style={styles.itemCard}>
              {/* Si fotos viene como array desde el back, tomamos la primera */}
              <Image source={{ uri: articulo.fotos?.[0] || 'https://via.placeholder.com/80' }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{articulo.nombre}</Text>
                <Text style={styles.itemId}>ID: #{articulo.id || articulo._id}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
            
            <TrackerTimeline 
              estadoActual={getTrackerState(articulo.estado)} 
              motivoRechazo={articulo.motivoRechazo} 
            />

            {renderContenidoEstado()}
          </>
        )}
      </ScrollView>
    </View>
  );
}