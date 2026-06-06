import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoMedialunas() {
  const navigation = useNavigation();

  const itemData = {
    id: '05',
    nombre: 'Medialunas viejas',
    categoria: 'Alimentos Perecederos',
    motivo: 'Las políticas de Gavel & Gold prohíben estrictamente la subasta de artículos perecederos, alimentos sin envasar o que representen un riesgo biológico.'
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        <View style={styles.itemCard}>
          <Image source={require('../../../assets/itemsSubasta/medialuna.png')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{itemData.nombre}</Text>
            <Text style={styles.itemCategory}>{itemData.categoria}</Text>
            <Text style={styles.itemId}>ID: #{itemData.id}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
        {/* Pasamos 'rechazado' y el motivo para que el Tracker dibuje la X roja */}
        <TrackerTimeline estadoActual="rechazado" motivoRechazo={itemData.motivo} />

        <View style={[styles.infoCard, styles.infoCardError]}>
          <Text style={[styles.infoCardTitle, styles.infoCardTitleError]}>❌ Solicitud Rechazada</Text>
          <Text style={styles.textDescription}>
            No pudimos avanzar con la cotización de este artículo ya que incumple nuestros Términos y Condiciones vigentes.
          </Text>
        </View>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.goBack()}>
            <Text style={styles.btnSecondaryText}>Entendido</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}