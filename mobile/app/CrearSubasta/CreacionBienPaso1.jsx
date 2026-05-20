import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import BottomNav from '../../components/BottomNav';

export default function CreacionBienPaso1() {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [baseAmount, setBaseAmount] = useState('');
  const [currency, setCurrency] = useState('ARS');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.title}>
            Ingrese los{"\n"} datos del bien a{"\n"} subastar
          </Text>

          <CustomInput 
            label="Nombre del bien" 
            placeholder="Ej: Reloj de bolsillo antiguo"
            value={itemName}
            onChangeText={setItemName}
          />
          
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>✓ Etiqueta</Text>
          </View>

          <Text style={styles.label}>Ingrese su monto de valor base</Text>
          
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="50.000"
              keyboardType="decimal-pad"
              value={baseAmount}
              onChangeText={setBaseAmount}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency}
              onValueChange={setCurrency}
              style={styles.picker}
            >
              <Picker.Item label="ARS" value="ARS" />
              <Picker.Item label="USD" value="USD" />
            </Picker>
          </View>

          <TextInput
            style={styles.textarea}
            placeholder="Descripción del bien"
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />

          <ActionButton 
            text="Continuar" 
            variant="solid" 
            onPress={() => navigation.navigate('CreacionBienPaso2')} 
          />
        </FormCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1B16',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A1A1A',
    lineHeight: 30,
  },
  tagContainer: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: 'white',
    fontSize: 12,
  },
  label: {
    color: '#555',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  pickerContainer: {
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  textarea: {
    width: '100%',
    height: 120,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 24,
    textAlignVertical: 'top',
  },
});