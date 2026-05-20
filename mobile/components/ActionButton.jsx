import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ActionButton({ text, onPress, variant = 'solid' }) {
  return (
    <TouchableOpacity 
      style={[styles.button, variant === 'outline' ? styles.outline : styles.solid]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, variant === 'outline' ? styles.textOutline : styles.textSolid]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 16, borderRadius: 50, alignItems: 'center', marginVertical: 8 },
  solid: { backgroundColor: '#1A1A1A' },
  outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#1A1A1A' },
  text: { fontSize: 16, fontWeight: 'bold' },
  textSolid: { color: '#FFFFFF' },
  textOutline: { color: '#1A1A1A' }
});