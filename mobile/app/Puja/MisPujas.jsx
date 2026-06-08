import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';
import FiltroModal from '../../components/FiltroModal';
import { misPujasStyles as styles } from '../../styles/puja/MisPujas';

export default function MisPujas() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('enCurso');
  const [searchQuery, setSearchQuery] = useState('');
  const [subastasEnCurso, setSubastasEnCurso] = useState([]);
  const [subastasFinalizadas, setSubastasFinalizadas] = useState([]);
  
  // Estados para Filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const cargarMisPujas = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        if (!token || !userDataString) return;
        const usuario = JSON.parse(userDataString);

        const [resActivas, resHistorial] = await Promise.all([
          fetch(`${API_URL}/usuarios/${usuario.id}/subastas-activas`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/usuarios/${usuario.id}/historial-participacion`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (resActivas.ok) setSubastasEnCurso(await resActivas.json());
        if (resHistorial.ok) setSubastasFinalizadas(await resHistorial.json());
      } catch (error) {
        console.error("Error cargando pujas", error);
      }
    };
    cargarMisPujas();
  }, []);

  // FILTRADO (Definido una sola vez)
  const rawData = activeTab === 'enCurso' ? subastasEnCurso : subastasFinalizadas;
  
  const dataToShow = rawData.filter(item => {
    if (!item) return false;
    const textoBusqueda = searchQuery.toLowerCase();
    const cumpleBusqueda = 
      (item.titulo?.toLowerCase().includes(textoBusqueda)) ||
      (item.nombreArticulo?.toLowerCase().includes(textoBusqueda));

    // Ajusta 'categoria' según el nombre real del campo en tu JSON
    const categoriaDelItem = item.categoria || (item.articulo && item.articulo.categoria);
    const cumpleCategoria = categoriaFiltro === 'Todos' || String(categoriaDelItem).toLowerCase() === String(categoriaFiltro).toLowerCase();
    
    return cumpleBusqueda && cumpleCategoria;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Pujar', { subastaId: item.subastaId, articuloId: item.articuloId })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.titulo || "Subasta sin nombre"}</Text>
        <Text style={styles.cardSubtitle}>{item.nombreArticulo || "Artículo desconocido"}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.estado || "Finalizado"}</Text>
        </View>
        <Text style={styles.cardInfoText}>
          Finaliza: {item.fechaCierre ? new Date(item.fechaCierre).toLocaleDateString() : 'N/A'}
        </Text>
      </View>
      <Image
        source={{ uri: item.imagenUrl || 'https://via.placeholder.com/100' }}
        style={styles.cardImage}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Mis Pujas</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'enCurso' && styles.activeTab]} onPress={() => setActiveTab('enCurso')}>
          <Text style={[styles.tabText, activeTab === 'enCurso' && styles.activeTabText]}>En curso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'finalizadas' && styles.activeTab]} onPress={() => setActiveTab('finalizadas')}>
          <Text style={[styles.tabText, activeTab === 'finalizadas' && styles.activeTabText]}>Finalizadas</Text>
        </TouchableOpacity>
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

      <FlatList
        data={dataToShow}
        keyExtractor={(item) => `${item.subastaId}-${item.articuloId}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No se encontraron subastas.</Text>
          </View>
        }
      />

      <FiltroModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categoria={categoriaFiltro}
        setCategoria={setCategoriaFiltro}
      />
      <BottomNav />
    </SafeAreaView>
  );
}