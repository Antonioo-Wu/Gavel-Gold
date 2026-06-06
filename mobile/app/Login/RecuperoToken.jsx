import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Alert, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

import { loginStyles as styles } from '../../styles/login/Login';
import { API_URL } from '../../config/api';

export default function RecuperoToken() {
  const navigation = useNavigation();

  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!codigo || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/resetear-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña actualizada.', [
          { text: 'Aceptar', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', data.mensaje || 'Código inválido o expirado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de red', 'No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo_dorado.jpg')}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formWrapper}>

          <Image
            source={require('../../assets/logos/logotipo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Recuperar contraseña</Text>

          <FormCard>
            <Text style={styles.subtitle}>
              Ingrese el código recibido por mail y su nueva contraseña
            </Text>

            <CustomInput
              label="Código de recuperación"
              placeholder="Ingrese el código recibido"
              value={codigo}
              onChangeText={setCodigo}
            />

            <CustomInput
              label="Nueva contraseña"
              placeholder="Ingrese la nueva contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <CustomInput
              label="Confirmar contraseña"
              placeholder="Repita la contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementText}>• Mínimo 8 caracteres</Text>
              <Text style={styles.requirementText}>• Incluir mayúsculas y minúsculas</Text>
              <Text style={styles.requirementText}>• Incluir al menos un número</Text>
              <Text style={styles.requirementText}>• Incluir un carácter especial</Text>
            </View>

            <View style={styles.formButtonsContainer}>
              <ActionButton
                text="Cancelar"
                variant="outline"
                onPress={() => navigation.navigate('Login')}
              />
              <ActionButton
                text={isLoading ? 'Actualizando...' : 'Confirmar'}
                variant="solid"
                onPress={handleResetPassword}
              />
            </View>
          </FormCard>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}