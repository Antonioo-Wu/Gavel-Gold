import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoAirfryer() {
  const navigation = useNavigation();

  const itemData = {
    id: '01',
    nombre: 'Airfryer COSORI',
    categoria: 'Electrodomésticos'
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        <View style={styles.itemCard}>
          <Image source={require('../../../assets/itemsSubasta/air_frier.png')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{itemData.nombre}</Text>
            <Text style={styles.itemCategory}>{itemData.categoria}</Text>
            <Text style={styles.itemId}>ID: #{itemData.id}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
        <TrackerTimeline estadoActual="inspeccion" />

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>🔍 Inspección en Curso</Text>
          <Text style={styles.textDescription}>
            Hemos recibido el artículo en nuestra sucursal. En estos momentos, el equipo de expertos de Gavel & Gold está verificando su funcionalidad, estado de conservación y autenticidad. {'\n\n'}
            Te notificaremos cuando la propuesta comercial esté lista.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}