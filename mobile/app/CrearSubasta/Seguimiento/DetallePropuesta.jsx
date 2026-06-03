import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../styles/misSubastas/DetallePropuestaStyles';
import BottomNav from '../../../components/BottomNav';

export default function DetallePropuesta() {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock de los datos de la propuesta que vendrían del backend
  const propuestaData = {
    idCorto: '03',
    nombre: 'Sony Walkman',
    imagenUrl: require('../../../assets/images/walkman.png'), // Ajustar ruta
    precioBase: 200000,
    comisionMonto: 20000,
    comisionPorcentaje: 10,
  };

  // Función para formatear a pesos argentinos
  const formatCurrency = (amount) => {
    return '$' + amount.toLocaleString('es-AR');
  };

  // Manejo de la aceptación
  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      // Acá iría el PATCH/PUT al backend: await fetch(`${API_URL}/articulos/${id}/aceptar-propuesta`, ...)
      Alert.alert("¡Éxito!", "Propuesta aceptada. El artículo pasará a depósito.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la solicitud.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Manejo del rechazo
  const handleReject = async () => {
    setIsProcessing(true);
    try {
      // Acá iría la llamada al backend para rechazar y cobrar envío
      Alert.alert("Rechazado", "Has rechazado la propuesta. Se iniciará el proceso de devolución.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la solicitud.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../../assets/logos/logotipo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Mis Subastas</Text>
        </View>

        {/* Tarjeta Blanca */}
        <View style={styles.card}>
          
          {/* Tag de Estado */}
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Pendiente de Aprobación del Usuario</Text>
          </View>

          {/* Info del Item */}
          <View style={styles.itemInfoContainer}>
            <Text style={styles.itemId}>{propuestaData.idCorto}</Text>
            <Text style={styles.itemName}>{propuestaData.nombre}</Text>
          </View>

          {/* Carrusel de Imágenes */}
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.arrowButton}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <Image source={propuestaData.imagenUrl} style={styles.itemImage} />
            <TouchableOpacity style={styles.arrowButton}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>

          {/* --- CAJA DE PROPUESTA (El núcleo de este paso) --- */}
          <View style={styles.proposalBox}>
            <Text style={styles.proposalTitle}>Propuesta de Gavel&Gold</Text>
            
            <View style={styles.proposalRow}>
              <Text style={styles.proposalLabel}>Precio Base:</Text>
              <Text style={styles.proposalValue}>{formatCurrency(propuestaData.precioBase)}</Text>
            </View>
            
            <View style={styles.proposalRow}>
              <Text style={styles.proposalLabel}>Comisión:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.proposalValue}>{formatCurrency(propuestaData.comisionMonto)}</Text>
                <Text style={styles.proposalPercentage}>({propuestaData.comisionPorcentaje}%)</Text>
              </View>
            </View>
          </View>

          {/* --- BOTONES DE ACCIÓN --- */}
          <TouchableOpacity 
            style={[styles.actionButton, styles.btnAccept]} 
            onPress={handleAccept}
            disabled={isProcessing}
          >
            <Text style={styles.iconText}>✓</Text>
            <Text style={styles.actionButtonText}>Aceptar Precio y Comisión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.btnReject]} 
            onPress={handleReject}
            disabled={isProcessing}
          >
            <Text style={styles.iconText}>✕</Text>
            <Text style={styles.actionButtonText}>Rechazar y Solicitar Devolución</Text>
          </TouchableOpacity>

          {/* Botón Volver */}
          <TouchableOpacity 
            style={[styles.actionButton, styles.btnBack]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>Volver</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}


/**
 * ¿Cómo se conectan todos los pasos en la App?
Para cumplir con todos los estados, la lógica de navegación de los chicos de Front debería funcionar así:

El usuario entra al Detalle del Artículo (que dibuja el TrackerTimeline que esta en componentes).

Si el backend manda que el estado es "Propuesta", el front dibuja un botón negro que dice "Ver Propuesta".

Al tocar ese botón, se abre esta pantalla (DetallePropuestaScreen.jsx).

Si el usuario toca "Aceptar", la API actualiza la base de datos, el estado cambia a "En Depósito", y la próxima vez que el usuario abra el tracker, la línea de tiempo va a tener el "checklist" verde en Propuesta y el componente va a mutar a la vista que incluye los datos de la Póliza (tu última imagen).

Si el usuario toca "Rechazar", se actualiza la API, el estado pasa a "Rechazado", y la vista se cambia por la pantalla de la gran cruz roja con el motivo del rechazo.
 * 
 */