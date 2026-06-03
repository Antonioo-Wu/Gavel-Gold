import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/misSubastas/MisSubastasStyles';



// Este componente es para mostrar cada artículo dentro de "Mis Subastas". Recibe un objeto "item" con la información del artículo y una función "onPress" para manejar la navegación al detalle del artículo.
export default function ItemCard({ item, onPress }) {
  
  // Función para determinar el color de la etiqueta según el estado que venga del backend
  const getTagColor = (estado) => {
    switch (estado) {
      case 'Pendiente de Revisión': return '#666666'; // Gris
      case 'Pendiente de Aprobación del Usuario': return '#7B61FF'; // Violeta
      case 'Aprobado': return '#27AE60'; // Verde
      case 'Rechazado': return '#EB5757'; // Rojo
      case 'En Subasta': return '#2D9CDB'; // Azul
      default: return '#090909';
    }
  };

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

      {/* Imagen del artículo (Asume que viene una URL del backend) */}
      <Image source={{ uri: item.imagenUrl }} style={styles.cardImage} />
    </TouchableOpacity>
  );
}