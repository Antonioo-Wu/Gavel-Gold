import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../components/BottomNav';
import { API_URL } from '../../config/api';

import { misPujasStyles as styles, MisPujasTheme } from '../../styles/puja/MisPujas';

export default function MisPujas() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('enCurso');
  const [searchQuery, setSearchQuery] = useState('');

  const [subastasEnCurso, setSubastasEnCurso] = useState([]);
  const [subastasFinalizadas, setSubastasFinalizadas] = useState([]);

  const rawData = activeTab === 'enCurso' ? subastasEnCurso : subastasFinalizadas;
  const dataToShow = rawData.filter(item => item && (item.subastaId || item.articuloId));

  useEffect(() => {
    const cargarMisPujas = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        if (!token || !userDataString) return;

        const usuario = JSON.parse(userDataString);

        const resActivas = await fetch(`${API_URL}/usuarios/${usuario.id}/subastas-activas`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resActivas.ok) {
          const data = await resActivas.json();
          setSubastasEnCurso(Array.isArray(data) ? data : []);
        }

        const resHistorial = await fetch(`${API_URL}/usuarios/${usuario.id}/historial-participacion`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resHistorial.ok) {
          const data = await resHistorial.json();
          setSubastasFinalizadas(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error cargando pujas", error);
      }
    };

    cargarMisPujas();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Pujar', {
        subastaId: item.subastaId,
        articuloId: item.articuloId
      })}
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

      <FlatList
        data={dataToShow}
        keyExtractor={(item) => `${item.subastaId}-${item.articuloId}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay subastas para mostrar aquí.</Text>
        }
      />
      <BottomNav />
    </SafeAreaView>
  );
}