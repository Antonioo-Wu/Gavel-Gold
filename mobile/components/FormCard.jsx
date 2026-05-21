import React from 'react';
import { View } from 'react-native';
import { formCardStyles as styles } from '../styles/components/FormCard';

export default function FormCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}