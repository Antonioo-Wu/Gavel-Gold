import React from 'react';
import { View, Text, Alert } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistroInicial = async () => {
    if (!nombre || !apellido || !email || !domicilio || !pais) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/usuarios/registro-inicial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, apellido, email, pais, domicilio,
          documentoFrente: "url_frente_dni.jpg",
          documentoDorso: "url_dorso_dni.jpg"
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('MensajeEspera');
      } else {
        Alert.alert("Error de registro", data.mensaje || "Ocurrio un error");
      }
    } catch (error) {
      Alert.alert("Error de red. No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.containerDark}>
      <FormCard>
        <Text style={styles.headerDark}>Ingrese sus datos</Text>
        <Text style={styles.subtext}>Todos los campos son obligatorios.</Text>

        <CustomInput label="Nombre" placeholder="Ingrese su nombre" value={nombre} onChangeText={setNombre} />
        <CustomInput label="Apellido" placeholder="Ingrese su apellido" value={apellido} onChangeText={setApellido} />
        {/* NOTA: Para archivos necesitas instalar: npx expo install expo-document-picker */}
        <ActionButton text="Subir DNI Frente" variant="outline" onPress={() => { }} />
        <ActionButton text="Subir DNI Dorso" variant="outline" onPress={() => { }} />

        <CustomInput label="Domicilio" placeholder="Ingrese su domicilio" value={domicilio} onChangeText={setDomicilio} />
        <CustomInput label="País" placeholder="Ingrese su país" value={pais} onChangeText={setPais} />
        <CustomInput label="Mail" placeholder="Ingrese su mail" value={email} onChangeText={setEmail} />

        <ActionButton text={isLoading ? "Enviando..." : "Continuar"} variant="solid" onPress={handleRegistroInicial} />
      </FormCard>
    </View>
  );
}