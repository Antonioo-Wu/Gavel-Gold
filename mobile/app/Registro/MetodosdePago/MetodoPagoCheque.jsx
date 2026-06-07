import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';

import * as DocumentPicker from 'expo-document-picker';

import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';

export default function MetodoPagoCheque() {
  const navigation = useNavigation();
  const route = useRoute();
  const { origen } = route.params || {};
  const [banco, setBanco] = useState('');
  const [numeroCheque, setNumeroCheque] = useState('');
  const [monto, setMonto] = useState('');
  const [moneda, setMoneda] = useState('');
  const [titular, setTitular] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comprobante, setComprobante] = useState(null);

  const handleSubirComprobante = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setComprobante(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al intentar abrir los archivos.");
    }
  };

  const handleGuardarCheque = async () => {
    if (!banco || !numeroCheque || !monto || !titular || !comprobante) {
      Alert.alert("Error", "Por favor complete los campos obligatorios y suba su comprobante.");
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
        banco,
        numeroCheque,
        monto,
        moneda,
        vencimiento: `${dia}/${mes}/${anio}`,
        titular,
        comprobanteNombre: comprobante.name
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
        if (origen === 'UsuarioMediosPago') {
          navigation.navigate('UsuarioMediosPago');
        } else {
          navigation.navigate('RegistroExito');
        }
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
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Método de Pago</Text>
        <Text style={styles.type}>Cheque Certificado</Text>
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

          <ActionButton
            text={comprobante ? comprobante.name : "Subir Comprobante (PDF)"}
            variant="outline"
            onPress={handleSubirComprobante}
          />

          <View style={styles.buttons}>
            <ActionButton text="Volver" variant="outline" onPress={() => navigation.goBack()} />
            <ActionButton text={isLoading ? "Guardando..." : "Continuar"} variant="solid" onPress={handleGuardarCheque} />
          </View>
        </FormCard>
      </ScrollView>
    </View>
  );
}