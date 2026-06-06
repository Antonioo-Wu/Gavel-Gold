import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormCard from '../../components/FormCard';

import { seleccionMetodoStyles as styles } from '../../styles/metodosDePago/SeleccionMetodoPago';

export default function SeleccionMetodoPago() {
  const navigation = useNavigation();
  const route = useRoute();

  const { origen } = route.params || {};

  const handleVolver = () => {
    if (origen === 'UsuarioMediosPago') {
      navigation.navigate('UsuarioMediosPago');
    } else {
      navigation.navigate('RegistroExito');
    }
  };

  return (
    <View style={styles.containerDark}>
      <View style={styles.containerCenter}>
        <Image source={require('../../assets/logos/logotipo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Seleccionar Método de Pago</Text>

      <FormCard>
        <Text style={styles.headerCentered}>Añadir un método de pago</Text>

        <View style={styles.paymentRow}>
          {/* Para mantener el origen en caso de que vayan a la tarjeta y vuelvan, lo pasamos por las dudas */}
          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCuentaBancaria', { origen })}>
            <Text style={styles.paymentBtnText}>Cuenta bancaria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoTarjeta', { origen })}>
            <Text style={styles.paymentBtnText}>Tarjeta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCheque', { origen })}>
            <Text style={styles.paymentBtnText}>Cheque</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.backButton} onPress={handleVolver}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </FormCard>
    </View>
  );
}