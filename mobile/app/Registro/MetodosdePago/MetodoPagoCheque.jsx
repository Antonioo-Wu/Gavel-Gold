import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

import { metodosDePagoStyles as styles } from '../../../styles/MetodosDePago';

export default function MetodoPagoCheque() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago - Cheque</Text>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <Text style={styles.subtext}>Todos los campos son obligatorios.</Text>
        
        <CustomInput label="Banco emisor" placeholder="Ingrese el banco emisor" />
        <CustomInput label="Número de cheque" placeholder="Ingrese el número" keyboardType="numeric" />
        <CustomInput label="Monto" placeholder="Ingrese el monto" keyboardType="numeric" />
        <CustomInput label="Moneda" placeholder="ARS / USD" /> 

        <View style={styles.inputRowCheque}>
          <View style={styles.inputItem}><CustomInput label="Vencimiento" placeholder="DD" /></View>
          <View style={styles.inputItem}><CustomInput label=" " placeholder="MM" /></View>
          <View style={styles.inputItem}><CustomInput label=" " placeholder="YYYY" /></View>
        </View>

        <CustomInput label="Titular" placeholder="Ingrese el titular" />
        <ActionButton text="Subir Comprobante (PDF)" variant="outline" onPress={() => {}} />

        <View style={styles.buttons}>
          <ActionButton text="Volver" variant="outline" onPress={() => navigation.navigate('SeleccionMetodoPago')} />
          <ActionButton text="Continuar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
        </View>
      </FormCard>
    </View>
  );
}