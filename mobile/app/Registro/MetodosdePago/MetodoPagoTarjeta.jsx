import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

import { metodosDePagoStyles as styles } from '../../../styles/metodosDePago/MetodosDePago';

export default function MetodoPagoTarjeta() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago - Tarjeta</Text>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <CustomInput label="Número de tarjeta" placeholder="0000 0000 0000" keyboardType="numeric" />

        <View style={styles.inputRowTarjeta}>
          <View style={styles.inputItem}><CustomInput label="Vencimiento" placeholder="MM" keyboardType="numeric" /></View>
          <View style={styles.inputItem}><CustomInput label=" " placeholder="YYYY" keyboardType="numeric" /></View>
        </View>

        <CustomInput label="Código de seguridad" placeholder="CVI" keyboardType="numeric" />
        <CustomInput label="País" placeholder="Ingrese el país" />

        <View style={styles.buttons}>
          <ActionButton text="Volver" variant="outline" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
          <ActionButton text="Continuar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
        </View>
      </FormCard>
    </View>
  );
}