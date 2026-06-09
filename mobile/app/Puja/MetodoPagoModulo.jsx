import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { modalStyles as styles } from '../../styles/puja/PaymentModalStyles'; 

export default function MetodoPagoModulo({ 
  visible, 
  onClose, 
  onSelectPayment, 
  currentSelectedId,
  methodsData // Esta prop vendrá del backend en el futuro
}) {
  // Estado local para manejar la selección antes de confirmar
  const [tempSelected, setTempSelected] = useState(currentSelectedId);

  // Sincronizar el estado temporal cada vez que se abre el modal
  useEffect(() => {
    if (visible) {
      setTempSelected(currentSelectedId);
    }
  }, [visible, currentSelectedId]);

  const handleConfirm = () => {
    // Buscamos el objeto completo del método seleccionado
    const selectedMethod = methodsData.find(m => m.id === tempSelected);
    if (selectedMethod) {
      onSelectPayment(selectedMethod);
    }
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          {/* Header del Modal */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Métodos de pago</Text>
          </View>

          {/* Lista de Opciones */}
          {methodsData.map((method) => (
            <TouchableOpacity 
              key={method.id} 
              style={styles.paymentOption}
              onPress={() => setTempSelected(method.id)}
            >
              <View style={styles.paymentOptionLeft}>
                <Text style={styles.paymentOptionIcon}>{method.icon}</Text>
                <Text style={styles.paymentOptionText}>{method.name}</Text>
              </View>
              {tempSelected === method.id && (
                <Text style={styles.checkIcon}>✔</Text>
              )}
            </TouchableOpacity>
          ))}

          {/* Botón Confirmar */}
          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}