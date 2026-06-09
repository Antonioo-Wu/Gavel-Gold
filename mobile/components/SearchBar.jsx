// mobile/components/SearchBar.jsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchBarStyles as styles } from '../styles/components/SearchBar';

export default function SearchBar({ value, onChangeText, onFilterPress, placeholder = "Buscar..." }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
      
      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#D4AF37" />
        </TouchableOpacity>
      )}
    </View>
  );
}