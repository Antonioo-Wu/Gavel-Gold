import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemCard from '../../../components/ItemCard';
import { styles } from '../../../styles/misSubastas/MisSubastasStyles';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import CreacionBienPaso1 from '../Creacion/CreacionBienPaso1';
// import { API_URL } from '../../config/api';

export default function MisSubastas() {
  const navigation = useNavigation();
  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulación de la llamada al backend
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        // Acá iría el fetch real: const response = await fetch(`${API_URL}/usuarios/me/articulos`);
        
        // Mock de datos para probar la UI mientras arman el endpoint
        const mockData = [
          { id: '1', idCorto: '01', nombre: 'Airfryer COSORI', estado: 'Pendiente de Revisión', imagenUrl: 'https://via.placeholder.com/80' },
          { id: '2', idCorto: '02', nombre: 'Cartera City Bag Miu Miu', estado: 'En Subasta', imagenUrl: 'https://via.placeholder.com/80' },
          { id: '3', idCorto: '03', nombre: 'Sony Walkman', estado: 'Pendiente de Aprobación del Usuario', imagenUrl: 'https://via.placeholder.com/80' },
          { id: '4', idCorto: '04', nombre: 'Pokemon tamagotchi', estado: 'Aprobado', imagenUrl: 'https://via.placeholder.com/80' },
          { id: '5', idCorto: '05', nombre: 'Medialunas viejas', estado: 'Rechazado', imagenUrl: 'https://via.placeholder.com/80' },
        ];
        
        setArticulos(mockData);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticulos();
  }, []);

  const handlePressItem = (item) => {
    // Al tocar una tarjeta, enviamos al usuario a la vista de detalle pasando el ID
    navigation.navigate('DetalleArticulo', { itemId: item.id });
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Mis Subastas</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}><AntDesign name="search" size={20} /></Text>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Búsqueda" 
          placeholderTextColor="#666" 
        />
      </View>

      {/* Lista de Artículos */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#E0BF66" />
      ) : (
        <FlatList
          data={articulos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ItemCard item={item} onPress={() => handlePressItem(item)} />
          )}
        />
      )}

      {/* Botón Flotante para crear */}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreacionBienPaso1')}>
          <Text style={styles.createButtonText}>Proponer Item</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />

    </View>
  );
}