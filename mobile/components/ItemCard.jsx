import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { misSubastasStyles as styles } from '../styles/misSubastas/MisSubastasStyles';

// Este componente es para mostrar cada artículo dentro de "Mis Subastas". 
export default function ItemCard({ item, onPress }) {
  
  // Función para determinar el color de la etiqueta según el estado
  const getTagColor = (estado) => {
    switch (estado) {
      case 'Pendiente de Revisión': return '#666666'; // Gris
      case 'Pendiente de Aprobación': return '#7B61FF'; // Violeta (Ajustado al mock)
      case 'Pendiente de Aprobación del Usuario': return '#7B61FF'; // Violeta
      case 'Aprobado': return '#27AE60'; // Verde
      case 'Rechazado': return '#EB5757'; // Rojo
      case 'En Subasta': return '#2D9CDB'; // Azul
      case 'En Depósito': return '#E0BF66'; // Dorado (Agregado para el Cassette)
      default: return '#090909';
    }
  };

  // 🚀 LA MAGIA ESTÁ ACÁ:
  // Si es un texto (URL web), lo envuelve en { uri: ... }
  // Si es un require (Local), lo pasa directo.
  const imageSource = typeof item.imagenUrl === 'string' 
    ? { uri: item.imagenUrl } 
    : item.imagenUrl;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardInfo}>
        
        {/* Etiqueta dinámica */}
        <View style={[styles.tag, { backgroundColor: getTagColor(item.estado) }]}>
          <Text style={styles.tagText}>{item.estado}</Text>
        </View>

        <Text style={styles.itemId}>{item.idCorto}</Text>
        <Text style={styles.itemName}>{item.nombre}</Text>
      </View>

      {/* Usamos la variable inteligente que creamos arriba */}
      <Image source={imageSource} style={styles.cardImage} />
    </TouchableOpacity>
  );
}