import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { bottomNavStyles as styles } from '../styles/components/BottomNav.js';
import { AntDesign } from '@expo/vector-icons';

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('ListadeSubastas')}
      >
        <Text style={styles.navIcon}><AntDesign name="home" size={20} /></Text>
        <Text style={styles.navLabel}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.active]}
        onPress={() => navigation.navigate('ListadeSubastas')}
      >
        <Text style={styles.navIcon}><AntDesign name="shopping" size={20} /></Text>
        <Text style={styles.navLabel}>Subastas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.navIcon}><AntDesign name="user" size={20}/></Text>
        <Text style={styles.navLabel}>Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}