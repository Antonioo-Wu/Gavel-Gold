import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';

// Asumimos que creaste un Theme en tus estilos para los iconos
import { misPujasStyles as styles, MisPujasTheme } from '../../styles/puja/MisPujas';

export default function MisPujas() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('enCurso');
  const [searchQuery, setSearchQuery] = useState('');

  // Estados inicializados con tus mockups
  const [subastasEnCurso, setSubastasEnCurso] = useState([
    {
      id: '1', titulo: 'Subasta 1', estado: 'En Curso', cantidadItems: 10,
      fechaFinalizacion: '13/05/2026 - 15:30', imagenUrl: 'https://via.placeholder.com/100',
    },
    {
      id: '2', titulo: 'Subasta 2', estado: 'En Curso', cantidadItems: 5,
      fechaFinalizacion: '14/05/2026 - 18:00', imagenUrl: 'https://via.placeholder.com/100',
    }
  ]);
  const [subastasFinalizadas, setSubastasFinalizadas] = useState([]);

  // CONEXIÓN CON EL BACKEND
  useEffect(() => {
    const cargarMisPujas = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        if (!token || !userDataString) return;

        const usuario = JSON.parse(userDataString);

        // 1. Traemos subastas activas
        const resActivas = await fetch(`${API_URL}/usuarios/${usuario.id}/subastas-activas`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resActivas.ok) {
          const dataActivas = await resActivas.json();
          if (dataActivas.length > 0) setSubastasEnCurso(dataActivas); // Reemplaza el mock si hay data
        }

        // 2. Traemos historial (finalizadas)
        const resHistorial = await fetch(`${API_URL}/usuarios/${usuario.id}/historial-participacion`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resHistorial.ok) {
          const dataHistorial = await resHistorial.json();
          if (dataHistorial.length > 0) setSubastasFinalizadas(dataHistorial);
        }

      } catch (error) {
        console.error("Error cargando pujas del usuario", error);
      }
    };

    cargarMisPujas();
  }, []);

  const dataToShow = activeTab === 'enCurso' ? subastasEnCurso : subastasFinalizadas;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('SubastaDetalles', { subastaId: item.id || item.subastaId })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.estado}</Text>
        </View>
        {item.cantidadItems && <Text style={styles.cardInfoText}>{item.cantidadItems} items</Text>}
        <Text style={styles.cardInfoText}>Finaliza: {item.fechaFinalizacion || item.fechaCierre}</Text>
      </View>
      <Image source={{ uri: item.imagenUrl || 'https://via.placeholder.com/100' }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Subastas Activas</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'enCurso' && styles.activeTab]}
          onPress={() => setActiveTab('enCurso')}
        >
          <Text style={[styles.tabText, activeTab === 'enCurso' && styles.activeTabText]}>
            Subastas en curso
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'finalizadas' && styles.activeTab]}
          onPress={() => setActiveTab('finalizadas')}
        >
          <Text style={[styles.tabText, activeTab === 'finalizadas' && styles.activeTabText]}>
            Subastas finalizadas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            <AntDesign name="search" size={MisPujasTheme.iconSize} color={MisPujasTheme.iconColor} />
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Búsqueda"
            placeholderTextColor={MisPujasTheme.placeholderColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={MisPujasTheme.iconSize} color={MisPujasTheme.textColor} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.id || item.subastaId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay subastas para mostrar aquí.</Text>
        }
      />

      <BottomNav />
    </View>
  );
}