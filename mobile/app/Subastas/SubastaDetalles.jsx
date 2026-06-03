import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';

import { subastaDetallesStlyes as styles } from '../../styles/subastas/SubastaDetalles';

export default function SubastaDetalles() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const obtenerArticulos = async () => {
      try {
        const response = await fetch(`${API_URL}/subastas/${id}/articulos`);
        const data = await response.json();

        if (response.ok) {
          setArticulos(data);
        } else {
          Alert.alert("Error", "No se pudo cargar el catálogo.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo conectar al servidor.");
      } finally {
        setIsLoading(false);
      }
    };

    obtenerArticulos();
  }, [id]);

  const handleParticipar = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        Alert.alert("Atención", "Debes iniciar sesión para participar en una subasta.");
        navigation.navigate('Login');
        return;
      }

      setIsVerifying(true);

      const response = await fetch(`${API_URL}/subastas/${id}/participar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Pujar', { subastaId: id });
      } else {
        Alert.alert("Acceso Denegado", data.mensaje || "No cumples con los requisitos para esta subasta.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Error validando el acceso.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator size="large" color="#D4AF37" style={styles.loadingIndicator} />
        ) : articulos.length === 0 ? (
          <Text style={styles.emptyText}>No hay artículos asignados a esta subasta.</Text>
        ) : (
          <View>
            <Text style={styles.catalogTitle}>Catálogo de la Subasta</Text>

            {articulos.map((articulo) => (
              <View key={articulo._id} style={styles.cardContainer}>
                <Image
                  source={
                    articulo.fotos && articulo.fotos.length > 0
                      ? { uri: articulo.fotos[0] }
                      : require('../../assets/images/totoro_clock.jpg')
                  }
                  style={styles.img}
                />
                <Text style={styles.name}>{articulo.nombre}</Text>
                <Text style={styles.desc}>{articulo.descripcion}</Text>
                <Text style={styles.price}>Precio Base: ${articulo.precioBase}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.participateBtn}
              onPress={handleParticipar}
              disabled={isVerifying}
            >
              <Text style={styles.btnText}>
                {isVerifying ? "Verificando acceso..." : "Entrar a Subasta"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}