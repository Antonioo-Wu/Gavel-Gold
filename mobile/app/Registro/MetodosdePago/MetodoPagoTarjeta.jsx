import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/api';
import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';

// Importamos el Modal
import SuccessModal from '../../../components/SuccessModal';

export default function MetodoPagoTarjeta() {
  const navigation = useNavigation();
  const route = useRoute();
  const { origen } = route.params || {};
  
  // Estados actualizados (sacamos país, agregamos titular y dni)
  const [titular, setTitular] = useState('');
  const [dni, setDni] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvi, setCvi] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGuardarTarjeta = async () => {
    // Validación actualizada
    if (!titular || !dni || !numeroTarjeta || !mes || !anio || !cvi) {
      Alert.alert("Atención", "Por favor completa todos los campos obligatorios de la tarjeta.");
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

      // --- 1. VERIFICAR DUPLICADOS ---
      const checkResponse = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (checkResponse.ok) {
        const metodosExistentes = await checkResponse.json();
        const esDuplicado = metodosExistentes.some(m => {
          if (m.tipo !== 'TARJETA') return false;
          const det = typeof m.detalle === 'string' ? JSON.parse(m.detalle) : m.detalle;
          return det.numero === numeroTarjeta; // Comparamos el número de la tarjeta
        });

        if (esDuplicado) {
          Alert.alert("Atención", "Esta tarjeta ya se encuentra registrada en tu cuenta.");
          setIsLoading(false);
          return;
        }
      }
      // -------------------------------

      // Detalle estructurado actualizado con titular y dni
      const detalleEstructurado = JSON.stringify({
        titular: titular, 
        dni: dni,
        numero: numeroTarjeta, 
        vencimiento: `${mes}/${anio}`, 
        cvi: cvi 
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

      if (response.ok) {
        setShowModal(true);
      } else {
        const data = await response.json();
        Alert.alert("Error", data.mensaje || "Error al procesar la tarjeta.");
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
        <Text style={styles.type}>Tarjeta de Crédito/Débito</Text>
        <FormCard>
          <Text style={styles.header}>Ingrese sus datos</Text>
          <Text style={styles.subtext}>Todos los campos son obligatorios.</Text>
          {/* Nuevos campos agregados al principio */}
          <CustomInput label="Nombre del titular" placeholder="Como aparece en la tarjeta" value={titular} onChangeText={setTitular} />
    
          <CustomInput label="DNI del titular" placeholder="Documento de identidad" keyboardType="numeric" value={dni} onChangeText={setDni} />
          
          <CustomInput label="Número de tarjeta" placeholder="0000 0000 0000" keyboardType="numeric" value={numeroTarjeta} onChangeText={setNumeroTarjeta} />

          <View style={styles.inputRowTarjeta}>
            <View style={styles.inputItem}><CustomInput label="Vencimiento" placeholder="MM" keyboardType="numeric" value={mes} onChangeText={setMes} /></View>
            <View style={styles.inputItem}><CustomInput label=" " placeholder="YYYY" keyboardType="numeric" value={anio} onChangeText={setAnio} /></View>
          </View>

          <CustomInput label="Código de seguridad" placeholder="CVI" keyboardType="numeric" value={cvi} onChangeText={setCvi} />

          <View style={styles.buttons}>
            <ActionButton text="Volver" variant="outline" onPress={() => navigation.goBack()} />
            <ActionButton text={isLoading ? "Guardando..." : "Continuar"} variant="solid" onPress={handleGuardarTarjeta} />
          </View>
        </FormCard>
      </ScrollView>

      {/* Modal de Éxito */}
      <SuccessModal 
        visible={showModal} 
        title="¡Tarjeta Registrada!" 
        message="Su tarjeta ha sido guardada exitosamente y está lista para ser validada."
        onContinue={handleContinuarExito} 
      />
    </View>
  );
}