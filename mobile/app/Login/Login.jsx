import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

import { loginStyles as styles } from '../../styles/login/Login';


export default function Login() {
  const navigation = useNavigation();
  const route = useRoute();
  const { destinoRegistro } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu email y contraseña");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.usuario));

        if (destinoRegistro) {
          navigation.navigate(destinoRegistro);
        } else {
          navigation.navigate('ListadeSubastas');
        }
      } else {
        Alert.alert("Error de login", data.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      Alert.alert("Error de red, No se pudo conectar con el servidor");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerCenter}>
          <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
          <Text style={styles.title}>Inicio de Sesión</Text>

          <FormCard>
            <CustomInput label="Email" placeholder="ejemplo@correo.com" value={email} onChangeText={setEmail} />
            <CustomInput label="Password" placeholder="tu contraseña" value={password} onChangeText={setPassword} secureTextEntry />

            <ActionButton text={isLoading ? "Conectando..." : "Ingresar"} variant="solid" onPress={handleLogin} />

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('GenerarPassword')}>
                <Text style={styles.link}>¿Tiene un código? Active su cuenta</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Recupero')}>
                <Text style={styles.link}>¿Olvidó su contraseña? Recuperar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.link}>¿No eres miembro? Cree su cuenta</Text>
              </TouchableOpacity>
            </View>
          </FormCard>
        </View>

      </ScrollView>
    </ImageBackground>
  );
}