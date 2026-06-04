import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

import { loginStyles as styles } from '../../styles/login/Login';

export default function Recupero() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecupero = () => {
    if (!email) {
      Alert.alert("Error", "El campo de email es obligatorio");
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Ingrese un email válido");
      return;
    }

    setIsLoading(true);

    // Simulación: generar un código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);


    // Navegar a pantalla de éxito
    navigation.navigate('RecuperoExito');

    setIsLoading(false);
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
