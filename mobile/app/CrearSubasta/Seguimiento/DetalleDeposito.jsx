import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { detalleDepositoStyles as styles } from '../../../styles/misSubastas/DetalleDepositoStyles';

export default function DetalleDeposito({ route }) {
  const navigation = useNavigation();
  const [trackerState, setTrackerState] = useState('deposito');

  useEffect(() => {
    const t1 = setTimeout(() => setTrackerState('listo'), 3000);
    return () => clearTimeout(t1);
  }, []);

  const articulo = route.params?.articulo;
  const esListo = trackerState === 'listo';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Seguimiento de Artículo</Text>
        </View>

        <View style={styles.itemInfoContainer}>
          {articulo?.fotos?.length > 0 ? (
            <Image source={{ uri: articulo.fotos[0] }} style={styles.itemImage} />
          ) : null}
          <View>
            <Text style={styles.itemName}>{articulo?.nombre || 'Artículo'}</Text>
            <Text style={styles.itemId}>ID: #{articulo?._id ? String(articulo._id).slice(-6) : '---'}</Text>
          </View>
        </View>

        <TrackerTimeline estadoActual={trackerState} />

        <View style={styles.cardLogistica}>
          <Text style={styles.cardTitle}>{esListo ? '🎯 Listo para Subasta' : '✅ En Depósito'}</Text>
          
          <Text style={styles.sectionTitle}>Ubicación Física</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Sucursal:</Text>
            <Text style={styles.value}>Depósito Central (Av. Corrientes)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sector / Estante:</Text>
            <Text style={styles.value}>Sector B - Est. 42</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Póliza de Seguro</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Aseguradora:</Text>
            <Text style={styles.value}>La Caja Seguros S.A.</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>N° de Póliza:</Text>
            <Text style={styles.value}>8942-B</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Monto Cobertura:</Text>
            <Text style={styles.value}>${(articulo?.precioBase || 0).toLocaleString('es-AR')}</Text>
          </View>
        </View>

        {esListo && (
          <View style={styles.cardListo}>
            <Text style={styles.cardListoTitle}>El artículo está listo para ser asignado a una subasta</Text>
          </View>
        )}

        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('MisArticulos')}>
          <Text style={styles.btnSecondaryText}>Volver a Mis Articulos</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}