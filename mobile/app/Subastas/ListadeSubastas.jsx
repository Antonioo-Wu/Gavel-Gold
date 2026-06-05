import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';

import LoadingCatalogo from '../Loadings/LoadingCatalogo';
import GenericErrorScreen from '../../components/GenericErrorScreen';

// Importamos el Theme además de los styles
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
        console.error("Error al obtener subastas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerSubastas();
  }, []);

  const subastasFiltradas = subastas.filter(subasta => {
    const titulo = subasta.titulo || '';
    const categoria = subasta.categoriaRequerida || subasta.tipo || '';

    return titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoria.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) return <LoadingCatalogo />;

  if (errorType === 'WIFI_ERROR') {
    return (
      <GenericErrorScreen
        title="Se perdió la conexión con el servidor. Intentando reconectar..."
        errorIcon={require('../../assets/errores/error_internet.png')}
      />
    );
  }

  if (errorType === 'SERVER_DOWN') {
    return (
      <GenericErrorScreen
        title="No pudimos cargar el catálogo en este momento."
        errorIcon={require('../../assets/errores/error_internet.png')}
        description="Por favor, intentá nuevamente más tarde."
      />
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <Text style={styles.brandText}>Gavel & Gold</Text>
          <Text style={styles.screenTitle}>Subastas Activas</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar subasta por nombre o categoría..."
            placeholderTextColor="#666" // Este lo dejamos pasar porque TextInput no permite aplicar placeholderTextColor vía StyleSheet
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              {/* Estilo extraído al Theme y a la hoja de estilos */}
              <Text style={[styles.clearSearchIcon, { color: ListaDeSubastasTheme.colors.clearSearch }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitle}>Próximas Subastas</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListContent}>
          {subastasFiltradas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron subastas con ese criterio.</Text>
            </View>
          ) : (
            subastasFiltradas.map((subasta) => {
              const categoriaDisplay = subasta.categoriaRequerida
                ? subasta.categoriaRequerida.charAt(0).toUpperCase() + subasta.categoriaRequerida.slice(1)
                : 'Común';

              // Lógica de color extraída
              const statusColor = subasta.estado === 'activa'
                ? ListaDeSubastasTheme.colors.activeDot
                : ListaDeSubastasTheme.colors.upcomingDot;

              return (
                <View key={subasta._id} style={styles.auctionCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.auctionTitle}>{subasta.titulo}</Text>

                    <View style={styles.statusBadgeRow}>
                      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {subasta.estado === 'activa' ? 'Activa' : 'Próxima'}
                      </Text>
                      <Text style={styles.timeRemainingText}>Categoría: {categoriaDisplay}</Text>
                    </View>
                  </View>

                  <Text style={styles.catalogPreviewTitle}>Vista previa del catálogo</Text>

                  <View style={styles.previewImagesContainer}>
                    {['📟', '🎥', '⏰'].map((icon, idx) => (
                      <View key={idx} style={styles.previewItemBox}>
                        <Text style={styles.previewIcon}>{icon}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.itemCountText}>
                    Contiene {subasta.articulos ? subasta.articulos.length : 'varios'} artículos de colección.
                  </Text>

                  <TouchableOpacity
                    style={styles.viewCatalogButton}
                    onPress={() => navigation.navigate('SubastaDetalles', { id: subasta._id || subasta.id })}
                  >
                    <Text style={styles.viewCatalogButtonText}>Ver Catálogo</Text>
                  </TouchableOpacity>

                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      <BottomNav />
    </View>
  );
}