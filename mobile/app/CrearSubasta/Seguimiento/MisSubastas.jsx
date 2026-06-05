import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemCard from '../../../components/ItemCard';
// Importamos los estilos y el Theme
import { misSubastasStyles as styles, MisSubastasTheme } from '../../../styles/misSubastas/MisSubastasStyles';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';

export default function MisSubastas() {
  const navigation = useNavigation();
  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
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
    navigation.navigate('DetalleArticulo', { itemId: item.id });
  };

  return (
    <View style={styles.mainWrapper}>

      {/* Todo el contenido con márgenes va acá adentro */}
      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../../assets/logos/logotipo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Mis Subastas</Text>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            <AntDesign name="search" size={MisSubastasTheme.iconSize} />
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Búsqueda"
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

      {/* EL NAVBAR QUEDA LIBRE DEL PADDING Y TOCA LOS BORDES */}
      <BottomNav />

    </View>
  );
}