import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

export default function RegistroUsuario() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FormCard>
        <Text style={styles.header}>Ingrese sus datos</Text>
        <Text style={styles.subtext}>Todos los campos son obligatorios.</Text>
        
        <CustomInput label="Nombre" placeholder="Ingrese su nombre" />
        <CustomInput label="Apellido" placeholder="Ingrese su apellido" />
        {/* NOTA: Para archivos necesitas instalar: npx expo install expo-document-picker */}
        <ActionButton text="Subir DNI Frente" variant="outline" onPress={() => {}} />
        <ActionButton text="Subir DNI Dorso" variant="outline" onPress={() => {}} />
        
        <CustomInput label="Domicilio" placeholder="Ingrese su domicilio" />
        <CustomInput label="País" placeholder="Ingrese su país" />
        <CustomInput label="Mail" placeholder="Ingrese su mail" />
        
        <ActionButton text="Continuar" variant="solid" onPress={() => navigation.navigate('MensajeEspera')} />
      </FormCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B16', padding: 24, justifyContent: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subtext: { fontSize: 12, color: '#555', marginBottom: 24 }
});