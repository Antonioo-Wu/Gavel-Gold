import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';
import { registroStyles as styles } from '../../styles/registro/Registro';

export default function GenerarPassword() {
  const navigation = useNavigation();

  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleActivarCuenta = async () => {
    if (!codigo || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/usuarios/activar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.usuario));

        Alert.alert("¡Éxito!", "Cuenta activada correctamente. A continuación, registre un medio de pago.", [
          {
            text: "Continuar",
            onPress: () => navigation.navigate('SeleccionMetodoPago')
          }
        ]);

      } else {
        Alert.alert("Error de activación", data.mensaje || "Código inválido o expirado.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Creación de Cuenta</Text>
        <FormCard>
          <Text style={styles.subtitle}>Generar contraseña personal</Text>

          <CustomInput
            label="Código de Activación"
            placeholder="Ingrese el código numérico"
            keyboardType="numeric"
            value={codigo}
            onChangeText={setCodigo}
          />

          <CustomInput label="Contraseña" secureTextEntry placeholder="Ingrese la contraseña" value={password} onChangeText={setPassword} />
          <CustomInput label="Confirmar contraseña" secureTextEntry placeholder="Confirme la contraseña" value={confirmPassword} onChangeText={setConfirmPassword} />

          <View style={styles.list}>
            <Text style={styles.listItem}>• Mínimo 8 caracteres</Text>
            <Text style={styles.listItem}>• Incluir mayúsculas, minúsculas, números y un carácter especial</Text>
          </View>

          <ActionButton text={isLoading ? "Activando..." : "Confirmar"} variant="solid" onPress={handleActivarCuenta} />
        </FormCard>
      </View>
    </ImageBackground>
  );
}