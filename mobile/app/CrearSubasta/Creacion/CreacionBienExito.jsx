import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeedbackScreen from '../../../components/FeedbackScreen';

export default function CreacionBienExito() {
  const navigation = useNavigation();

  return (
    <FeedbackScreen
      text="\n\n¡Has\ningresado\ntu bien a\nsubastar!"
      onPress={() => navigation.navigate('ListadeSubastas')}
    />
    
  );
}