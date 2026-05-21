import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';
import BottomNav from '../../components/BottomNav';

import { CreacionBienStyles as styles } from '../../styles/crearSubasta/CreacionBien.js';

export default function CreacionBienPaso2() {
  const navigation = useNavigation();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.title}>
            Ingrese los datos del bien a subastar
          </Text>

          <Text style={styles.subtitle}>
            Agrega mínimo 6 fotos de tu producto a subastar
          </Text>

          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>📷</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={agreeToTerms}
              onValueChange={setAgreeToTerms}
            />
            <Text style={styles.checkboxLabel}>
              Acepto los Términos y Condiciones
            </Text>
          </View>

          <TouchableOpacity
            style={styles.termsLink}
            onPress={() => navigation.navigate('TerminosEnvio')}
          >
            <Text style={styles.termsLinkText}>
              Ver Términos y Condiciones
            </Text>
          </TouchableOpacity>

          <ActionButton
            text="¡Subastar!"
            variant="solid"
            onPress={() => navigation.navigate('CreacionBienExito')}
          />
        </FormCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}