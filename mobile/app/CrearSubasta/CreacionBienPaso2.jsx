import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';
import BottomNav from '../../components/BottomNav';

export default function CreacionBienPaso2() {
  const navigation = useNavigation();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.title}>
            Ingrese los{"\n"} datos del bien a{"\n"} subastar
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1B16',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
    lineHeight: 30,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginBottom: 24,
  },
  uploadBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadIcon: {
    fontSize: 48,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  termsLink: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  termsLinkText: {
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  },
});