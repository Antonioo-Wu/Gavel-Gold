import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // NUEVA LIBRERÍA DE CÁMARA
import FormCard from '../../../components/FormCard.jsx';
import ActionButton from '../../../components/ActionButton.jsx';
import BottomNav from '../../../components/BottomNav.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { API_URL } from '../../../config/api.js';

import { CreacionBienStyles as styles, CreacionBienTheme } from '../../../styles/crearSubasta/CreacionBien2.js';

export default function CreacionBienPaso2() {
  const navigation = useNavigation();
  const route = useRoute();
  const { articuloData } = route.params || {};

  // Estados individuales para cada Checkbox
  const [checkPropiedad, setCheckPropiedad] = useState(false);
  const [checkOrigen, setCheckOrigen] = useState(false);
  const [checkDevolucion, setCheckDevolucion] = useState(false);
  
  const [fotos, setFotos] = useState([]); // Arreglo para guardar las fotos capturadas
  const [isLoading, setIsLoading] = useState(false);

  // --- LÓGICA DE LA CÁMARA ---
  const handleTomarFoto = async () => {
    // 1. Pedir permiso al usuario con un Pop-up
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para tomar las fotos.');
      return;
    }

    // 2. Abrir la cámara
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite recortar la foto
      aspect: [4, 3],
      quality: 0.8, // Comprime un poco para no saturar el server
    });

    // 3. Guardar la foto en el estado si el usuario no canceló
    if (!result.canceled) {
      setFotos(prevFotos => [...prevFotos, result.assets[0]]);
    }
  };

  const handleSubastar = async () => {
    // Validar Checkboxes
    if (!checkPropiedad || !checkOrigen || !checkDevolucion) {
      Alert.alert("Atención", "Debe aceptar todas las declaraciones y condiciones para publicar el bien.");
      return;
    }

    // Validar Fotos
    if (fotos.length < 6) {
      Alert.alert(
          "Fotos insuficientes",
          "Debes cargar al menos 6 fotos del artículo."
        );
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

      const formData = new FormData();
      formData.append('nombre', articuloData.nombre);

      const descripcionConPrecio = `${articuloData.descripcion}\n(Precio sugerido por usuario: ${articuloData.precioBase} ${articuloData.moneda})`;
      formData.append('descripcion', descripcionConPrecio);

      // Usamos el estado del primer checkbox como declaración general
      formData.append('declaracionPropiedad', String(checkPropiedad));

      // Adjuntar las fotos reales sacadas con la cámara
      fotos.forEach((foto, index) => {
        const localUri = foto.uri;
        const filename = localUri.split('/').pop() || `foto_${index}.jpg`;
        // Inferir el tipo MIME
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append('fotos', {
          uri: localUri,
          name: filename,
          type: type
        });
      });

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/articulos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // No seteamos Content-Type a mano porque Fetch lo hace solo con FormData
        },
        body: formData
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

          <Text style={styles.subtitle}>Agrega mínimo 6 fotos de tu producto a subastar ({fotos.length}/6)</Text>

          {/* GALERÍA DE FOTOS CAPTURADAS */}
          <View style={styles.photosGrid}>
            <TouchableOpacity
              style={styles.addPhotoBtn}
              onPress={handleTomarFoto}
            >
              <Text style={styles.uploadIcon}>🖼️</Text>
            </TouchableOpacity>

            {fotos.length > 0 && (
              <View style={styles.photosPreviewContainer}>
                {fotos.map((foto, index) => (
                  <Image
                    key={index}
                    source={{ uri: foto.uri }}
                    style={styles.photoThumbnail}
                  />
                ))}
              </View>
            )}
          </View>

          {/* CHECKBOXES SEPARADOS E INDEPENDIENTES */}
          <View style={styles.checkboxesWrapper}>
            
            <View style={styles.checkboxRow}>
              <Checkbox
                style={styles.checkboxItem}
                value={checkPropiedad}
                onValueChange={setCheckPropiedad}
                color={checkPropiedad ? CreacionBienTheme.colors.primary : undefined}
              />
              <Text style={styles.checkboxLabel}>Declaro que soy el propietario del bien a subastar.</Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                style={styles.checkboxItem}
                value={checkOrigen}
                onValueChange={setCheckOrigen}
                color={checkOrigen ? CreacionBienTheme.colors.primary : undefined}
              />
              <Text style={styles.checkboxLabel}>Declaro el origen lícito del bien.</Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                style={styles.checkboxItem}
                value={checkDevolucion}
                onValueChange={setCheckDevolucion}
                color={checkDevolucion ? CreacionBienTheme.colors.primary : undefined}
              />
              <Text style={styles.checkboxLabel}>Acepto la devolución con cargo en caso de rechazo.</Text>
            </View>

          </View>

          <TouchableOpacity style={styles.termsLink} onPress={() => navigation.navigate('TerminosEnvio')}>
            <Text style={styles.termsLinkText}>Ver Términos y Condiciones</Text>
          </TouchableOpacity>

          {isLoading ? (
            <ActivityIndicator
              size={CreacionBienTheme.indicatorSize}
              color={CreacionBienTheme.colors.primary}
              style={styles.loadingIndicator}
            />
          ) : (
            <ActionButton
              text="¡Ingrese Item a Subastar!" variant="solid" onPress={handleSubastar}
            />
          )}

          {/* Botón para volver por si se equivocaron */}
          <View style={styles.backButtonContainer}>
             <ActionButton text="Volver atrás" variant="outline" onPress={() => navigation.goBack()} />
          </View>

        </FormCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}