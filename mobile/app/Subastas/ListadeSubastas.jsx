import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';
import CategoryPill from '../../components/CategoryPill';
import LoadingCatalogo from '../Loadings/LoadingCatalogo';
import GenericErrorScreen from '../../components/GenericErrorScreen';
import styles, { ListaDeSubastasTheme } from '../../styles/subastas/ListaDeSubastas';
import FiltroModal from '../../components/FiltroModal';

export default function ListadeSubastas() {
  const navigation = useNavigation();
  const [subastas, setSubastas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Estados para Filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);

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

  // FILTRADO COMBINADO: Se declara UNA sola vez
  const subastasFiltradas = subastas.filter(subasta => {
    const cumpleBusqueda = subasta.titulo?.toLowerCase().includes(searchQuery.toLowerCase());
    const cumpleCategoria = categoriaFiltro === 'Todos' || subasta.categoriaRequerida === categoriaFiltro;
    return cumpleBusqueda && cumpleCategoria;
  });

  if (isLoading) return <LoadingCatalogo />;
  if (errorType) return <GenericErrorScreen errorType={errorType} />;

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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="filter" size={24} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListContent}>
          {subastasFiltradas.length > 0 ? (
            // Si hay subastas, las mapeamos:
            subastasFiltradas.map((subasta) => (
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
                    <View style={styles.statusRow}>
                      <View style={[styles.statusDot, { backgroundColor: subasta.estado === 'activa' ? '#4CD964' : '#FFCC00' }]} />
                      <Text style={styles.statusText}>{subasta.estado === 'activa' ? 'Activa' : 'Próxima'}</Text>
                    </View>
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
            ))
          ) : (
            // Si NO hay subastas (length es 0), mostramos el mensaje:
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No se encontraron artículos o subastas de ese estilo.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <FiltroModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categoria={categoriaFiltro}
        setCategoria={setCategoriaFiltro}
      />
      <BottomNav />
    </View>
  );
}