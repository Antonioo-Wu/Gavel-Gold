import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // IMPORTANTE: Para obtener el usuario
import ItemCard from '../../../components/ItemCard';
import { misSubastasStyles as styles, MisSubastasTheme } from '../../../styles/misSubastas/MisSubastasStyles';
import BottomNav from '../../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
import { API_URL } from '../../../config/api'; // IMPORTANTE: Para la URL del fetch

export default function MisArticulos() {
  const navigation = useNavigation();
  const [articulos, setArticulos] = useState([]);
  const [articulosRaw, setArticulosRaw] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMisArticulos = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');

        if (!token || !userDataString) {
          Alert.alert("Atención", "Debes iniciar sesión para ver tus subastas.");
          navigation.navigate('Login');
          return;
        }

        const usuario = JSON.parse(userDataString);

        // Llamada real al backend para buscar TUS artículos
        const response = await fetch(`${API_URL}/usuarios/${usuario.id}/articulos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          // Guardamos datos crudos para pantallas que necesitan el objeto completo
          setArticulosRaw(data);
          // Mapeamos los datos reales para que ItemCard los entienda igual que los mocks
          const articulosFormateados = data.map(item => ({
            id: item.id || item._id, // En MongoDB viene como _id
            nombre: item.nombre,
            estado: item.estado,
            // Tomamos la primera foto del array de Cloudinary, si existe
            imagenUrl: item.fotos && item.fotos.length > 0 ? { uri: item.fotos[0] } : require('../../../assets/logos/logo.png'),
          }));

          setArticulos(articulosFormateados);
        } else {
          console.error("Error del back:", data.mensaje);
        }
      } catch (error) {
        console.error("Error de red:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      } finally {
        setIsLoading(false);
      }
    };

    // Usamos focus para que, si el usuario crea un item y vuelve a esta pantalla, se refresque automáticamente
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      fetchMisArticulos();
    });

    return unsubscribe;
  }, [navigation]);

  const handlePressItem = (item) => {
    if (item.estado === 'pendiente_aceptacion') {
      const articuloCompleto = articulosRaw.find(a => (a.id || a._id).toString() === item.id.toString());
      navigation.navigate('DetallePropuesta', { articulo: articuloCompleto || item });
    } else {
      navigation.navigate('SeguimientoArticulo', { itemId: item.id });
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.contentWrapper}>

        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../../assets/logos/logotipo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Mis Articulos</Text>
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
        <FlatList
          data={articulos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                <ActivityIndicator size={MisSubastasTheme.spinnerSize} color={MisSubastasTheme.colors.spinner} />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <ItemCard item={item} onPress={() => handlePressItem(item)} />
          )}
          ListEmptyComponent={
            !isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Aún no has propuesto ningún artículo.</Text>
              </View>
            ) : null
          }
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
      </View>

      <BottomNav />
    </View>
  );
}