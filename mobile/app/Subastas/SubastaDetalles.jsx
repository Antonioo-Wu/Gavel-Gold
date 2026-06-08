import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import ActionButton from '../../components/ActionButton';
import { API_URL } from '../../config/api';
import { subastaDetallesStyles as styles } from '../../styles/subastas/SubastaDetalles';

export default function SubastaDetalles() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, tituloSubasta } = route.params;

  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articuloSeleccionadoId, setArticuloSeleccionadoId] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch(`${API_URL}/subastas/${id}/articulos`);
        if (response.ok) {
          const dataArticulos = await response.json();
          setArticulos(dataArticulos);
        } else {
          Alert.alert("Error", "No se pudieron cargar los artículos.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Alert.alert("Error de red", "No se pudo conectar al servidor.");
      } finally {
        setIsLoading(false);
      }
    };
    obtenerDatos();
  }, [id]);

  const handleParticiparPorArticulo = async (articuloId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Atención", "Debes iniciar sesión para participar.");
        navigation.navigate('Login');
        return;
      }

      setArticuloSeleccionadoId(articuloId);

      const response = await fetch(`${API_URL}/subastas/${id}/participar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Pujar', { subastaId: id, articuloId: articuloId });
      } else if (response.status === 401) {
        Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Acceso Denegado", data.mensaje || "No cumples con los requisitos.");
      }
    } catch (error) {
      console.error("Error participando:", error);
      Alert.alert("Error de red", "Error validando el acceso.");
    } finally {
      setArticuloSeleccionadoId(null);
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
            <Text style={styles.headerTitle}>Subastas</Text>
          </View>

          {isLoading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#D4AF37" />
              <Text style={styles.loadingText}>Cargando catálogo...</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.catalogTitle}>{tituloSubasta || "Catálogo de Artículos"}</Text>

              {articulos.length === 0 ? (
                <View style={styles.centerContent}>
                  <Ionicons name="folder-open-outline" size={48} color="#666" />
                  <Text style={styles.emptyText}>No hay artículos asignados.</Text>
                </View>
              ) : (
                <View>
                  {articulos.map((articulo) => {
                    const currentId = articulo._id || articulo.id;
                    const estaCargandoEste = articuloSeleccionadoId === currentId;
                    const tienePuja = articulo.pujaActual && articulo.pujaActual > 0;
                    const montoMostrar = tienePuja ? articulo.pujaActual : articulo.precioBase;

                    return (
                      <View key={currentId} style={styles.cardContainer}>
                        <View style={styles.imgContainer}>
                          <Image
                            source={
                              articulo.fotos && articulo.fotos.length > 0
                                ? { uri: articulo.fotos[0] }
                                : require('../../assets/images/totoro_clock.jpg')
                            }
                            style={styles.img}
                          />
                        </View>
                        <Text style={styles.name}>{articulo.nombre}</Text>
                        <Text style={styles.desc}>{articulo.descripcion}</Text>

                        <View style={styles.priceRow}>
                          <Text style={styles.priceLabel}>{tienePuja ? "Oferta Actual:" : "Precio Base:"}</Text>
                          <Text style={styles.price}>${montoMostrar?.toLocaleString('es-AR')}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.participateBtn}
                          onPress={() => handleParticiparPorArticulo(currentId)}
                          disabled={articuloSeleccionadoId !== null}
                        >
                          <Text style={styles.btnText}>
                            {estaCargandoEste ? "Verificando..." : "Pujar por este Artículo"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                  <View style={styles.actionButtonContainer}>
                    <ActionButton text="Volver" variant="solid" onPress={() => navigation.goBack()} />
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}