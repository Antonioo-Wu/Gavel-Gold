import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});