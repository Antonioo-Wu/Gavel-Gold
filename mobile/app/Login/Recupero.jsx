import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import { loginStyles as styles } from '../../styles/login/Login';
import { API_URL } from '../../config/api';

export default function Recupero() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecupero = async () => {
    if (!email) {
      Alert.alert("Error", "El campo de email es obligatorio");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Ingrese un email válido");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/recuperar-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        navigation.navigate('RecuperoExito');
      } else {
        const data = await response.json();
        Alert.alert("Error", data.mensaje || "No se pudo solicitar la recuperación.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de red", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.containerCenter}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.title}>Recupere su contraseña</Text>

        <FormCard>
          <CustomInput
            label="Email"
            placeholder="Ingrese su mail"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonsContainer}>
            <ActionButton text="Cancel" variant="outline" onPress={() => navigation.goBack()} />
            <ActionButton
              text={isLoading ? "Enviando..." : "Confirmar"}
              variant="solid"
              onPress={handleRecupero}
            />
          </View>
        </FormCard>
      </View>
    </ImageBackground>
  );
}