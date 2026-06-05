import React from 'react';
import { View, Text } from 'react-native';
import { categoryPillStyles as styles, CategoryPillTheme } from '../styles/components/CategoryPill.js';

export default function CategoryPill({ category }) {
  const categoryKey = category || 'comun';

  const styleConfig = CategoryPillTheme.colors[categoryKey] || CategoryPillTheme.colors['comun'];

  const labelParaMostrar = categoryKey === 'comun'
    ? 'Común'
    : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

  return (
    <View style={[styles.pill, { backgroundColor: styleConfig.bg }]}>
      <Text style={[styles.text, { color: styleConfig.text }]}>{labelParaMostrar}</Text>
    </View>
  );
}