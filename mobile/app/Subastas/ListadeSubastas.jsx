import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';
import CategoryPill from '../../components/CategoryPill'; // Asegúrate de que esta ruta sea correcta
import LoadingCatalogo from '../Loadings/LoadingCatalogo';
import GenericErrorScreen from '../../components/GenericErrorScreen';
import styles, { ListaDeSubastasTheme } from '../../styles/subastas/ListaDeSubastas';

export default function ListadeSubastas() {
  const navigation = useNavigation();
  const [subastas, setSubastas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const obtenerSubastas = async () => {
      try {
        const response = await fetch(`${API_URL}/subastas`);
        if (response.ok) {
          const data = await response.json();
          setSubastas(data);
        } else {
          setErrorType('SERVER_DOWN');
        }
      } catch (error) {
        setErrorType('WIFI_ERROR');
      } finally {
        setIsLoading(false);
      }
    };
    obtenerSubastas();
  }, []);

  // ESTA ES LA VARIABLE QUE TE ESTABA DANDO ERROR
  // Asegúrate de que esté aquí, antes del 'return'
  const subastasFiltradas = subastas.filter(subasta =>
    subasta.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <LoadingCatalogo />;

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
                          <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
                          <Text style={styles.headerTitle}>Subastas</Text>
                  </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListContent}>
       
          {subastasFiltradas.map((subasta) => (
            <View key={subasta._id} style={styles.auctionCard}>
              <View style={styles.mainImageContainer}>
                {subasta.articulos?.[0]?.fotos?.[0] ? (
                  <Image source={{ uri: subasta.articulos[0].fotos[0] }} style={styles.mainImg} />
                ) : (
                  <View style={styles.placeholderImg} />
                )}
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.auctionTitle}>{subasta.titulo}</Text>

                <View style={styles.badgeContainer}>
                  {/* Fila 1: ESTADO */}
                  <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: subasta.estado === 'activa' ? '#4CD964' : '#FFCC00' }]} />
                    <Text style={styles.statusText}>{subasta.estado === 'activa' ? 'Activa' : 'Próxima'}</Text>
                  </View>

                  {/* Fila 2: CATEGORIA */}
                  <View style={styles.categoryRow}>
                    <CategoryPill category={subasta.categoriaRequerida} />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.viewCatalogButton}
                  onPress={() => navigation.navigate('SubastaDetalles', { id: subasta._id })}
                >
                  <Text style={styles.viewCatalogButtonText}>Ver Catálogo Completo</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <BottomNav />
    </View>
  );
}