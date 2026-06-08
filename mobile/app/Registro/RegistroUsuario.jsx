import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, Image, Alert, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import { API_URL } from '../../config/api';
import { registroStyles as styles } from '../../styles/registro/Registro';

export default function RegistroUsuario() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [pais, setPais] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistroInicial = async () => {
    if (!nombre || !apellido || !email || !domicilio || !pais || !dni) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/usuarios/registro-inicial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          pais,
          domicilio,
          dni,
          documentoFrente: "url_frente_dni.jpg",
          documentoDorso: "url_dorso_dni.jpg"
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('ValidacionCategoria');
      } else {
        Alert.alert("Error de registro", data.mensaje || "Ocurrió un error");
      }
    } catch (error) {
      Alert.alert("Error", "Error de red. No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.containerDark}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerCenter}>
          <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        </View>

        <Text style={styles.title}>Cree su Cuenta</Text>

        <FormCard>
          <Text style={styles.headerDark}>Ingrese sus datos</Text>
          <Text style={styles.subtext}>Todos los campos son obligatorios.</Text>

          <CustomInput label="Nombre" placeholder="Ingrese su nombre" value={nombre} onChangeText={setNombre} />
          <CustomInput label="Apellido" placeholder="Ingrese su apellido" value={apellido} onChangeText={setApellido} />

          <CustomInput label="DNI" placeholder="Ingrese su DNI" keyboardType="numeric" value={dni} onChangeText={setDni} />

          <CustomInput label="Domicilio" placeholder="Ingrese su domicilio" value={domicilio} onChangeText={setDomicilio} />

          <Text style={styles.label}>País</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={pais} onValueChange={(itemValue) => setPais(itemValue)}>
              <Picker.Item label="Seleccione un país" value="" />
              <Picker.Item label="Argentina" value="Argentina" />
              <Picker.Item label="Brasil" value="Brasil" />
              <Picker.Item label="Chile" value="Chile" />
              <Picker.Item label="Uruguay" value="Uruguay" />
              <Picker.Item label="Paraguay" value="Paraguay" />
              <Picker.Item label="Bolivia" value="Bolivia" />
              <Picker.Item label="Perú" value="Perú" />
            </Picker>
          </View>

          <CustomInput label="Mail" placeholder="Ingrese su mail" value={email} onChangeText={setEmail} />

          <ActionButton text={isLoading ? "Enviando..." : "Continuar"} variant="solid" onPress={handleRegistroInicial} />
        </FormCard>
      </ScrollView>
    </SafeAreaView>
  );
}