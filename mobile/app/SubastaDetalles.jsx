import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';

import { subastaDetallesStlyes as styles } from '../styles/SubastaDetalles';

export default function SubastaDetalles() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
      
      <BottomNav />
    </View>
  );
}