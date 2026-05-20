import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ÚNICA forma de navegar
import CategoryPill from './CategoryPill';

export default function AuctionCard({ id, title, category, image, estado }) {
  const navigation = useNavigation();

  return (
    // Reemplazamos div por TouchableOpacity (porque es un botón/clicable)
    <TouchableOpacity 
      onPress={() => navigation.navigate('Detalles', { id })}
      style={styles.card}
    >
      <View style={styles.info}>
        <CategoryPill category={category} />
        
        {estado && (
          <View style={[styles.badge, { backgroundColor: estado === 'En vivo' ? '#f44336' : '#555' }]}>
            <Text style={styles.badgeText}>{estado}</Text>
          </View>
        )}
        
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Reemplazamos img por Image */}
      <Image 
        source={{ uri: image }} 
        style={styles.image} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1B16',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row', // Para poner texto e imagen lado a lado
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  info: { flex: 1 },
  id: { color: '#E0BF66', marginVertical: 8, fontWeight: 'bold' },
  title: { color: '#F6F1E7' },
  image: { width: 80, height: 80, borderRadius: 8, marginLeft: 16, backgroundColor: 'white' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: 4 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});