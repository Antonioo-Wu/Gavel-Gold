import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetricasStyles as styles, backgroundSource } from '../../styles/cuentaUsuario/Metricas.js';

export default function Metricas() {
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

  return (
    <ImageBackground source={backgroundSource} style={styles.container}>
      
      <View style={styles.header}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Mis Subastas</Text>
      </View>

      <Text style={styles.subtitle}>Categoría: {categoria}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Número de Subastas Ganadas</Text>
          <Text style={styles.metricValue}>5</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Número de Subastas Perdidas</Text>
          <Text style={styles.metricValue}>3</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Total Gastado</Text>   
          <Text style={styles.metricValue}>$1,200</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Total Ganado</Text>
          <Text style={styles.metricValue}>$2,500</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Número de Subastas Participadas</Text>
          <Text style={styles.metricValue}>15</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Número de Subastas Creadas</Text>
          <Text style={styles.metricValue}>4</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        </ScrollView>
            
      <BottomNav />
    </ImageBackground>
  );
}
