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
  const { id } = route.params;

  const [articulos, setArticulos] = useState([]);
  const [subasta, setSubasta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [resSubasta, resArticulos] = await Promise.all([
          fetch(`${API_URL}/subastas/${id}`),
          fetch(`${API_URL}/subastas/${id}/articulos`)
        ]);
        
        const dataSubasta = await resSubasta.json();
        const dataArticulos = await resArticulos.json();

        if (resSubasta.ok && resArticulos.ok) {
          setSubasta(dataSubasta);
          setArticulos(dataArticulos);
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo conectar al servidor.");
      } finally {
        setIsLoading(false);
      }
    };
    obtenerDatos();
  }, [id]);

  const handleParticipar = async () => { /* ... (Tu lógica igual) ... */ };

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
              {/* Título dinámico de la subasta */}
              {subasta && <Text style={styles.catalogTitle}>{subasta.titulo}</Text>}

              {articulos.length === 0 ? (
                <View style={styles.centerContent}>
                  <Ionicons name="folder-open-outline" size={48} color="#666" />
                  <Text style={styles.emptyText}>No hay artículos asignados.</Text>
                </View>
              ) : (
                <View>
                  {articulos.map((articulo) => (
                    <View key={articulo._id || articulo.id} style={styles.cardContainer}>
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
                        <Text style={styles.priceLabel}>Precio Base:</Text>
                        <Text style={styles.price}>${articulo.precioBase}</Text>
                      </View>
                    </View>
                  ))}

                  <TouchableOpacity style={styles.participateBtn} onPress={handleParticipar} disabled={isVerifying}>
                    <Text style={styles.btnText}>
                      {isVerifying ? "Verificando..." : "Entrar a la Subasta"}
                    </Text>
                  </TouchableOpacity>

                  <View style={{ marginBottom: 40 }}>
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