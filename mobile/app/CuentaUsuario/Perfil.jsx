import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api.js';

import { PerfilStlyes as styles } from '../../styles/cuentaUsuario/Perfil.js';

export default function Perfil() {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState('Cargando...');

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const usuario = JSON.parse(userDataString);
          const category = usuario.categoria.charAt(0).toUpperCase() + usuario.categoria.slice(1);
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
    { icon: '💳', label: 'Métodos de pago', onPress: () => navigation.navigate('UsuarioMediosPago') },
    { icon: '📈', label: 'Mis métricas', onPress: () => { } },
  ];

  const infoItems = [
    { icon: 'ℹ️', label: 'Términos y Condiciones', onPress: () => navigation.navigate('TerminosyCondiciones') },
    { icon: '🔒', label: 'Política de Privacidad', onPress: () => navigation.navigate('PoliticadePrivacidad') },
    { icon: '👥', label: 'Sobre nosotros', onPress: () => navigation.navigate('SobreNosotros') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mi Perfil</Text>

        <Text style={styles.category}>Categoría: {categoria}</Text>

        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem} onPress={item.onPress}>
              <Text style={styles.gridIcon}>{item.icon}</Text>
              <Text style={styles.gridLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Más información</Text>

          {infoItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.infoItem} onPress={item.onPress}>
              <Text style={styles.infoIcon}>{item.icon}</Text>
              <Text style={styles.infoLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      // Acá debería ir un botón de "Mis Subastas" @Nachoooo tiene que ser cremita como esta en el figma!!!!

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Mis Subastas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}