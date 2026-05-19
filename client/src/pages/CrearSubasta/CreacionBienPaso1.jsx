import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormCard from '../../components/FormCard';
import CustomInput from '../../components/CustomInput';
import ActionButton from '../../components/ActionButton';
import BottomNav from '../../components/BottomNav';
import { CreacionBienPasosStyles } from '../../styles/CreacionBienPasos';

export default function CreacionBienPaso1() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FormCard>
        <Text style={styles.title}>
          Ingrese los{'\n'}datos del bien a{'\n'}subastar
        </Text>

        <CustomInput label="Nombre del bien" placeholder="Ej: Reloj de bolsillo antiguo" />
        
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>✓ Etiqueta</Text>
        </View>

        <Text style={styles.label}>Ingrese su monto de valor base</Text>
        
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput 
            style={styles.amountInput}
            placeholder="50.000" 
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.selectContainer}>
          <TouchableOpacity style={styles.selectMock}>
            <Text style={styles.selectText}>Tipo moneda (Tocar para cambiar)</Text>
          </TouchableOpacity>
        </View>

        <TextInput 
          style={styles.textArea}
          placeholder="Descripción del bien" 
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={4}
        />

        <ActionButton
          text="Continuar" 
          variant="solid" 
          onPress={() => navigation.navigate('CreacionBienPaso2')}
        />
      </FormCard>

      <BottomNav />
    </View>
  );
}