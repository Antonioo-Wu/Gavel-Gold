import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';

import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';


export default function MetodoPagoCuentaBancaria() {
  const navigation = useNavigation();
  const [titular, setTitular] = useState('');
  const [documento, setDocumento] = useState('');
  const [pais, setPais] = useState('');
  const [banco, setBanco] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardarCuenta = async () => {
    if (!titular || !banco || !cuenta) {
      Alert.alert("Por favor completa los campos obligatorios.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');

      if (!token || !userDataString) {
        Alert.alert("Error de sesión", "Debes estar logueado para añadir medios de pago.");
        navigation.navigate('Login');
        return;
      }

      const usuario = JSON.parse(userDataString);

      const detalleEstructurado = JSON.stringify({
        titular, documento, pais, banco, numeroCuenta: cuenta
      });

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tipo: "CUENTA_BANCARIA",
          detalle: detalleEstructured
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Medio de pago asociado correctamente.");
        navigation.navigate('RegistroExito');
      } else {
        Alert.alert("Error", data.mensaje || "No se pudo guardar el medio de pago.");
      }
    } catch (error) {
      Alert.alert("Error de red", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago - Cuenta</Text>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <CustomInput label="Titular de la cuenta" placeholder="Nombre y apellido" value={titular} onChangeText={setTitular} />
        <CustomInput label="Número de documento" placeholder="DNI/CUIT" value={documento} onChangeText={setDocumento} />
        <CustomInput label="País de origen" placeholder="País" value={pais} onChangeText={setPais} />
        <CustomInput label="Banco" placeholder="Ingrese el banco" value={banco} onChangeText={setBanco} />
        <CustomInput label="Número de cuenta" placeholder="Número de cuenta" value={cuenta} onChangeText={setCuenta} />

        <View style={styles.buttons}>
          <ActionButton text="Volver" variant="outline" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
          <ActionButton text={isLoading ? "Guardando..." : "Continuar"} variant="solid" onPress={handleGuardarCuenta} />
        </View>
      </FormCard>
    </View>
  );
}