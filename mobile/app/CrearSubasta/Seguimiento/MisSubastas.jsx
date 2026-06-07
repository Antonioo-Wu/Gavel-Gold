import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemCard from '../../../components/ItemCard';
import { misSubastasStyles as styles, MisSubastasTheme } from '../../../styles/misSubastas/MisSubastasStyles';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';

export default function MisSubastas() {
  const navigation = useNavigation();
  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarArticulosSimulados = () => {
      // 📦 MOCK DATA OPTIMIZADA PARA LA DEMO DINÁMICA
      const mockData = [
        { 
          id: '1', 
          nombre: 'Airfryer COSORI', 
          estado: 'pendiente', // Simula inspección
          imagenUrl: require('../../../assets/itemsSubasta/air_frier.png'),
        },
        { 
          id: '2', 
          nombre: 'Cassette Fleetwood Mac', 
          estado: 'aprobado', // Simula depósito
          imagenUrl: require('../../../assets/itemsSubasta/rumours.jpg'),
        },
        { 
          id: '3', 
          nombre: 'Sony Walkman', 
          estado: 'pendiente_aceptacion', // Simula propuesta comercial
          imagenUrl: require('../../../assets/itemsSubasta/walkman.png'),
        },
        { 
          id: '4', 
          nombre: 'Pokemon Tamagotchi', 
          estado: 'subastado', // Simula asignado a evento
          imagenUrl: require('../../../assets/itemsSubasta/tamagachi.png'),
        },
        { 
          id: '5', 
          nombre: 'Medialunas viejas', 
          estado: 'rechazado', // Simula rechazo administrativo
          imagenUrl: require('../../../assets/itemsSubasta/medialuna.png'),
        },
      ];

      setArticulos(mockData);
      setIsLoading(false);
    };

    cargarArticulosSimulados();
  }, []);

  const handlePressItem = (item) => {
    // Mandamos el ID simulado hacia la pantalla única de seguimiento
    navigation.navigate('SeguimientoArticulo', { itemId: item.id });
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