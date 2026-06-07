import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';
import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';
import { Picker } from '@react-native-picker/picker';
// Importamos el nuevo Modal
import SuccessModal from '../../../components/SuccessModal';

export default function MetodoPagoCuentaBancaria() {
  const navigation = useNavigation();
  const route = useRoute();
  const { origen } = route.params || {};
  const [titular, setTitular] = useState('');
  const [documento, setDocumento] = useState('');
  const [pais, setPais] = useState('');
  const [banco, setBanco] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estado para controlar el modal
  const [showModal, setShowModal] = useState(false);

  const handleGuardarCuenta = async () => {
    if (!titular || !banco || !cuenta) {
      Alert.alert("Error", "Por favor completa los campos obligatorios.");
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

      // --- 1. VERIFICAR DUPLICADOS ---
      const checkResponse = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (checkResponse.ok) {
        const metodosExistentes = await checkResponse.json();
        const esDuplicado = metodosExistentes.some(m => {
          if (m.tipo !== 'CUENTA_BANCARIA') return false;
          const det = typeof m.detalle === 'string' ? JSON.parse(m.detalle) : m.detalle;
          return det.numeroCuenta === cuenta; // Comparamos el número de cuenta
        });

        if (esDuplicado) {
          Alert.alert("Atención", "Este número de cuenta ya se encuentra registrado.");
          setIsLoading(false);
          return;
        }
      }
      // -------------------------------

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
          detalle: detalleEstructurado
        })
      });

      if (response.ok) {
        // En lugar del Alert nativo, mostramos nuestro pop-up
        setShowModal(true);
      } else {
        const data = await response.json();
        Alert.alert("Error", data.mensaje || "No se pudo guardar el medio de pago.");
      }
    } catch (error) {
      Alert.alert("Error de red", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinuarExito = () => {
    setShowModal(false);
    if (origen === 'UsuarioMediosPago') {
      navigation.navigate('UsuarioMediosPago');
    } else {
      navigation.navigate('RegistroExito');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Método de Pago</Text>
        <Text style={styles.type}>Cuenta Bancaria Vinculada</Text>
        <FormCard>
          <Text style={styles.header}>Ingrese sus datos</Text>
          <CustomInput label="Titular de la cuenta" placeholder="Nombre y apellido" value={titular} onChangeText={setTitular} />
          <CustomInput label="Número de documento" keyboardType="numeric" placeholder="DNI/CUIT" value={documento} onChangeText={setDocumento} />
          <Text style={styles.label}>País</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={pais} onValueChange={setPais}>
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

          <CustomInput label="Banco" placeholder="Ingrese el banco" value={banco} onChangeText={setBanco} />
          <CustomInput label="Número de cuenta" keyboardType="numeric" placeholder="Número de cuenta" value={cuenta} onChangeText={setCuenta} />

          <View style={styles.buttons}>
            <ActionButton text="Volver" variant="outline" onPress={() => navigation.goBack()} />
            <ActionButton text={isLoading ? "Guardando..." : "Continuar"} variant="solid" onPress={handleGuardarCuenta} />
          </View>
        </FormCard>
      </ScrollView>

      {/* Modal de Éxito */}
      <SuccessModal 
        visible={showModal} 
        title="¡Cuenta Vinculada!" 
        message="Su cuenta bancaria ha sido asociada exitosamente y está lista para operar."
        onContinue={handleContinuarExito} 
      />
    </View>
  );
}