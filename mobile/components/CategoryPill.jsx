import React from 'react';
import { View, Text } from 'react-native';
import { categoryPillStyles as styles } from '../styles/components/CategoryPill';

export default function CategoryPill({ category }) {
  const colors = {
    Platino: { bg: '#40E0D0', text: '#090909' },
    Oro: { bg: '#E0BF66', text: '#090909' },
    Especial: { bg: '#FF6347', text: '#090909' },
    Plata: { bg: '#C0C0C0', text: '#090909' },
    Común: { bg: '#555555', text: '#FFFFFF' }
  };

  const styleConfig = colors[category] || colors['Común'];

  return (
    <View style={[styles.pill, { backgroundColor: styleConfig.bg }]}>
      <Text style={[styles.text, { color: styleConfig.text }]}>{category}</Text>
    </View>
  );
}