import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
// 1. Agregamos useRoute a la importación
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { bottomNavStyles as styles, BottomNavTheme } from '../styles/components/BottomNav.js';
import { AntDesign } from '@expo/vector-icons';

export default function BottomNav() {
  const navigation = useNavigation();
  // 2. Obtenemos la información de la pantalla actual
  const route = useRoute(); 

  return (
    <View style={styles.container}>
      
      {/* Botón Inicio */}
      <TouchableOpacity
        // 3. Condición dinámica: Si el nombre de la ruta es 'ListadeSubastas', aplicamos el estilo activo
        style={[styles.navButton, route.name === 'ListadeSubastas' ? styles.active : null]}
        onPress={() => navigation.navigate('ListadeSubastas')}
      >
        <Text style={styles.navIcon}>
          <AntDesign name="home" size={BottomNavTheme.iconSize} />
        </Text>
        <Text style={styles.navLabel}>Inicio</Text>
      </TouchableOpacity>

      {/* Botón Subastas */}
      <TouchableOpacity
        style={[styles.navButton, route.name === 'MisPujas' ? styles.active : null]}
        onPress={() => navigation.navigate('MisPujas')}
      >
        <Text style={styles.navIcon}>
          <AntDesign name="shopping" size={BottomNavTheme.iconSize} />
        </Text>
        <Text style={styles.navLabel}>Subastas</Text>
      </TouchableOpacity>

      {/* Botón Cuenta */}
      <TouchableOpacity
        style={[styles.navButton, route.name === 'Perfil' ? styles.active : null]}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.navIcon}>
          <AntDesign name="user" size={BottomNavTheme.iconSize} />
        </Text>
        <Text style={styles.navLabel}>Cuenta</Text>
      </TouchableOpacity>

    </View>
  );
}