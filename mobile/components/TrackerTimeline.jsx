import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/components/TimelineStyles';

export default function TrackerTimeline({ steps }) {
  
  // Función auxiliar para renderizar el círculo/icono según el estado
  const renderIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <View style={[styles.iconContainer, { backgroundColor: '#27AE60' }]}>
            <Text style={{ color: '#FFF', fontSize: 12 }}>✓</Text>
          </View>
        );
      case 'current':
        return (
          <View style={[styles.iconContainer, { backgroundColor: '#E0BF66' }]}>
            <Text style={{ fontSize: 12 }}>⏳</Text> 
          </View>
        );
      case 'error':
        return (
          <View style={[styles.iconContainer, { backgroundColor: '#EB5757' }]}>
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>✕</Text>
          </View>
        );
      case 'pending':
      default:
        return (
          <View style={[styles.iconContainer, { backgroundColor: '#090909', borderWidth: 2, borderColor: '#333' }]} />
        );
    }
  };

  return (
    <View style={styles.timelineContainer}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        // La línea se pinta de verde si el estado actual está completado
        const isLineActive = step.status === 'completed';

        return (
          <View key={index} style={styles.stepWrapper}>
            
            {/* Columna Izquierda: Icono y Línea conectora */}
            <View style={styles.iconColumn}>
              {renderIcon(step.status)}
              
              {/* No dibujamos línea después del último elemento */}
              {!isLast && (
                <View 
                  style={[
                    styles.verticalLine, 
                    isLineActive && styles.verticalLineActive
                  ]} 
                />
              )}
            </View>

            {/* Columna Derecha: Textos */}
            <View style={styles.textColumn}>
              <Text 
                style={[
                  styles.title, 
                  step.status === 'pending' && styles.titlePending
                ]}
              >
                {step.title}
              </Text>
              
              {/* Renderizado condicional para fecha o subtítulo */}
              {step.date && <Text style={styles.subtitle}>{step.date}</Text>}
              {step.subtitle && <Text style={styles.subtitle}>{step.subtitle}</Text>}
              
              {/* Si hay un motivo de error, lo mostramos destacado */}
              {step.errorReason && (
                <Text style={styles.errorText}>{step.errorReason}</Text>
              )}
            </View>

          </View>
        );
      })}
    </View>
  );
}