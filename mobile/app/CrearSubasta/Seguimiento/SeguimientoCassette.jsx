import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoCassette() {
  const navigation = useNavigation();

  const itemData = {
    id: '02',
    nombre: 'Cassette Fleetwood Mac',
    categoria: 'Música / Vintage',
    ubicacion: 'Depósito Central - Sector A',
    poliza: 'SEG-9931-FM'
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        <View style={styles.itemCard}>
          <Image source={require('../../../assets/itemsSubasta/rumours.jpg')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{itemData.nombre}</Text>
            <Text style={styles.itemCategory}>{itemData.categoria}</Text>
            <Text style={styles.itemId}>ID: #{itemData.id}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
        <TrackerTimeline estadoActual="deposito" />

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>📦 Resguardo Físico</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ubicación:</Text>
            <Text style={styles.infoValue}>{itemData.ubicacion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Póliza Asignada:</Text>
            <Text style={styles.infoValue}>{itemData.poliza}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.textDescription}>
            El artículo se encuentra acondicionado en nuestras bóvedas bajo estrictos controles de humedad y temperatura a la espera de ser asignado a un evento de subasta.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}