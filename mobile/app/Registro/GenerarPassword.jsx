import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import { API_URL } from '../../config/api';

import { registroStyles as styles } from '../../styles/registro/Registro';


export default function GenerarPassword() {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleActivarCuenta = async () => {
    if (!token || !password || !confirmPassword) {
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
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("¡Éxito!", "Cuenta activada correctamente. Ahora inicia sesión para añadir tus medios de pago.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Error de activación", data.mensaje || "Token inválido o expirado.");
      }
    } catch (error) {
      Alert.alert("Error no se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Creación de Cuenta</Text>
        <FormCard>
          <Text style={styles.subtitle}>Generar contraseña personal</Text>
          <CustomInput label="Token de Activación" placeholder="Pegue el token recibido" value={token} onChangeText={setToken} />
          <CustomInput label="Contraseña" secureTextEntry placeholder="Ingrese la contraseña" value={password} onChangeText={setPassword} />
          <CustomInput label="Confirmar contraseña" secureTextEntry placeholder="Confirme la contraseña" value={confirmPassword} onChangeText={setConfirmPassword} />

          <View style={styles.list}>
            <Text style={styles.listItem}>• Mínimo 8 caracteres</Text>
            <Text style={styles.listItem}>• Incluir mayúsculas, minúsculas, números y un carácter especial</Text>
            <Text style={styles.listItem}>• No usar contraseñas anteriores</Text>
          </View>

          <ActionButton text={isLoading ? "Activando..." : "Confirmar"} variant="solid" onPress={handleActivarCuenta} />
        </FormCard>
      </View>
    </ImageBackground>
  );
}