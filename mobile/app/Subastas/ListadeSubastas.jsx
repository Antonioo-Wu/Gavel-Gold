import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import BottomNav from '../../components/BottomNav';
import AuctionCard from '../../components/AuctionCard';

import { listaDeSubastasStyles as styles } from '../../styles/subastas/ListaDeSubastas';

export default function ListadeSubastas() {
  const subastas = [
    { id: "S01", title: 'Subasta Especial Ghibli', category: 'Platino', image: require('../../assets/images/totoro_clock.jpg'), estado: 'En vivo' },
    { id: "S02", title: 'Subasta Fotografía Vintage', category: 'Oro', image: require('../../assets/images/camera.jpg'), estado: 'Próxima' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subastas</Text>
      <TextInput style={styles.search} placeholder="Búsqueda..." placeholderTextColor="#777" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {subastas.map(subasta => (
          <AuctionCard key={subasta.id} {...subasta} />
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}