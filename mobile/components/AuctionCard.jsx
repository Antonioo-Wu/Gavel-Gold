import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryPill from './CategoryPill';
import { auctionCardStyles as styles } from '../styles/components/AuctionCard.js';

export default function AuctionCard({ id, title, category, image, estado }) {
  const navigation = useNavigation();

  return (
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

      <Image
        source={{ uri: image }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}