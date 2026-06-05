import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { detalleDepositoStyles as styles } from '../../../styles/misSubastas/DetalleDepositoStyles';

export default function DetalleDeposito({ route }) {
  const navigation = useNavigation();

  // Mock de datos del backend para mostrar la ubicación y el seguro
  const mockItem = {
    id: '01',
    nombre: 'Airfryer COSORI',
    imagenUrl: 'https://via.placeholder.com/80',
    ubicacion: {
      sucursal: 'Depósito Central (Av. Corrientes)',
      sector: 'Sector B',
      estante: '42'
    },
    seguro: {
      poliza: '8942-B',
      aseguradora: 'La Caja Seguros S.A.',
      cobertura: 150000 // Monto por el cual fue tasado
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
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

        {/* Tracker seteado en estado 'deposito' (marca todo verde hasta ahí) */}
        <TrackerTimeline estadoActual="deposito" />

        <View style={styles.cardLogistica}>
          <Text style={styles.cardTitle}>✅ Listo para Subastar</Text>
          
          <Text style={styles.sectionTitle}>Ubicación Física</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Sucursal:</Text>
            <Text style={styles.value}>{mockItem.ubicacion.sucursal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sector / Estante:</Text>
            <Text style={styles.value}>{mockItem.ubicacion.sector} - Est. {mockItem.ubicacion.estante}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Póliza de Seguro</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Aseguradora:</Text>
            <Text style={styles.value}>{mockItem.seguro.aseguradora}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>N° de Póliza:</Text>
            <Text style={styles.value}>{mockItem.seguro.poliza}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monto Cobertura:</Text>
            <Text style={styles.value}>${mockItem.seguro.cobertura.toLocaleString('es-AR')}</Text>
          </View>
        </View>

        {/* Botón sugerido para que navegue directo a la subasta si ya tiene una asignada */}
        <TouchableOpacity 
          style={styles.btnPrimary} 
          onPress={() => navigation.navigate('SubastaDetalles', { itemId: mockItem.id })}
        >
          <Text style={styles.btnPrimaryText}>Ver Subasta Asignada</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.goBack()}>
          <Text style={styles.btnSecondaryText}>Volver a Mis Subastas</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}