import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../styles/components/PopUp';

export default function GenericBidPopup({ 
  visible, 
  type, // 'error' o 'success'
  title, 
  subtitle, 
  description, 
  dynamicText, 
  buttonText, 
  onClose 
}) {
  
  // Asignamos el ícono dependiendo del tipo de pop-up
  const icon = type === 'error' ? '⚠️' : '✅'; 

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          
          {/* Encabezado con Icono y Título */}
          <View style={styles.headerRow}>
            <Text style={styles.iconText}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Subtítulo (Ej: Error de Puja debido al Monto...) */}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

          {/* Descripción (Ej: Tu oferta debe superar...) */}
          {description && <Text style={styles.description}>{description}</Text>}

          {/* Texto dinámico (Ej: Mínimo actual requerido: $101.000) */}
          {dynamicText && <Text style={styles.dynamicText}>{dynamicText}</Text>}

          {/* Botón de cierre (Solo se renderiza si le pasamos texto para el botón) */}
          {buttonText && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          )}

        </View>
      </View>
    </Modal>
  );
}