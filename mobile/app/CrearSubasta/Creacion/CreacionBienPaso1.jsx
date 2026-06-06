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
  const [currency, setCurrency] = useState('ARS');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleContinuar = () => {
    if (!itemName || !baseAmount || !description) {
      Alert.alert('Atención', 'Por favor completa todos los campos.');
      return;
    }

    const articuloData = {
      nombre: itemName,
      descripcion: description,
      precioBase: parseFloat(baseAmount),
      moneda: currency,
      etiquetas: tags,
    };

    navigation.navigate('CreacionBienPaso2', { articuloData });
  };
    const agregarTag = () => {
    const nuevaTag = tagInput.trim();

    if (!nuevaTag) return;

    setTags([...tags, nuevaTag]);
    setTagInput('');
  };

  const eliminarTag = (tagAEliminar) => {
    setTags(tags.filter(tag => tag !== tagAEliminar));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <FormCard>
          <Text style={styles.title}>Ingrese los datos del bien a subastar</Text>

          <CustomInput
            label="Nombre del bien"
            placeholder="Ej: Reloj de bolsillo antiguo"
            value={itemName}
            onChangeText={setItemName}
          />

          <Text style={styles.sectionTitle}>Etiquetas</Text>

          <View style={styles.tagInputContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="Ej: Lujo"
              value={tagInput}
              onChangeText={setTagInput}
            />

            <TouchableOpacity
              style={styles.addTagButton}
              onPress={agregarTag}
            >
              <Text style={styles.addTagText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tagChip}
                onPress={() => eliminarTag(tag)}
              >
                <Text style={styles.tagChipText}>
                  {tag} ✕
                </Text>
              </TouchableOpacity>
            ))}
          </View>
              <Text style={styles.label}>Ingrese su monto de valor base</Text>

          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="50000"
              keyboardType="decimal-pad"
              value={baseAmount}
              onChangeText={setBaseAmount}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker selectedValue={currency} onValueChange={setCurrency} style={styles.picker}>
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

          <TouchableOpacity style={styles.createButton} onPress={handleContinuar}>
            <Text style={styles.createButtonText}>Continuar</Text>
          </TouchableOpacity>

          <View style={styles.volverButtonWrapper}>
            <ActionButton text="Volver atrás" variant="outline" onPress={() => navigation.goBack()} />
          </View>
        </FormCard>
      </ScrollView>

      <BottomNav />
    </View>
  );
}
