import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

import { registroStyles as styles } from '../../styles/Registro';

export default function SeleccionMetodoPago() {
  const navigation = useNavigation();

  return (
    <View style={styles.containerDark}>
      <Text style={styles.title}>Creación de Cuenta</Text>
      <FormCard>
        <Text style={styles.headerCentered}>Añadir un método de pago</Text>
        
        <View style={styles.paymentRow}>
          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCuenta')}>
            <Text>Cuenta bancaria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoTarjeta')}>
            <Text>Tarjeta</Text>
          </TouchableOpacity>
        </View>

        <ActionButton text="Finalizar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
      </FormCard>
    </View>
  );
}