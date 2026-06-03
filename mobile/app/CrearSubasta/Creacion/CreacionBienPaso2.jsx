import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../../components/FormCard.jsx';
import ActionButton from '../../../components/ActionButton.jsx';
import BottomNav from '../../../components/BottomNav.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { API_URL } from '../../../config/api.js';

import { CreacionBienStyles as styles } from '../../../styles/crearSubasta/CreacionBien.js';

export default function CreacionBienPaso2() {
  const navigation = useNavigation();
  const route = useRoute();

  const { articuloData } = route.params || {};

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubastar = async () => {
    if (!agreeToTerms) {
      Alert.alert("Atención", "Debe aceptar los Términos y Condiciones (Declaración de Propiedad) para publicar un bien.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');

      if (!token || !userDataString) {
        Alert.alert("Error", "Debes iniciar sesión para publicar artículos.");
        navigation.navigate('Login');
        return;
      }

      const usuario = JSON.parse(userDataString);

      const payload = {
        nombre: articuloData.nombre,
        descripcion: articuloData.descripcion,
        // Como no se implementó la cámara aún, mandamos un array de strings (mock) para cumplir con la validación de Mongoose
        fotos: ["https://foto-mockeada-1.jpg", "https://foto-mockeada-2.jpg"],
        declaracionPropiedad: agreeToTerms
      };

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/articulos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('CreacionBienExito');
      } else {
        Alert.alert("Error", data.mensaje || "No se pudo proponer el artículo.");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error de red", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.title}>Ingrese los datos del bien a subastar</Text>

          <Text style={styles.subtitle}>Agrega mínimo 6 fotos de tu producto a subastar</Text>

          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>📷</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkboxItem} value={agreeToTerms} onValueChange={setAgreeToTerms} color={agreeToTerms ? '#D4AF37' : undefined}
            />
            <Text style={styles.checkboxLabel}>Declaro que soy el propietario del bien a subastar.</Text>
            <Text style={styles.checkboxLabel}>Declaro el origen lícito del bien.</Text>
            <Text style={styles.checkboxLabel}>Acepto la devolución con cargo en caso de rechazo.</Text>
          </View>

          <TouchableOpacity style={styles.termsLink} onPress={() => navigation.navigate('TerminosEnvio')}>
            <Text style={styles.termsLinkText}>Ver Términos y Condiciones</Text>
          </TouchableOpacity>

          {isLoading ? (
             <ActivityIndicator size="large" color="#D4AF37" style={styles.loadingIndicator} />
          ) : (
             <ActionButton
               text="¡Subastar!" variant="solid" onPress={handleSubastar}
             />
          )}
        </FormCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}