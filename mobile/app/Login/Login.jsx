import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <FormCard>
          <CustomInput label="Email" placeholder="Valor" value={email} onChangeText={setEmail} />
          <CustomInput label="Password" placeholder="Valor" value={password} onChangeText={setPassword} secureTextEntry />
          
          <ActionButton text="Ingresar" variant="solid" onPress={() => navigation.navigate('ListadeSubastas')} />

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Recupero')}>
              <Text style={styles.link}>¿Olvidó su contraseña? Recuperar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.link}>¿No eres miembro? Cree su cuenta</Text>
            </TouchableOpacity>
          </View>
        </FormCard>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  container: { padding: 24, alignItems: 'center' },
  logo: { width: 96, height: 96, marginBottom: 16, resizeMode: 'contain' },
  title: { color: 'white', fontSize: 24, marginBottom: 32, fontWeight: 'bold' },
  footer: { marginTop: 24, alignItems: 'center' },
  link: { fontWeight: 'bold', color: '#555', marginBottom: 15 }
});