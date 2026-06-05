import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav'; // Ajustá la ruta según tu proyecto

import { styles } from '../../styles/../styles/puja/MisPujas'; // Ajustá la ruta

export default function MisPujas() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('enCurso');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock de datos basado en tu diseño (subastas donde el usuario está pujando)
  const mockSubastasEnCurso = [
    {
      id: '1',
      titulo: 'Subasta 1',
      estado: 'En Curso',
      cantidadItems: 10,
      fechaFinalizacion: '13/05/2026 - 15:30',
      imagenUrl: 'https://via.placeholder.com/100', // Reemplazar con imagen real
    },
    {
      id: '2',
      titulo: 'Subasta 2',
      estado: 'En Curso',
      cantidadItems: 5,
      fechaFinalizacion: '14/05/2026 - 18:00',
      imagenUrl: 'https://via.placeholder.com/100', // Reemplazar con imagen real
    }
  ];

  const mockSubastasFinalizadas = [
    // Acá irían las subastas que ya terminaron
  ];

  // Dependiendo de la pestaña activa, mostramos una lista u otra
  const dataToShow = activeTab === 'enCurso' ? mockSubastasEnCurso : mockSubastasFinalizadas;

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => navigation.navigate('DetalleSubasta', { subastaId: item.id })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        
        {/* Badge de Estado */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.estado}</Text>
        </View>

        <Text style={styles.cardInfoText}>{item.cantidadItems} items</Text>
        <Text style={styles.cardInfoText}>Finaliza en {item.fechaFinalizacion}</Text>
      </View>

      {/* Imagen a la derecha */}
      <Image source={{ uri: item.imagenUrl }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Subastas Activas</Text>
      </View>

      {/* Tabs (Pestañas) */}
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

      {/* Buscador y Filtro */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}><AntDesign name="search" size={20} color="#666" /></Text>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Búsqueda" 
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#090909" />
        </TouchableOpacity>
      </View>

      {/* Lista de Subastas */}
      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay subastas para mostrar aquí.</Text>
        }
      />

      {/* Navegación Inferior */}
      <BottomNav />
      
    </View>
  );
}