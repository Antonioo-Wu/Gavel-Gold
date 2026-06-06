import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoTamagotchi() {
  const navigation = useNavigation();

  const itemData = {
    id: '04',
    nombre: 'Pokemon Tamagotchi',
    categoria: 'Electrónica / Juguetes',
    subastaAsignada: 'Gran Subasta de Electrónica Vintage',
    fechaSubasta: '24 de Noviembre, 18:00 hs'
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        <View style={styles.itemCard}>
          <Image source={require('../../../assets/itemsSubasta/tamagachi.png')} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{itemData.nombre}</Text>
            <Text style={styles.itemCategory}>{itemData.categoria}</Text>
            <Text style={styles.itemId}>ID: #{itemData.id}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
        {/* El estado 'listo' marca todo el timeline en verde */}
        <TrackerTimeline estadoActual="listo" />

        <View style={[styles.infoCard, { borderColor: '#4CD964' }]}>
          <Text style={[styles.infoCardTitle, { color: '#4CD964' }]}>✅ ¡Asignado a Subasta!</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Evento:</Text>
            <Text style={[styles.infoValue, {flex: 1, textAlign: 'right', marginLeft: 15}]}>{itemData.subastaAsignada}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha de Inicio:</Text>
            <Text style={styles.infoValue}>{itemData.fechaSubasta}</Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('ListadeSubastas')}>
            <Text style={styles.btnPrimaryText}>Ir a la Subasta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}