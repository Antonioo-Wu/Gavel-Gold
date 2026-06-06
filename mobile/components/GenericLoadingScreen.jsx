import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, LoadingTheme } from '../styles/components/LoadingStyles';

const APP_LOGO = require('../assets/logos/logotipo.png');

export default function GenericLoadingScreen({ loadingText }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={APP_LOGO} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.loadingText}>{loadingText}</Text>

        <View style={styles.spinnerContainer}>
          <ActivityIndicator
            size={LoadingTheme.spinnerSize}
            color={LoadingTheme.spinnerColor}
          />
        </View>
      </View>

      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>Por favor, no cierres la aplicación</Text>
      </View>

    </SafeAreaView>
  );
}