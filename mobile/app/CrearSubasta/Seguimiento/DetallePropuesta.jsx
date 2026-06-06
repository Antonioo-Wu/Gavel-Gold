import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { detallePropuestaStyles as styles } from '../../../styles/misSubastas/DetallePropuestaStyles';

export default function DetallePropuesta({ route }) {
  const navigation = useNavigation();

  // Mock de datos del backend
  const mockItem = {
    id: '03',
    nombre: 'Sony Walkman Clásico',
    imagenUrl: 'https://via.placeholder.com/80', 
    precioBase: 50000,
    comisionPorcentaje: 5,
    comisionValor: 2500
  };

  const handleAceptar = () => {
    // Acá iría el fetch POST al backend para aceptar las condiciones
    Alert.alert("¡Éxito!", "Has aceptado las condiciones. El artículo será ingresado a depósito para su subasta.");
    navigation.goBack(); // O redirigir a la vista "En Depósito"
  };

  const handleRechazar = () => {
    // Acá iría el fetch POST al backend rechazando las condiciones
    Alert.alert("Propuesta Rechazada", "Se procederá a la devolución del artículo. Se aplicarán cargos de logística.");
    navigation.goBack();
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

        {/* Tracker frenado en el estado Propuesta */}
        <TrackerTimeline estadoActual="propuesta" />

        <View style={styles.cardPropuesta}>
          <Text style={styles.cardTitle}>⚠️ Pendiente de Aprobación</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Precio Base Propuesto</Text>
            <Text style={styles.value}>${mockItem.precioBase.toLocaleString('es-AR')}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Comisión Gavel & Gold ({mockItem.comisionPorcentaje}%)</Text>
            <Text style={styles.value}>-${mockItem.comisionValor.toLocaleString('es-AR')}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Ganancia Estimada</Text>
            <Text style={styles.totalValue}>${(mockItem.precioBase - mockItem.comisionValor).toLocaleString('es-AR')}</Text>
          </View>

          <Text style={styles.noteText}>
            Si no estás de acuerdo con estos valores, puedes rechazar la propuesta y el artículo te será devuelto con cargo de envío.
          </Text>
        </View>

        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.btnAceptar} onPress={handleAceptar}>
            <Text style={styles.btnAceptarText}>Aceptar Precio y Comisión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnRechazar} onPress={handleRechazar}>
            <Text style={styles.btnRechazarText}>Rechazar y Solicitar Devolución</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}