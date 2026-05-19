import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';
import BottomNav from '../../components/BottomNav';
import { CreacionBienPasosStyles } from '../../styles/CreacionBienPasos';

export default function CreacionBienPaso2() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FormCard>
        <Text style={styles.title}>
          Ingrese los{'\n'}datos del bien a{'\n'}subastar
        </Text>
        
        <Text style={styles.subtitle}>
          Agrega mínimo 6 fotos de tu producto a subastar
        </Text>

        <TouchableOpacity style={styles.imageUploadBox}>
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkboxMock} />
          <Text style={styles.checkboxLabel}>
            Acepto los Términos y Condiciones
          </Text>
        </View>
        
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TerminosEnvio')}>
            <Text style={styles.linkText}>Ver Términos y Condiciones</Text>
          </TouchableOpacity>
        </View>

        <ActionButton 
          text="Subastar!" 
          variant="solid" 
          onPress={() => navigation.navigate('CreacionBienExito')} 
        />
      </FormCard>

      <BottomNav />
    </View>
  );
}