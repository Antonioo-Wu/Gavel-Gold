import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

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

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}><CustomInput label="Vencimiento" placeholder="DD" /></View>
          <View style={{ flex: 1 }}><CustomInput label=" " placeholder="MM" /></View>
          <View style={{ flex: 1 }}><CustomInput label=" " placeholder="YYYY" /></View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B16', padding: 24, justifyContent: 'center' },
  title: { color: 'white', textAlign: 'center', marginBottom: 24, fontSize: 24, fontWeight: 'bold' },
  header: { color: '#1A1A1A', fontWeight: 'bold', marginBottom: 8 },
  subtext: { fontSize: 11, color: '#777', marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 16, marginTop: 24 }
});