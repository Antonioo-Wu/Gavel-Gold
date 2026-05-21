import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

import { loginStyles as styles } from '../../styles/Login';

export default function Recupero() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Recupere su contraseña</Text>
        <FormCard>
          <CustomInput label="Email" placeholder="Ingrese su mail" />
          <View style={styles.buttonsContainer}>
            <ActionButton text="Cancel" variant="outline" onPress={() => navigation.goBack()} />
            <ActionButton text="Confirmar" variant="solid" onPress={() => navigation.navigate('RecuperoExito')} />
          </View>
        </FormCard>
      </View>
    </ImageBackground>
  );
}