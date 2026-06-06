import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para el JWT en el futuro
import ItemCard from '../../../components/ItemCard';
import { misSubastasStyles as styles, MisSubastasTheme } from '../../../styles/misSubastas/MisSubastasStyles';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import { API_URL } from '../../../config/api'; 

export default function MisSubastas() {
  const navigation = useNavigation();
  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        // ==========================================
        // 🚀 PREPARADO PARA EL BACKEND REAL
        // ==========================================
        // const token = await AsyncStorage.getItem('userToken');
        // const response = await fetch(`${API_URL}/usuarios/mis-articulos`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const data = await response.json();
        
        // ==========================================
        // 📦 MOCK DATA PARA LA DEMO (Con Assets Locales)
        // ==========================================
        const mockData = [
          { 
            id: '1', 
            idCorto: '01', 
            nombre: 'Airfryer COSORI', 
            estado: 'Pendiente de Revisión', 
            imagenUrl: require('../../../assets/itemsSubasta/air_frier.png'),
            pantallaDestino: 'SeguimientoAirfryer' 
          },
          { 
            id: '2', 
            idCorto: '02', 
            nombre: 'Cassette Fleetwood Mac', 
            estado: 'En Depósito', 
            imagenUrl: require('../../../assets/itemsSubasta/rumours.jpg'),
            pantallaDestino: 'SeguimientoCassette' 
          },
          { 
            id: '3', 
            idCorto: '03', 
            nombre: 'Sony Walkman', 
            estado: 'Pendiente de Aprobación', 
            imagenUrl: require('../../../assets/itemsSubasta/walkman.png'),
            pantallaDestino: 'SeguimientoWalkman' 
          },
          { 
            id: '4', 
            idCorto: '04', 
            nombre: 'Pokemon Tamagotchi', 
            estado: 'Aprobado', 
            imagenUrl: require('../../../assets/itemsSubasta/tamagachi.png'),
            pantallaDestino: 'SeguimientoTamagotchi' 
          },
          { 
            id: '5', 
            idCorto: '05', 
            nombre: 'Medialunas viejas', 
            estado: 'Rechazado', 
            imagenUrl: require('../../../assets/itemsSubasta/medialuna.png'),
            pantallaDestino: 'SeguimientoMedialunas' 
          },
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
    // Ruteo dinámico: navega a la pantalla específica de cada ítem de demostración
    if (item.pantallaDestino) {
      navigation.navigate(item.pantallaDestino, { itemId: item.id });
    } else {
      // Fallback de seguridad
      navigation.navigate('DetalleArticulo', { itemId: item.id });
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.contentWrapper}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../../assets/logos/logotipo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Mis Subastas</Text>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            <AntDesign name="search" size={MisSubastasTheme.iconSize} color={MisSubastasTheme.colors.placeholder} />
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por ID o nombre..."
            placeholderTextColor={MisSubastasTheme.colors.placeholder}
          />
        </View>

        {/* Lista de Artículos */}
        {isLoading ? (
          <ActivityIndicator size={MisSubastasTheme.spinnerSize} color={MisSubastasTheme.colors.spinner} />
        ) : (
          <FlatList
            data={articulos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ItemCard item={item} onPress={() => handlePressItem(item)} />
            )}
            ListFooterComponent={
              <View style={styles.footerButtonsContainer}>
                <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreacionBienPaso1')}>
                  <Text style={styles.createButtonText}>Proponer Item</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>

      <BottomNav />
    </View>
  );
}