import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

import { registroStyles as styles } from '../../styles/registro/Registro';

export default function GenerarPassword() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Creación de Cuenta</Text>
        <FormCard>
          <Text style={styles.subtitle}>Generar contraseña personal</Text>
          <CustomInput label="Contraseña" secureTextEntry placeholder="Ingrese la contraseña" />
          <CustomInput label="Confirmar contraseña" secureTextEntry placeholder="Confirme la contraseña" />

          <View style={styles.list}>
            <Text style={styles.listItem}>• Mínimo 8 caracteres</Text>
            <Text style={styles.listItem}>• Incluir mayúsculas, minúsculas, números y un carácter especial</Text>
            <Text style={styles.listItem}>• No usar contraseñas anteriores</Text>
          </View>

          <ActionButton text="Confirmar" variant="solid" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
        </FormCard>
      </View>
    </ImageBackground>
  );
}