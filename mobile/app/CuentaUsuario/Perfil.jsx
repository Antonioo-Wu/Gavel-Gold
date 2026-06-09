import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api.js';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { PerfilStyles as styles, backgroundSource, PerfilTheme } from '../../styles/cuentaUsuario/Perfil.js';

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
    {
      icon: <Ionicons name="person-outline" size={PerfilTheme.iconGrid.size} color={PerfilTheme.iconGrid.color} />,
      label: 'Mis datos',
      bgColor: PerfilTheme.gridColors.misDatos,
      onPress: () => navigation.navigate('DatosUsuario')
    },
    {
      icon: <Ionicons name="card-outline" size={PerfilTheme.iconGrid.size} color={PerfilTheme.iconGrid.color} />,
      label: 'Métodos de\npago',
      bgColor: PerfilTheme.gridColors.metodosPago,
      onPress: () => navigation.navigate('UsuarioMediosPago')
    },
    {
      icon: <Ionicons name="stats-chart-outline" size={PerfilTheme.iconGrid.size} color={PerfilTheme.iconGrid.color} />,
      label: 'Mis métricas',
      bgColor: PerfilTheme.gridColors.misMetricas,
      onPress: () => navigation.navigate('Metricas')
    }
  ]
  
  const infoItems = [
    {
      icon: <Ionicons name="alert-circle-outline" size={PerfilTheme.iconInfo.size} color={PerfilTheme.iconInfo.color} />,
      label: 'Términos y Condiciones',
      onPress: () => navigation.navigate('TerminosyCondiciones')
    },
    {
      icon: <Ionicons name="shield-checkmark-outline" size={PerfilTheme.iconInfo.size} color={PerfilTheme.iconInfo.color} />,
      label: 'Política de Privacidad',
      onPress: () => navigation.navigate('PoliticadePrivacidad')
    },
    {
      icon: <Ionicons name="people-outline" size={PerfilTheme.iconInfo.size} color={PerfilTheme.iconInfo.color} />,
      label: 'Sobre nosotros',
      onPress: () => navigation.navigate('SobreNosotros')
    },
  ];

  return (
    <ImageBackground source={backgroundSource} style={styles.background}>

      <View style={styles.whiteCard}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer} >
          <View style={styles.header}>
                  <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
                  <Text style={styles.headerTitle}>Mi Perfil</Text>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Categoría:</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{categoria}</Text>
            </View>
          </View>

          <View style={styles.gridContainer}>
            {gridItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.gridItemWrapper} onPress={item.onPress}>
                <BlurView
                  intensity={PerfilTheme.blur.intensity}
                  tint={PerfilTheme.blur.tint}
                  style={[styles.gridIconContainer, { backgroundColor: item.bgColor }]}
                >
                  {item.icon}
                </BlurView>
                <Text style={styles.gridLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.subastasButton} onPress={() => navigation.navigate('MisArticulos')}>
            <Text style={styles.subastasText}>Mis Articulos</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Más información</Text>

            {infoItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.infoItem} onPress={item.onPress}>
                <View style={styles.infoItemLeft}>
                  <View style={styles.infoIconWrapper}>
                    {item.icon}
                  </View>
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