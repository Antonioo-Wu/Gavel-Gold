import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import { useNotification } from './NotificationProvider';

export const SubastaWatcher = () => {
    const { setWinInfo } = useNotification();

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const userDataString = await AsyncStorage.getItem('userData');
                if (!token || !userDataString) return;

                const usuario = JSON.parse(userDataString);

                const res = await fetch(`${API_URL}/usuarios/${usuario.id}/historial-participacion`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const historial = await res.json();

                    const storedNotified = await AsyncStorage.getItem('@notified_auctions');
                    const notifiedSet = new Set(JSON.parse(storedNotified || '[]'));

                    const subastaRecienGanada = historial.find(
                        (participacion) => participacion.ganador === true && !notifiedSet.has(participacion.articuloId)
                    );

                    if (subastaRecienGanada) {
                        notifiedSet.add(subastaRecienGanada.articuloId);
                        await AsyncStorage.setItem('@notified_auctions', JSON.stringify([...notifiedSet]));
                        setWinInfo(subastaRecienGanada);
                    }
                }
            } catch (err) {
                console.error("Error en el Watcher de subastas:", err);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return null;
};