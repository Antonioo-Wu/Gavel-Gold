import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';
import TrackerTimeline from '../../../components/TrackerTimeline';
import { detallePropuestaStyles as styles } from '../../../styles/misSubastas/DetallePropuestaStyles';

export default function DetallePropuesta({ route }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const articulo = route.params?.articulo;
  if (!articulo) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>Artículo no encontrado</Text>
      </View>
    );
  }

  const comisionValor = (articulo.precioBase * articulo.comision) / 100;
  const gananciaEstimada = articulo.precioBase - comisionValor;

  const handleAceptar = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');
      if (!token || !userDataString) {
        Alert.alert("Error", "Debes iniciar sesión");
        return;
      }
      const usuario = JSON.parse(userDataString);

      const response = await fetch(
        `${API_URL}/usuarios/${usuario.id}/articulos/${articulo._id}/aceptar`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.replace('DetalleDeposito', { articulo });
      } else {
        Alert.alert("Error", data.mensaje || "No se pudo aceptar la propuesta");
      }
    } catch (error) {
      Alert.alert("Error", "Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRechazar = () => {
    Alert.alert(
      "Rechazar Propuesta",
      "¿Estás seguro? Se procederá a la devolución del artículo con cargo de envío.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, Rechazar",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              const token = await AsyncStorage.getItem('userToken');
              const userDataString = await AsyncStorage.getItem('userData');
              if (!token || !userDataString) {
                Alert.alert("Error", "Debes iniciar sesión");
                return;
              }
              const usuario = JSON.parse(userDataString);

              const response = await fetch(
                `${API_URL}/usuarios/${usuario.id}/articulos/${articulo._id}/rechazar`,
                {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ motivo: "El usuario rechazó las condiciones económicas" }),
                }
              );

              const data = await response.json();

              if (response.ok) {
                Alert.alert("Propuesta Rechazada", "Se procederá a la devolución del artículo. Se aplicarán cargos de logística.");
                navigation.navigate('MisArticulos');
              } else {
                Alert.alert("Error", data.mensaje || "No se pudo rechazar la propuesta");
              }
            } catch (error) {
              Alert.alert("Error", "Error de conexión con el servidor");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Seguimiento de Artículo</Text>
        </View>

        <View style={styles.itemInfoContainer}>
          {articulo.fotos?.length > 0 ? (
            <Image source={{ uri: articulo.fotos[0] }} style={styles.itemImage} />
          ) : null}
          <View>
            <Text style={styles.itemName}>{articulo.nombre}</Text>
            <Text style={styles.itemId}>ID: #{String(articulo._id).slice(-6)}</Text>
          </View>
        </View>

        <TrackerTimeline estadoActual="propuesta" />

        <View style={styles.cardPropuesta}>
          <Text style={styles.cardTitle}>⚠️ Pendiente de Aprobación</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Precio Base Propuesto</Text>
            <Text style={styles.value}>
              ${articulo.precioBase.toLocaleString('es-AR')}
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Comisión Gavel & Gold ({articulo.comision}%)</Text>
            <Text style={styles.value}>
              -${comisionValor.toLocaleString('es-AR')}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Ganancia Estimada</Text>
            <Text style={styles.totalValue}>
              ${gananciaEstimada.toLocaleString('es-AR')}
            </Text>
          </View>

          <Text style={styles.noteText}>
            Si no estás de acuerdo con estos valores, puedes rechazar la propuesta y el artículo te será devuelto con cargo de envío.
          </Text>
        </View>

        <View style={styles.botonesContainer}>
          <TouchableOpacity
            style={[styles.btnAceptar, isLoading && { opacity: 0.6 }]}
            onPress={handleAceptar}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnAceptarText}>Aceptar Precio y Comisión</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnRechazar, isLoading && { opacity: 0.6 }]}
            onPress={handleRechazar}
            disabled={isLoading}
          >
            <Text style={styles.btnRechazarText}>Rechazar y Solicitar Devolución</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}