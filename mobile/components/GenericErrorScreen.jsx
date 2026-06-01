import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { errorStyles as styles } from '../styles/components/ErrorStyles';

// Importá el logo oficial de Gavel & Gold
// Ajustá la ruta según la estructura de carpetas de la rama develop
const APP_LOGO = require('../assets/logos/logotipo.png'); 


export default function GenericErrorScreen({ title, errorIcon, description }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Logo superior */}
      <View style={styles.logoContainer}>
        <Image source={APP_LOGO} style={styles.logo} />
      </View>

      {/* Contenedor central (Título, Icono, Descripción) */}
      <View style={styles.contentContainer}>
        
        {/* Título principal del error */}
        <Text style={styles.title}>{title}</Text>

        {/* Icono dinámico (Wifi, Dino o Alerta) */}
        {errorIcon && (
          <Image source={errorIcon} style={styles.iconPlaceholder} />
        )}

        {/* Texto secundario opcional (como el de "Verificá tus medios de pago") */}
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
        
      </View>
    </SafeAreaView>
  );
}