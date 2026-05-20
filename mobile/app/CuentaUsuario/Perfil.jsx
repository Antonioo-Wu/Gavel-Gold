import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../../components/BottomNav';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  gridItem: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  gridIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    margin: 16,
    marginBottom: 80,
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});