import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

import { registroStyles as styles } from '../../styles/registro/Registro';

export default function SeleccionMetodoPago() {
  const navigation = useNavigation();

  return (
    <View style={styles.containerDark}>
      <View style={styles.containerCenter}>
          <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
        </View>
      <Text style={styles.title}>Seleccionar Método de Pago</Text>
      <FormCard>
        <Text style={styles.headerCentered}>Añadir un método de pago</Text>

        <View style={styles.paymentRow}>
          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCuentaBancaria')}>
            <Text>Cuenta bancaria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoTarjeta')}>
            <Text>Tarjeta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCheque')}>
            <Text>Cheque</Text>
          </TouchableOpacity>
        </View>

        <ActionButton text="Finalizar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
      </FormCard>
    </View>
  );
}