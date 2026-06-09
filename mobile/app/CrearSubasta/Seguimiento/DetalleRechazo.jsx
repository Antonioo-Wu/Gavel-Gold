import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline'; // Ajustá la ruta según tu proyecto
import { detalleRechazoStyles as styles } from '../../../styles/misSubastas/DetalleRechazoStyles';

export default function DetalleRechazo({ route }) {
  const navigation = useNavigation();
  
  // En la implementación real, estos datos vendrán del backend usando el ID del route.params
  const mockItem = {
    id: '05',
    nombre: 'Medialunas viejas',
    imagenUrl: 'https://via.placeholder.com/80', // Podés usar el require del asset acá
    motivo: 'El artículo no cumple con los estándares de conservación y legalidad requeridos por Gavel & Gold.'
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Seguimiento de Artículo</Text>
        </View>

        <View style={styles.itemInfoContainer}>
          <Image source={{ uri: mockItem.imagenUrl }} style={styles.itemImage} />
          <View>
            <Text style={styles.itemName}>{mockItem.nombre}</Text>
            <Text style={styles.itemId}>ID: {mockItem.id}</Text>
          </View>
        </View>

        {/* Llamamos al Tracker pasándole el estado rechazado */}
        <TrackerTimeline
          estadoActual="rechazado"
          motivoRechazo={mockItem.motivo}
        />

        <View style={styles.cardMotivo}>
          <Text style={styles.cardTitle}>❌ Artículo Rechazado</Text>
          <Text style={styles.cardText}>
            Tras la inspección física, la empresa ha decidido no incluir este artículo en las próximas subastas.
            {'\n\n'}
            El artículo será devuelto a tu domicilio registrado. Los cargos de envío se debitarán de tu medio de pago asociado.
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver a Mis Subastas</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}