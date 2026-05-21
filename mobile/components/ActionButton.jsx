import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { auctionButtonStyles as styles } from '../styles/components/AuctionButton.js';

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