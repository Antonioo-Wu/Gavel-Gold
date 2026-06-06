import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';

// IMPORTACIÓN CORREGIDA: Apunta al archivo unificado que creamos para todas las pantallas
import { seguimientoStyles as styles } from '../../../styles/misSubastas/SeguimientoItems';

export default function SeguimientoWalkman() {
  const navigation = useNavigation();

  // Datos fijos del bien según los requerimientos de tu mockup
  const walkmanData = {
    id: 'WK-8942',
    nombre: 'Sony Walkman TPS-L2 Clásico',
    categoria: 'Coleccionables / Vintage',
    precioBasePropuesto: 45000,
    comisionGavel: 2250, // 5% de comisión simulada
  };

  const handleAceptarPropuesta = () => {
    Alert.alert(
      "Propuesta Aceptada",
      "¡Excelente! El Walkman cambiará al estado 'En Depósito' para su resguardo y preparación final.",
      [{ text: "Entendido", onPress: () => navigation.goBack() }]
    );
  };

  const handleRechazarPropuesta = () => {
    Alert.alert(
      "Propuesta Rechazada",
      "Has rechazado los valores. Se coordinará la devolución del Walkman a tu domicilio registrado.",
      [{ text: "Entendido", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Botón Volver */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estado del Artículo</Text>

        {/* Ficha del Artículo */}
        <View style={styles.itemCard}>
          <Image 
            source={require('../../../assets/itemsSubasta/walkman.png')} 
            style={styles.itemImage} 
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{walkmanData.nombre}</Text>
            <Text style={styles.itemCategory}>{walkmanData.categoria}</Text>
            <Text style={styles.itemId}>ID: #{walkmanData.id}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Progreso de la Solicitud</Text>
        
        {/* Invocamos tu TrackerTimeline configurado en estado 'propuesta' */}
        <TrackerTimeline estadoActual="propuesta" />

        {/* Cuadro de la Propuesta Económica (Usando infoCard del estilo unificado) */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Aprobación de Valores Requerida</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Precio Base de Subasta:</Text>
            <Text style={styles.infoValue}>${walkmanData.precioBasePropuesto.toLocaleString('es-AR')}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Comisión de Plataforma (5%):</Text>
            <Text style={styles.infoValue}>-${walkmanData.comisionGavel.toLocaleString('es-AR')}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            {/* Forzamos el color dorado directo acá para no tocar el estilo maestro */}
            <Text style={[styles.infoLabel, { color: '#E0BF66', fontWeight: 'bold' }]}>Ganancia Neta Estimada:</Text>
            <Text style={[styles.infoValue, { color: '#E0BF66', fontSize: 16 }]}>
              ${(walkmanData.precioBasePropuesto - walkmanData.comisionGavel).toLocaleString('es-AR')}
            </Text>
          </View>
        </View>

        {/* Botones de Acción (Usando btnPrimary y btnSecondary unificados) */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btnPrimary} onPress={handleAceptarPropuesta}>
            <Text style={styles.btnPrimaryText}>Aceptar Propuesta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnSecondary, { borderColor: '#D32F2F' }]} 
            onPress={handleRechazarPropuesta}
          >
            <Text style={[styles.btnSecondaryText, { color: '#D32F2F' }]}>Rechazar y Solicitar Devolución</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}