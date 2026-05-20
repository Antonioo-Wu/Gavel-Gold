import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import ActionButton from '../../components/ActionButton';

export default function SeleccionMetodoPago() {
  const navigation = useNavigation();

  const btnStyle = { backgroundColor: '#F5F5F5', padding: 16, borderRadius: 8, flex: 1, alignItems: 'center' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creación de Cuenta</Text>
      <FormCard>
        <Text style={styles.header}>Añadir un método de pago</Text>
        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          <TouchableOpacity style={btnStyle} onPress={() => navigation.navigate('MetodoPagoCuenta')}><Text>Cuenta bancaria</Text></TouchableOpacity>
          <TouchableOpacity style={btnStyle} onPress={() => navigation.navigate('MetodoPagoTarjeta')}><Text>Tarjeta</Text></TouchableOpacity>
        </View>
        <ActionButton text="Finalizar" variant="solid" onPress={() => navigation.navigate('RegistroExito')} />
      </FormCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B16', padding: 24, justifyContent: 'center' },
  title: { color: 'white', textAlign: 'center', marginBottom: 24, fontSize: 24 },
  header: { textAlign: 'center', marginBottom: 24 }
});