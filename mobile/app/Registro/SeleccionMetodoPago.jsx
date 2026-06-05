import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importar useRoute
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

import { seleccionMetodoStyles as styles } from '../../styles/metodosDePago/SeleccionMetodoPago';

export default function SeleccionMetodoPago() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Recibimos el origen ('Registro' o 'Perfil')
  const { origen } = route.params || {};

  const handleVolver = () => {
    if (origen === 'UsuarioMediosPago') {
      // Si vino desde el perfil, lo direccionamos explícitamente allí
      navigation.navigate('Perfil'); 
    } else {
      // Si vino desde el registro, limpia el stack hacia atrás (vuelve a GenerarPassword)
      navigation.goBack();
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
          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCuentaBancaria')}>
            <Text style={styles.paymentBtnText}>Cuenta bancaria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoTarjeta')}>
            <Text style={styles.paymentBtnText}>Tarjeta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentBtn} onPress={() => navigation.navigate('MetodoPagoCheque')}>
            <Text style={styles.paymentBtnText}>Cheque</Text>
          </TouchableOpacity>
        </View>

        <ActionButton text="Finalizar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
      </FormCard>

      {/* Botón de Atrás corregido */}
      <TouchableOpacity style={styles.backButton} onPress={handleVolver}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

    </View>
  );
}