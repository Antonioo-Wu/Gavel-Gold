import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';

import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';


export default function MetodoPagoTarjeta() {
  const navigation = useNavigation();
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvi, setCvi] = useState('');
  const [pais, setPais] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardarTarjeta = async () => {
    if (!numeroTarjeta || !mes || !anio || !cvi) {
      Alert.alert("Por favor completa los campos obligatorios de la tarjeta.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (!token || !userDataString) {
        Alert.alert("Error de sesión", "Por favor inicia sesión nuevamente.");
        navigation.navigate('Login');
        return;
      }

      const usuario = JSON.parse(userDataString);

      const detalleEstructurado = JSON.stringify({
        numero: numeroTarjeta, vencimiento: `${mes}/${anio}`, cvi: cvi, pais: pais
      });

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tipo: "TARJETA",
          detalle: detalleEstructurado
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Tarjeta guardada exitosamente.");
        navigation.navigate('RegistroExito');
      } else {
        Alert.alert("Error", data.mensaje || "Error al procesar la tarjeta.");
      }
    } catch (error) {
      Alert.alert("Error de red", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Método de Pago</Text>
        <Text style={styles.type}>Tarjeta de Crédito/Débito</Text>
        <FormCard>
          <Text style={styles.header}>Ingrese sus datos</Text>
          <CustomInput label="Número de tarjeta" placeholder="0000 0000 0000" keyboardType="numeric" value={numeroTarjeta} onChangeText={setNumeroTarjeta} />

        <View style={styles.inputRowTarjeta}>
          <View style={styles.inputItem}><CustomInput label="Vencimiento" placeholder="MM" keyboardType="numeric" value={mes} onChangeText={setMes} /></View>
          <View style={styles.inputItem}><CustomInput label=" " placeholder="YYYY" keyboardType="numeric" value={anio} onChangeText={setAnio} /></View>
        </View>

        <CustomInput label="Código de seguridad" placeholder="CVI" keyboardType="numeric" value={cvi} onChangeText={setCvi} />
        <CustomInput label="País" placeholder="Ingrese el país" value={pais} onChangeText={setPais} />

        <View style={styles.buttons}>
                  <ActionButton text="Volver" variant="outline" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
                  <ActionButton text={isLoading ? "Guardando..." : "Continuar"} variant="solid" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
        </View>
      </FormCard>
      </ScrollView>
    </View>
  );
}