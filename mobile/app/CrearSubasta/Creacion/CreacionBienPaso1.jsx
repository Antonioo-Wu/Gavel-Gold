import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../../components/FormCard.jsx';
import CustomInput from '../../../components/CustomInput.jsx';
import ActionButton from '../../../components/ActionButton.jsx';
import BottomNav from '../../../components/BottomNav.jsx';

import { CreacionBienStyles as styles } from '../../../styles/crearSubasta/CreacionBien.js';

export default function CreacionBienPaso1() {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [baseAmount, setBaseAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');

  const handleContinuar = () => {
    if (!itemName || !baseAmount || !description) {
      Alert.alert("Atención", "Por favor completa todos los campos.");
      return;
    }

    const articuloData = {
      nombre: itemName,
      descripcion: description,
      precioBase: parseFloat(baseAmount),
      moneda: currency
    };

    navigation.navigate('CreacionBienPaso2', { articuloData });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.title}>Ingrese los datos del bien a subastar</Text>

          <CustomInput
            label="Nombre del bien" placeholder="Ej: Reloj de bolsillo antiguo" value={itemName} onChangeText={setItemName}
          />

          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>✓ Etiqueta</Text>
          </View>

          <Text style={styles.label}>Ingrese su monto de valor base</Text>

          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput} placeholder="50000" keyboardType="decimal-pad" value={baseAmount} onChangeText={setBaseAmount}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency} onValueChange={setCurrency} style={styles.picker}
            >
              <Picker.Item label="ARS" value="ARS" />
              <Picker.Item label="USD" value="USD" />
            </Picker>
          </View>

          <TextInput
            style={styles.textarea} placeholder="Descripción del bien" multiline numberOfLines={5} value={description} onChangeText={setDescription}
          />

          <ActionButton
            text="Continuar" variant="solid" onPress={handleContinuar}
          />
        </FormCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}