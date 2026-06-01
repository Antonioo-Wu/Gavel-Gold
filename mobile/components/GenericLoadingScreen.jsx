import React from 'react';
import { View, Text, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from '../styles/components/LoadingStyles';

// Ajustá esta ruta según dónde guarden el logo en la rama develop
const APP_LOGO = require('../assets/logos/logotipo.png'); 


export default function GenericLoadingScreen({ loadingText }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Logo Superior */}
      <View style={styles.logoContainer}>
        <Image source={APP_LOGO} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        {/* Texto Dinámico */}
        <Text style={styles.loadingText}>{loadingText}</Text>

        {/* Spinner Central */}
        <View style={styles.spinnerContainer}>
          {/* Usamos el spinner nativo en tamaño grande y color dorado */}
          <ActivityIndicator size={100} color="#E0BF66" />
        </View>
      </View>

      {/* Texto de Advertencia Inferior */}
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>Por favor, no cierres la aplicación</Text>
      </View>

    </SafeAreaView>
  );
}