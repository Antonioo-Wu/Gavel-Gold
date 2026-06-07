import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoArticulo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;

  const [articulo, setArticulo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticuloSimulado = () => {
      // 1. Recreamos la base de datos simulada
      const listaMocks = [
        { id: '1', nombre: 'Airfryer COSORI', estado: 'pendiente' },
        { id: '2', nombre: 'Cassette Fleetwood Mac', estado: 'aprobado' },
        { 
          id: '3', 
          nombre: 'Sony Walkman', 
          estado: 'pendiente_aceptacion', 
          precioBase: 45000, 
          comision: 5 
        },
        { id: '4', nombre: 'Pokemon Tamagotchi', estado: 'subastado' },
        { 
          id: '5', 
          nombre: 'Medialunas viejas', 
          estado: 'rechazado', 
          motivoRechazo: 'El artículo no cumple con las políticas de conservación y legalidad de la plataforma Gavel & Gold.' 
        },
      ];

      // 2. Buscamos convirtiendo ambos a String para evitar errores de tipo (1 vs '1')
      const itemEncontrado = listaMocks.find(item => String(item.id) === String(itemId));

      if (itemEncontrado) {
        // Le inyectamos una imagen mock de internet para pruebas locales
        itemEncontrado.fotos = ['https://via.placeholder.com/150'];
        setArticulo(itemEncontrado);
      } 
      
      setIsLoading(false);
    };

    fetchArticuloSimulado();
  }, [itemId]);

  // Traduce el estado simulado al formato visual del TrackerTimeline
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
            <TouchableOpacity style={styles.btnPrimary} onPress={() => Alert.alert("Simulación", "Aceptaste la propuesta (Frontend)")}>
              <Text style={styles.btnPrimaryText}>Aceptar Propuesta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnSecondary, { borderColor: '#D32F2F', marginTop: 10 }]} onPress={() => Alert.alert("Simulación", "Rechazaste la propuesta (Frontend)")}>
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
            {articulo.motivoRechazo}
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
            El artículo fue aprobado y ya forma parte del catálogo de la próxima Gran Subasta de Electrónica Vintage.
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

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver a Mis Subastas</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        {/* Si lo encuentra, muestra el Tracker. Si no, muestra el cartel de error */}
        {articulo ? (
          <>
            <View style={styles.itemCard}>
              <Image source={{ uri: articulo.fotos[0] }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{articulo.nombre}</Text>
                <Text style={styles.itemId}>ID: #{articulo.id}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
            
            <TrackerTimeline 
              estadoActual={getTrackerState(articulo.estado)} 
              motivoRechazo={articulo.motivoRechazo} 
            />

            {renderContenidoEstado()}
          </>
        ) : (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>⚠️ No se encontró el artículo.</Text>
            <Text style={{ color: 'gray', marginTop: 10 }}>ID Buscado: {String(itemId)}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}