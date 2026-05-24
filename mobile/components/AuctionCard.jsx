import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryPill from './CategoryPill';
import { auctionCardStyles as styles } from '../styles/components/AuctionCard.js';

export default function AuctionCard({ id, title, category, image, estado }) {
  const navigation = useNavigation();
  const imageSource = typeof image === 'string' ? { uri: image } : image;
  const estadoText = estado === 'abierta' ? 'En vivo' : 
                     estado === 'proximamente' ? 'Próxima' : 
                     estado === 'cerrada' ? 'Finalizada' : estado;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SubastaDetalles', { id })}
      style={styles.card}
    >
      <View style={styles.info}>
        <CategoryPill category={category} />

        {estado && (
          <View style={[styles.badge, estado === 'abierta' ? styles.badgeActive : styles.badgeInactive]}>
            <Text style={styles.badgeText}>{estadoText}</Text>
          </View>
        )}

        <Text style={styles.id}>#{id.slice(-6).toUpperCase()}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Image
        source={imageSource}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}