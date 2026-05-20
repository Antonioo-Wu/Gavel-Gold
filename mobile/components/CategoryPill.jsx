import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CategoryPill({ category }) {
  const colors = {
    Platino: { bg: '#40E0D0', text: '#090909' },
    Oro: { bg: '#E0BF66', text: '#090909' },
    Especial: { bg: '#FF6347', text: '#090909' },
    Plata: { bg: '#C0C0C0', text: '#090909' },
    Común: { bg: '#555555', text: '#FFFFFF' }
  };

  const style = colors[category] || colors['Común'];

  return (
    <View style={[styles.pill, { backgroundColor: style.bg }]}>
      <Text style={[styles.text, { color: style.text }]}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 50, alignSelf: 'flex-start' },
  text: { fontWeight: 'bold', fontSize: 12 }
});