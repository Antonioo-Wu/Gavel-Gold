import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';

import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoArticulo() {
  const navigation = useNavigation(); // Corregido: Declaración correcta
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

        // 1. Llamada al endpoint real del backend
        const response = await fetch(`${API_URL}/usuarios/${usuario.id}/articulos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          // 2. Buscamos el artículo comparando IDs (tanto _id de Mongo como id genérico)
          const itemEncontrado = data.find(item => String(item._id) === String(itemId) || String(item.id) === String(itemId));

          if (itemEncontrado) {
            setArticulo(itemEncontrado);
          } else {
            console.log("Artículo no encontrado en la respuesta:", data);
          }
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticuloReal();
  }, [itemId]);

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

  if (isLoading) {
    return <View style={styles.mainContainer}><ActivityIndicator size="large" color="#D4AF37" /></View>;
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        {articulo ? (
          <>
            <Text style={styles.headerTitle}>Estado del Artículo</Text>
            <View style={styles.itemCard}>
              {articulo.fotos?.length > 0 ? (
                <Image source={{ uri: articulo.fotos[0] }} style={styles.itemImage} />
              ) : null}
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{articulo.nombre}</Text>
                <Text style={styles.itemId}>ID: #{String(articulo._id).slice(-6)}</Text>
              </View>
            </View>

            <TrackerTimeline 
              estadoActual={getTrackerState(articulo.estado)} 
              motivoRechazo={articulo.motivoRechazo} 
            />
          </>
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>No se encontró el artículo.</Text>
        )}
      </ScrollView>
    </View>
  );
}