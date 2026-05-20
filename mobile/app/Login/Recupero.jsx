import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';

export default function Recupero() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/fondo_dorado.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Recupere su contraseña</Text>
        <FormCard>
          <CustomInput label="Email" placeholder="Ingrese su mail" />
          <View style={styles.buttons}>
            <ActionButton text="Cancel" variant="outline" onPress={() => navigation.goBack()} />
            <ActionButton text="Confirmar" variant="solid" onPress={() => navigation.navigate('RecuperoExito')} />
          </View>
        </FormCard>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  container: { padding: 24 },
  title: { color: 'white', fontSize: 24, textAlign: 'center', marginBottom: 32, fontWeight: 'bold' },
  buttons: { flexDirection: 'row', gap: 16, marginTop: 24 }
});