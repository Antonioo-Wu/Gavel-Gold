import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { customInputStyles as styles } from '../styles/components/CustomInput';

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