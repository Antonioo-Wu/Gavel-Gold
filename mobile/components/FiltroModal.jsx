import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FiltroModal({ visible, onClose, categoria, setCategoria }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titulo}>Seleccionar Categoría</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            <Picker.Item label="Todas" value="Todos" />
            <Picker.Item label="Común" value="comun" />
            <Picker.Item label="Especial" value="especial" />
            <Picker.Item label="Plata" value="plata" />
            <Picker.Item label="Oro" value="oro" />
            <Picker.Item label="Platino" value="platino" />
          </Picker>
          <TouchableOpacity style={styles.btnAplicar} onPress={onClose}>
            <Text style={styles.textoBtn}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  btnAplicar: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  textoBtn: { color: '#fff', fontWeight: 'bold' }
});