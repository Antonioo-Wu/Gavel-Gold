import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import React from 'react';

export const obtenerMediosPagoFormateados = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const userDataString = await AsyncStorage.getItem('userData');
  
  if (!token || !userDataString) return [];

  const usuario = JSON.parse(userDataString);
  const res = await fetch(`${API_URL}/usuarios/${usuario.id}/medios-pago`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (data.length === 0) return [];

  return data.map(m => {
    const detalle = typeof m.detalle === 'string' ? JSON.parse(m.detalle) : m.detalle;
    let name = m.tipo;
    let IconComponent = <FontAwesome name="credit-card" size={20} color="#D4AF37" />;

    if (m.tipo === 'TARJETA') name = `Tarjeta ****${detalle.numero ? detalle.numero.slice(-4) : 'XXXX'}`;
    if (m.tipo === 'CUENTA_BANCARIA') {
      name = `Cuenta ${detalle.banco}`;
      IconComponent = <FontAwesome name="bank" size={20} color="#D4AF37" />;
    }
    if (m.tipo === 'CHEQUE') {
      name = `Cheque ${detalle.banco}`;
      IconComponent = <AntDesign name="filetext1" size={20} color="#D4AF37" />;
    }
    
    return { id: m._id || m.id, name, icon: IconComponent };
  });
};