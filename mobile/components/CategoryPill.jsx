import React from 'react';
import { View, Text } from 'react-native';
import { categoryPillStyles as styles } from '../styles/components/CategoryPill.js';

export default function CategoryPill({ category }) {
  const categoryKey = category || 'comun';

  const colors = {
    platino: { bg: '#40E0D0', text: '#090909' },
    oro: { bg: '#E0BF66', text: '#090909' },
    especial: { bg: '#FF6347', text: '#090909' },
    plata: { bg: '#C0C0C0', text: '#090909' },
    comun: { bg: '#555555', text: '#FFFFFF' }
  };

  const styleConfig = colors[categoryKey] || colors['comun'];

  const labelParaMostrar = categoryKey === 'comun'
    ? 'Común'
    : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

  return (
    <View style={[styles.pill, { backgroundColor: styleConfig.bg }]}>
      <Text style={[styles.text, { color: styleConfig.text }]}>{labelParaMostrar}</Text>
    </View>
  );
}