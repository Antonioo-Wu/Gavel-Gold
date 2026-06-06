import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

import { loginStyles as styles } from '../../styles/login/Login';
import { API_URL } from '../../config/api';

export default function RecuperoToken() {
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!token || !password || !confirmPassword) {
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
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Contraseña actualizada.', [
          { text: 'Aceptar', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', data.mensaje || 'Token inválido o expirado.');
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
      {/* MAGIA ACÁ: Le damos flexGrow, lo centramos y permitimos toques con el teclado abierto */}
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { justifyContent: 'center', paddingVertical: 40 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Reemplazamos styles.containerCenter por estilos en línea sin el "flex: 1" */}
        <View style={{ alignItems: 'center', paddingHorizontal: 24, width: '100%' }}>
          
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
              placeholder="Ingrese el token recibido"
              value={token}
              onChangeText={setToken}
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

            <View style={{ marginBottom: 20 }}>
              <Text>• Mínimo 8 caracteres</Text>
              <Text>• Incluir mayúsculas y minúsculas</Text>
              <Text>• Incluir al menos un número</Text>
              <Text>• Incluir un carácter especial</Text>
            </View>

            <View style={styles.buttonsContainer}>
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