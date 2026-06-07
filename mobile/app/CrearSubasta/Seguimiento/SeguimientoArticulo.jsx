import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- NUEVO IMPORT
import { API_URL } from '../../../config/api'; // <-- NUEVO IMPORT

import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoArticulo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;

  const [articulo, setArticulo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticuloReal = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');

        if (!token || !userDataString) {
          Alert.alert("Error", "No hay sesión activa");
          return;
        }

        const usuario = JSON.parse(userDataString);

        // 1. Llamamos a tu endpoint real del backend
        const response = await fetch(`${API_URL}/usuarios/${usuario.id}/articulos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          // 2. Buscamos el artículo exacto que el usuario tocó
          // Comparamos con ._id (MongoDB) y .id por las dudas
          const itemEncontrado = data.find(item => String(item._id) === String(itemId) || String(item.id) === String(itemId));

          if (itemEncontrado) {
            setArticulo(itemEncontrado);
          }
        } else {
          console.error("Error del backend:", data.mensaje);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticuloReal();
  }, [itemId]);

  // Traduce el estado real del backend al formato visual del TrackerTimeline
  const getTrackerState = (estadoBackend) => {
    switch(estadoBackend) {
      case 'pendiente': return 'inspeccion';
      case 'pendiente_aceptacion': return 'propuesta';
      case 'aprobado': return 'deposito';
      case 'subastado': return 'listo';
      case 'rechazado': return 'rechazado';
      default: return 'inspeccion';
    }
  };

  const renderContenidoEstado = () => {
    if (!articulo) return null;

    if (articulo.estado === 'pendiente') {
      return (
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>🔍 Inspección en Curso</Text>
          <Text style={styles.textDescription}>
            Hemos recibido el artículo en nuestra sucursal. En estos momentos, el equipo de expertos de Gavel & Gold está verificando su funcionalidad, estado de conservación y autenticidad.
          </Text>
        </View>
      );
    }

    if (articulo.estado === 'pendiente_aceptacion') {
      const precioBase = articulo.precioBase || 0;
      const comision = articulo.comision || 10; // Valor por defecto si no viene del back
      const comisionValor = (precioBase * (comision / 100));
      return (
        <View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>⚠️ Aprobación de Valores Requerida</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Precio Base Propuesto:</Text>
              <Text style={styles.infoValue}>${precioBase.toLocaleString('es-AR')}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Comisión ({comision}%):</Text>
              <Text style={styles.infoValue}>-${comisionValor.toLocaleString('es-AR')}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: '#E0BF66', fontWeight: 'bold' }]}>Ganancia Neta Estimada:</Text>
              <Text style={[styles.infoValue, { color: '#E0BF66', fontSize: 16 }]}>
                ${(precioBase - comisionValor).toLocaleString('es-AR')}
              </Text>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => Alert.alert("Próximamente", "Llamar a endpoint aceptar")}>
              <Text style={styles.btnPrimaryText}>Aceptar Propuesta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnSecondary, { borderColor: '#D32F2F', marginTop: 10 }]} onPress={() => Alert.alert("Próximamente", "Llamar a endpoint rechazar")}>
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
            {articulo.motivoRechazo || "El artículo no cumple con las políticas de la plataforma."}
          </Text>
        </View>
      );
    }

    if (articulo.estado === 'aprobado') {
      return (
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📦 Resguardo Físico (En Depósito)</Text>
          <Text style={styles.textDescription}>
            El artículo se encuentra acondicionado en nuestras bóvedas bajo estrictos controles de humedad y temperatura a la espera de ser asignado a un evento de subasta.
          </Text>
        </View>
      );
    }

    if (articulo.estado === 'subastado') {
      return (
        <View style={[styles.infoCard, { borderColor: '#4CD964' }]}>
          <Text style={[styles.infoCardTitle, { color: '#4CD964' }]}>✅ ¡Asignado a Subasta!</Text>
          <Text style={styles.textDescription}>
            El artículo fue aprobado y ya forma parte del catálogo de la próxima subasta.
          </Text>
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

  if (!articulo) {
     return (
        <View style={styles.mainContainer}>
          <TouchableOpacity style={[styles.backButton, {marginTop: 40, marginLeft: 20}]} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Volver a Mis Articulos</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>⚠️ No se encontró el artículo.</Text>
            <Text style={{ color: 'gray', marginTop: 10 }}>ID Buscado: {String(itemId)}</Text>
          </View>
        </View>
     )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver a Mis Articulos</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        <View style={styles.itemCard}>
            {/* Leemos la foto de Cloudinary que viene del Backend */}
            {articulo.fotos && articulo.fotos.length > 0 ? (
                <Image source={{ uri: articulo.fotos[0] }} style={styles.itemImage} />
            ) : (
                <View style={[styles.itemImage, {backgroundColor: '#333', justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={{color: '#888'}}>Sin Foto</Text>
                </View>
            )}
            <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{articulo.nombre}</Text>
            <Text style={styles.itemId}>ID: #{String(articulo.id || articulo._id).slice(-6)}</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
        
        <TrackerTimeline 
            estadoActual={getTrackerState(articulo.estado)} 
            motivoRechazo={articulo.motivoRechazo} 
        />

        {renderContenidoEstado()}

      </ScrollView>
    </View>
  );
}
