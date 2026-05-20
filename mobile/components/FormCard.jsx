import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FormCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', padding: 32, borderRadius: 16, width: '100%', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }
});