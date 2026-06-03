import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api.js';

import { PerfilStyles as styles, backgroundSource } from '../../styles/cuentaUsuario/Perfil.js';

export default function Perfil() {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState('Cargando...');

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const usuario = JSON.parse(userDataString);
          const cat = usuario.categoria || 'comun';
          const category = cat.charAt(0).toUpperCase() + cat.slice(1);
          setCategoria(category);
        }
      } catch (error) {
        console.error("Error al cargar perfil", error);
      }
    };

    cargarDatosUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error("Error comunicándose con el servidor en el logout", error);
    } finally {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Splash'); 
    }
  };

  const gridItems = [
    { icon: '👤', label: 'Mis datos', onPress: () => navigation.navigate('DatosUsuario') },
    { icon: '💳', label: 'Métodos de\npago', onPress: () => navigation.navigate('UsuarioMediosPago') },
    { icon: '📈', label: 'Mis métricas', onPress: () => { } },
  ];

  const infoItems = [
    { icon: '📄', label: 'Términos y Condiciones', onPress: () => navigation.navigate('TerminosyCondiciones') },
    { icon: '🔒', label: 'Política de Privacidad', onPress: () => navigation.navigate('PoliticadePrivacidad') },
    { icon: '👥', label: 'Sobre nosotros', onPress: () => navigation.navigate('SobreNosotros') },
  ];

  return (
    <ImageBackground source={backgroundSource} style={styles.background}>
      
      {/* Tarjeta Blanca Frontal */}
      <View style={styles.whiteCard}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer} >
          
          <Text style={styles.title}>Mi Perfil</Text>

          {/* Etiqueta de Categoría */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Categoría:</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{categoria}</Text>
            </View>
          </View>

          {/* Grilla de Opciones Rápidas */}
          <View style={styles.gridContainer}>
            {gridItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.gridItemWrapper} onPress={item.onPress}>
                <View style={styles.gridIconContainer}>
                  <Text style={styles.gridIcon}>{item.icon}</Text>
                </View>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.subastasButton} onPress={() => navigation.navigate('MisSubastas')}>
            <Text style={styles.subastasText}>Mis Subastas</Text>
          </TouchableOpacity>

          {/* Lista de Información */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Más información</Text>

            {infoItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.infoItem} onPress={item.onPress}>
                <View style={styles.infoItemLeft}>
                  <Text style={styles.infoIcon}>{item.icon}</Text>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                </View>
                <Text style={styles.arrowIcon}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

        
         
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      
      <BottomNav />
      
    </ImageBackground>
  );
}