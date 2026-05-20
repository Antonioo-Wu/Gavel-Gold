import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType = 'default' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { color: '#555', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { width: '100%', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', fontSize: 14 }
});