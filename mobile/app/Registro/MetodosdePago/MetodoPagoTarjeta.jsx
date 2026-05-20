import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard';
import CustomInput from '../../../components/CustomInput';
import ActionButton from '../../../components/ActionButton';

export default function MetodoPagoTarjeta() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago - Tarjeta</Text>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <CustomInput label="Número de tarjeta" placeholder="0000 0000 0000" keyboardType="numeric" />
        
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <View style={{ flex: 1 }}><CustomInput label="Vencimiento" placeholder="MM" keyboardType="numeric" /></View>
          <View style={{ flex: 1 }}><CustomInput label=" " placeholder="YYYY" keyboardType="numeric" /></View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B16', padding: 24, justifyContent: 'center' },
  title: { color: 'white', textAlign: 'center', marginBottom: 24, fontSize: 24, fontWeight: 'bold' },
  header: { color: '#1A1A1A', fontWeight: 'bold', marginBottom: 8 },
  buttons: { flexDirection: 'row', gap: 16, marginTop: 24 }
});