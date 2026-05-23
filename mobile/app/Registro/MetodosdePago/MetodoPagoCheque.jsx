import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';

import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';

export default function MetodoPagoCheque() {
  const navigation = useNavigation();
  const [banco, setBanco] = useState('');
  const [numeroCheque, setNumeroCheque] = useState('');
  const [monto, setMonto] = useState('');
  const [moneda, setMoneda] = useState('');
  const [titular, setTitular] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardarCheque = async () => {
    if (!banco || !numeroCheque || !monto || !titular) {
      Alert.alert("Error", "Por favor complete los campos obligatorios.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (!token || !userDataString) {
        Alert.alert("Error", "Debes iniciar sesión.");
        navigation.navigate('Login');
        return;
      }

      const usuario = JSON.parse(userDataString);

      const detalleEstructurado = JSON.stringify({
        banco, numeroCheque, monto, moneda, vencimiento: `${dia}/${mes}/${anio}`, titular
      });

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          tipo: "CHEQUE",
          detalle: detalleEstructurado
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Cheque registrado correctamente.");
        navigation.navigate('RegistroExito');
      } else {
        Alert.alert("Error", data.mensaje || "Error al guardar el cheque.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago - Cheque</Text>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <Text style={styles.subtext}>Todos los campos son obligatorios.</Text>

        <CustomInput label="Banco emisor" placeholder="Ingrese el banco emisor" value={banco} onChangeText={setBanco} />
        <CustomInput label="Número de cheque" placeholder="Ingrese el número" keyboardType="numeric" value={numeroCheque} onChangeText={setNumeroCheque} />
        <CustomInput label="Monto" placeholder="Ingrese el monto" keyboardType="numeric" value={monto} onChangeText={setMonto} />
        <CustomInput label="Moneda" placeholder="ARS / USD" value={moneda} onChangeText={setMoneda} />

        <View style={styles.inputRowCheque}>
          <View style={styles.inputItem}><CustomInput label="Vencimiento" placeholder="DD" value={dia} onChangeText={setDia} /></View>
          <View style={styles.inputItem}><CustomInput label=" " placeholder="MM" value={mes} onChangeText={setMes} /></View>
          <View style={styles.inputItem}><CustomInput label=" " placeholder="YYYY" value={anio} onChangeText={setAnio} /></View>
        </View>

        <CustomInput label="Titular" placeholder="Ingrese el titular" value={titular} onChangeText={setTitular} />
        <ActionButton text="Subir Comprobante (PDF)" variant="outline" onPress={() => { }} />

        <View style={styles.buttons}>
          <ActionButton text="Volver" variant="outline" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
          <ActionButton text={isLoading ? "Guardando..." : "Continuar"} variant="solid" onPress={handleGuardarCheque} />
        </View>
      </FormCard>
    </View>
  );
}