import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // CAMBIO CLAVE

export default function BottomNav() {
  const navigation = useNavigation(); // CAMBIO CLAVE

  return (
    <View style={styles.container}>
      {/* Botón Inicio */}
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navLabel}>Inicio</Text>
      </TouchableOpacity>

      {/* Botón Subastas */}
      <TouchableOpacity 
        style={[styles.navButton, styles.active]} 
        onPress={() => navigation.navigate('Subastas')}
      >
        <Text style={styles.navIcon}>🛍️</Text>
        <Text style={styles.navLabel}>Subastas</Text>
      </TouchableOpacity>

      {/* Botón Cuenta */}
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.navIcon}>👤</Text>
        <Text style={styles.navLabel}>Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Para poner los botones uno al lado del otro
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#090909', // Color oscuro para que combine con tu app
    borderTopWidth: 1,
    borderColor: '#333',
    position: 'absolute', // Fija la barra al fondo
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
    padding: 8,
  },
  active: {
    borderBottomWidth: 2, // Una forma visual de marcar el activo
    borderBottomColor: '#E0BF66',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#F6F1E7',
  }
});