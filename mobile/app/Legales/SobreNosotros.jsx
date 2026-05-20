import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';
import { legajesStyles } from '../../styles/Legales';

export default function SobreNosotros() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.titleSobreNosotros}>Sobre Nosotros</Text>
        
        <Text style={styles.paragraph}>
          En <Text style={styles.bold}>Gavel & Gold</Text>, fusionamos el prestigio y la emoción de las casas de subastas tradicionales con la inmediatez de la tecnología digital. Nacimos con la visión de democratizar el acceso a piezas únicas, obras de arte, artículos de diseñador y coleccionables, permitiendo a postores de todo el mundo participar en tiempo real en nuestras subastas físicas presenciales.
        </Text>

        <Text style={styles.paragraph}>
          Nuestro sistema garantiza un entorno seguro, transparente y altamente competitivo. A través de un riguroso proceso de validación de usuarios y piezas, aseguramos que cada transacción cumpla con los más altos estándares de calidad y legalidad. Ya sea que busques adquirir tu próxima gran inversión o desees postular un bien preciado para que encuentre un nuevo hogar, Gavel & Gold te ofrece una plataforma integral, respaldo asegurado y asistencia continua en cada golpe de martillo.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton 
          text="Volver" 
          variant="solid" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
}