import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import BottomNav from '../components/BottomNav';
import AuctionCard from '../components/AuctionCard';

export default function ListadeSubastas() {
  const subastas = [
    { id: "S01", title: 'Subasta Especial Ghibli', category: 'Platino', image: require('../assets/images/totoro_clock.jpg'), estado: 'En vivo' },
    { id: "S02", title: 'Subasta Fotografía Vintage', category: 'Oro', image: require('../assets/images/camera.jpg'), estado: 'Próxima' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subastas</Text>
      <TextInput style={styles.search} placeholder="Búsqueda..." />

      <ScrollView>
        {subastas.map(subasta => (
          <AuctionCard key={subasta.id} {...subasta} />
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#090909' },
  title: { fontSize: 24, color: 'white', marginBottom: 16, fontWeight: 'bold' },
  search: { backgroundColor: '#1E1B16', padding: 12, borderRadius: 8, color: 'white', marginBottom: 16 }
});