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
      default: return estado; // Fallback por si viene un estado desconocido
    }
  };

  // 2. Determinamos el color de la etiqueta según el estado técnico del backend
  const getTagColor = (estado) => {
    switch (estado) {
      case 'pendiente': return '#666666';           // Gris
      case 'pendiente_aceptacion': return '#7B61FF'; // Violeta
      case 'aprobado': return '#E0BF66';             // Dorado (En depósito)
      case 'disponible': return '#27AE60';           // Verde (Listo para subastar)
      case 'subastado': return '#2D9CDB';           // Azul
      case 'rechazado': return '#EB5757';           // Rojo
      default: return '#090909';
    }
  };

  // LÓGICA INTELIGENTE PARA LA IMAGEN:
  // Si viene una URL string (del back real) usa { uri }, si es local (require) pasa directo.
  const imageSource = typeof item.imagenUrl === 'string' 
    ? { uri: item.imagenUrl } 
    : item.imagenUrl;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardInfo}>
        
        {/* Etiqueta dinámica con color basado en el estado técnico */}
        <View style={[styles.tag, { backgroundColor: getTagColor(item.estado) }]}>
          {/* Mostramos el texto amigable formateado */}
          <Text style={styles.tagText}>{getEstadoFormateado(item.estado)}</Text>
        </View>

        {/* Mostramos el ID del item (si no tiene idCorto usamos los primeros dígitos del id real) */}
        <Text style={styles.itemId}>ID: #{item.idCorto || item.id?.toString().substring(0, 4)}</Text>
        <Text style={styles.itemName}>{item.nombre}</Text>
      </View>

      <Image source={imageSource} style={styles.cardImage} />
    </TouchableOpacity>
  );
}