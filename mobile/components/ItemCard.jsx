import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { misSubastasStyles as styles, ItemCardTheme } from '../styles/misSubastas/MisSubastasStyles';

export default function ItemCard({ item, onPress }) {

  const bgColor = ItemCardTheme.tagColors[item.estado] || ItemCardTheme.tagColors.default;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardInfo}>

        <View style={[styles.tag, { backgroundColor: bgColor }]}>
          <Text style={styles.tagText}>{item.estado}</Text>
        </View>

        <Text style={styles.itemId}>{item.idCorto}</Text>
        <Text style={styles.itemName}>{item.nombre}</Text>
      </View>

      <Image source={{ uri: item.imagenUrl }} style={styles.cardImage} />
    </TouchableOpacity>
  );
}