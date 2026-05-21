import React from 'react';
import { Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { feedbackScreenStyles as styles } from '../styles/components/FeedbackScreen';

export default function FeedbackScreen({ text, onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fondo_dorado.jpg')}
      style={styles.container}
    >
      <TouchableOpacity style={styles.touchable} onPress={handlePress}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}