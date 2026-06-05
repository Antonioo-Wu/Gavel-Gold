import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';

// Importamos las vistas de error/carga tal como lo pediste
import LoadingCatalogo from '../Loadings/LoadingCatalogo'; 
import GenericErrorScreen from '../../components/GenericErrorScreen'; 

// Importamos los nuevos estilos
import styles from '../../styles/subastas/ListaDeSubastas';

export default function ListadeSubastas() {
  const navigation = useNavigation();

  // Estados de carga y error (Tu lógica)
  const [subastas, setSubastas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState(null); 
  
  // Estado para el filtro (Nueva UI)
  const [searchQuery, setSearchQuery] = useState('');

  // ==========================================
  // FETCH AL BACKEND
  // ==========================================
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

  // ==========================================
  // LÓGICA DE FILTRADO
  // ==========================================
  const subastasFiltradas = subastas.filter(subasta => {
    const titulo = subasta.titulo || '';
    // Si la subasta no tiene 'tipo', buscamos por 'categoriaRequerida' que usabas en tu código
    const categoria = subasta.categoriaRequerida || subasta.tipo || ''; 
    
    return titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
           categoria.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // ==========================================
  // RENDERIZADO CONDICIONAL
  // ==========================================

  // 1. Mostrar la pantalla de carga full-screen
  if (isLoading) {
    return <LoadingCatalogo />;
  }

  // 2. Mostrar la pantalla de error de conexión
  if (errorType === 'WIFI_ERROR') {
    return (
      <GenericErrorScreen 
        title="Se perdió la conexión con el servidor. Intentando reconectar..."
        errorIcon={require('../../assets/errores/error_internet.png')}
      />
    );
  }

  // 3. Mostrar la pantalla de error de servidor
  if (errorType === 'SERVER_DOWN') {
    return (
      <GenericErrorScreen 
        title="No pudimos cargar el catálogo en este momento."
        errorIcon={require('../../assets/errores/error_internet.png')}
        description="Por favor, intentá nuevamente más tarde."
      />
    );
  }

  // 4. Si todo salió bien, mostrar el nuevo diseño corporativo
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        
        {/* Header Corporativo */}
        <View style={styles.headerContainer}>
          <Text style={styles.brandText}>Gavel & Gold</Text>
          <Text style={styles.screenTitle}>Subastas Activas</Text>
        </View>

        {/* Barra de Búsqueda Interactiva */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar subasta por nombre o categoría..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ color: '#E0BF66', marginRight: 4 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Título de Sección */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitle}>Próximas Subastas</Text>
        </View>

        {/* Listado de Subastas */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListContent}>
          {subastasFiltradas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron subastas con ese criterio.</Text>
            </View>
          ) : (
            subastasFiltradas.map((subasta) => {
              // Lógica para mostrar la categoría correctamente (como tenías en tu código)
              const categoriaDisplay = subasta.categoriaRequerida 
                ? subasta.categoriaRequerida.charAt(0).toUpperCase() + subasta.categoriaRequerida.slice(1) 
                : 'Común';

              return (
                <View key={subasta._id} style={styles.auctionCard}>
                  
                  <View style={styles.cardHeader}>
                    <Text style={styles.auctionTitle}>{subasta.titulo}</Text>
                    
                    <View style={styles.statusBadgeRow}>
                      <View style={[
                        styles.statusDot, 
                        { backgroundColor: subasta.estado === 'activa' ? '#4CD964' : '#FFCC00' }
                      ]} />
                      <Text style={[
                        styles.statusText, 
                        { color: subasta.estado === 'activa' ? '#4CD964' : '#FFCC00' }
                      ]}>
                        {subasta.estado === 'activa' ? 'Activa' : 'Próxima'}
                      </Text>
                      {/* Mostramos la categoría como texto secundario */}
                      <Text style={styles.timeRemainingText}>Categoría: {categoriaDisplay}</Text>
                    </View>
                  </View>

                  <Text style={styles.catalogPreviewTitle}>Vista previa del catálogo</Text>
                  
                  <View style={styles.previewImagesContainer}>
                    {/* Mock de íconos hasta que el backend envíe fotos de los ítems */}
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
                    onPress={() => navigation.navigate('SubastaDetalles', { id: subasta._id })}
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