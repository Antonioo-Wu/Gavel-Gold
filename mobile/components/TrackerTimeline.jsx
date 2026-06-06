import React from 'react';
import { View, Text } from 'react-native';
import { timelineStyles as styles } from '../styles/components/TimelineStyles';

export default function TrackerTimeline({ estadoActual, motivoRechazo }) {
  const pasos = [
    { key: 'solicitud', label: 'Solicitud Recibida' },
    { key: 'inspeccion', label: 'Inspección' },
    { key: 'propuesta', label: 'Propuesta Comercial' },
    { key: 'deposito', label: 'En Depósito' },
    { key: 'listo', label: 'Listo para Subasta' }
  ];

  const esRechazado = estadoActual === 'rechazado';
  const indiceActual = pasos.findIndex(p => p.key === estadoActual);

  return (
    <View style={styles.timelineContainer}>
      {pasos.map((paso, index) => {
        let circuloEstilo = styles.circuloPendiente;
        let textoEstilo = styles.textoPendiente;
        let icono = '⚫';

        if (esRechazado && index === 1) {
          circuloEstilo = styles.circuloError;
          textoEstilo = styles.textoError;
          icono = '❌';
        } else if (index < indiceActual || estadoActual === 'listo') {
          circuloEstilo = styles.circuloCompletado;
          textoEstilo = styles.textoCompletado;
          icono = '✅';
        } else if (index === indiceActual && !esRechazado) {
          circuloEstilo = styles.circuloActual;
          textoEstilo = styles.textoActual;
          icono = '⏳';
        }

        return (
          <View key={paso.key} style={styles.pasoWrapper}>
            {index < pasos.length - 1 && (
              <View 
                style={[
                  styles.lineaVertical, 
                  index < indiceActual || estadoActual === 'listo' ? styles.lineaCompletada : styles.lineaPendiente
                ]} 
              />
            )}
            
            <View style={[styles.circuloBase, circuloEstilo]}>
              <Text style={styles.iconoText}>{icono}</Text>
            </View>

            <View style={styles.infoPaso}>
              <Text style={[styles.labelBase, textoEstilo]}>{paso.label}</Text>
              
              {index === indiceActual && paso.key === 'inspeccion' && !esRechazado && (
                <Text style={styles.subtexto}>Nuestros expertos están verificando la pieza físicamente.</Text>
              )}
              {index === 1 && esRechazado && (
                <View style={styles.boxRechazo}>
                  <Text style={styles.textoMotivoRechazo}>Motivo: {motivoRechazo || "No cumple estándares de autenticidad."}</Text>
                </View>
              )}
              {index === indiceActual && paso.key === 'propuesta' && (
                <Text style={styles.subtexto}>Propuesta económica lista. Requiere tu confirmación abajo.</Text>
              )}
              {index === indiceActual && paso.key === 'deposito' && (
                <Text style={styles.subtexto}>Artículo resguardado en nuestras instalaciones seguras.</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}