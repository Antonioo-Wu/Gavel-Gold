import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { misSubastasStyles as styles } from '../styles/misSubastas/MisSubastasStyles';

// Este componente es para mostrar cada artículo dentro de "Mis Subastas". 
export default function ItemCard({ item, onPress }) {

  // 1. Traducimos los estados técnicos a nombres limpios y estéticos para el usuario
  const getEstadoFormateado = (estado) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente de Revisión';
      case 'pendiente_aceptacion': return 'Pendiente de Aprobación';
      case 'aprobado': return 'En Depósito';
      case 'disponible': return 'Listo para Subastar';
      case 'subastado': return 'En Subasta';
      case 'rechazado': return 'Rechazado';
      default: return estado;
    }
  };

  const getTagColor = (estado) => {
    switch (estado) {
      case 'pendiente': return '#666666';
      case 'pendiente_aceptacion': return '#7B61FF';
      case 'aprobado': return '#E0BF66';
      case 'disponible': return '#27AE60';
      case 'subastado': return '#2D9CDB';
      case 'rechazado': return '#EB5757';
      default: return '#090909';
    }
  };

  const imageSource = typeof item.imagenUrl === 'string'
    ? { uri: item.imagenUrl }
    : item.imagenUrl;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardInfo}>

        <View style={[styles.tag, { backgroundColor: getTagColor(item.estado) }]}>
          <Text style={styles.tagText}>{getEstadoFormateado(item.estado)}</Text>
        </View>

        <Text style={styles.itemId}>ID: {item.idVisual || `#${String(item.id).slice(-6)}`}</Text>
        <Text style={styles.itemName}>{item.nombre}</Text>
      </View>

      <Image source={imageSource} style={styles.cardImage} />
    </TouchableOpacity>
  );
}