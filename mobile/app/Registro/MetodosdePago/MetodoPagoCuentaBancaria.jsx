import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';

export default function MetodoPagoCuentaBancaria() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago - Cuenta</Text>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <CustomInput label="Titular de la cuenta" placeholder="Nombre y apellido" />
        <CustomInput label="Número de documento" placeholder="DNI/CUIT" />
        <CustomInput label="País de origen" placeholder="País" />
        <CustomInput label="Banco" placeholder="Ingrese el banco" />
        <CustomInput label="Número de cuenta" placeholder="Número de cuenta" />

        <View style={styles.buttons}>
          <ActionButton text="Volver" variant="outline" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
          <ActionButton text="Continuar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
        </View>
      </FormCard>
    </View>
  );
}