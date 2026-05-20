import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';

export default function SubastaDetalles() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // Así se recibe el ID en React Native

  const [auctionData] = useState({
    id: id,
    title: "Subasta Ghibli",
    catalog: [
      { id: 1001, name: "Reloj de Totoro original", price: 15000, desc: "Reloj despertador original.", img: require('../assets/images/totoro_clock.jpg') },
    ],
    currentIndex: 0
  });

  const currentItem = auctionData.catalog[auctionData.currentIndex];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.id}>{currentItem.id}</Text>
        <Image source={currentItem.img} style={styles.img} />
        <Text style={styles.name}>{currentItem.name}</Text>
        <Text style={styles.desc}>{currentItem.desc}</Text>
        <Text style={styles.price}>${currentItem.price}</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Pujar', { id: currentItem.id })}>
          <Text style={styles.btnText}>Entrar a Subasta</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B16', padding: 24 },
  card: { backgroundColor: '#090909', borderRadius: 16, padding: 16 },
  img: { width: '100%', height: 200, resizeMode: 'contain', backgroundColor: 'white' },
  name: { color: 'white', fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  price: { color: '#FFD700', fontSize: 24, fontWeight: 'bold' },
  btn: { backgroundColor: '#E0BF66', padding: 16, borderRadius: 50, marginTop: 20 },
  btnText: { textAlign: 'center', fontWeight: 'bold' }
});