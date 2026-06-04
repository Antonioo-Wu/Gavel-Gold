import React, { useState } from 'react';
import { View, Text,Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import RecuperoÉxito from './RecuperoExito';

import { loginStyles as styles } from '../../styles/login/Login';

export default function Recupero() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecupero = async () => {
    if (!email) {
      Alert.alert("Error", "El campo de email es obligatorio");
      return;
    }
    setIsLoading(true);
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
            <ActionButton text="Confirmar" variant="solid" onPress={() => navigation.navigate('RecuperoExito')} />
          </View>
        </FormCard>
      </View>
    </ImageBackground>
  );
}
