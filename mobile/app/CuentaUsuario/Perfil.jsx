import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';

import { PerfilStlyes as styles } from '../../styles/Perfil.js';

export default function Perfil() {
  const navigation = useNavigation();

  const gridItems = [
    { icon: '👤', label: 'Mis datos', onPress: () => {} },
    { icon: '💳', label: 'Métodos de\npago', onPress: () => navigation.navigate('SeleccionMetodoPago') },
    { icon: '📈', label: 'Mis\nmétricas', onPress: () => {} },
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
        
        <Text style={styles.category}>Categoría: Común</Text>

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

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Splash')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}