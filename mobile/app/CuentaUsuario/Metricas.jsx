import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

// Importamos los estilos y el Theme
import { MetricasStyles as styles, backgroundSource, MetricasTheme } from '../../styles/cuentaUsuario/Metricas.js';

export default function Metricas() {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState('Cargando...');
  const [isLoading, setIsLoading] = useState(true);

  // Estado que refleja EXACTAMENTE el esquema "MetricasUsuario" del Swagger
  const [metricas, setMetricas] = useState({
    participadas: 0,
    ganadas: 0,
    ofertado: 0,
    pagado: 0
  });

  useEffect(() => {   
    const cargarDatosUsuarioYMetricas = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        
        if (userDataString) {
          const usuario = JSON.parse(userDataString);
          const cat = usuario.categoria || 'comun';
          const category = cat.charAt(0).toUpperCase() + cat.slice(1);
          setCategoria(category);

          // Petición real al backend
          if (token && usuario.id) {
            const response = await fetch(`${API_URL}/usuarios/${usuario.id}/estadisticas`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              const data = await response.json();
              
              // Mapeamos exclusivamente lo que devuelve el endpoint
              setMetricas({
                participadas: data.asistencias || 0,
                ganadas: data.victorias || 0,
                ofertado: data.importeOfertadoAcumulado || 0,
                pagado: data.importePagadoAcumulado || 0
              });
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar perfil o métricas", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatosUsuarioYMetricas();
  }, []);

  // Función para darle formato de moneda
  const formatDinero = (monto) => {
    return `$${monto.toLocaleString('es-AR')}`;
  };

  return (
    <ImageBackground source={backgroundSource} style={styles.container}>
      
      <View style={styles.header}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Mis Subastas</Text>
      </View>

      <Text style={styles.subtitle}>Categoría: {categoria}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {isLoading ? (
          <ActivityIndicator 
            size={MetricasTheme.indicatorSize} 
            color={MetricasTheme.colors.primary} 
          />
        ) : (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Subastas Participadas</Text>
              <Text style={styles.metricValue}>{metricas.participadas}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Subastas Ganadas</Text>
              <Text style={styles.metricValue}>{metricas.ganadas}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Importe Ofertado Acumulado</Text>   
              <Text style={styles.metricValue}>{formatDinero(metricas.ofertado)}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Importe Pagado Acumulado</Text>
              <Text style={styles.metricValue}>{formatDinero(metricas.pagado)}</Text>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

      </ScrollView>
            
      <BottomNav />
    </ImageBackground>
  );
}