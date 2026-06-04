import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { styles } from '../../styles/puja/Puja';
import PaymentModal from './MetodoPagoModulo';
import BottomNav from '../../components/BottomNav';
import { AntDesign } from '@expo/vector-icons';
export default function PujaScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  // Estados de la vista
  const [modalVisible, setModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  
  // Lista de métodos de pago (futuro fetch al backend)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Visa ****1234', icon: <AntDesign name="creditcard" size={20} /> },
    { id: 2, name: 'BBVA ****3456', icon: <AntDesign name="bank" size={20} /> },
    { id: 3, name: 'Mastercard ****1531', icon: <AntDesign name="creditcard" size={20} /> },
    { id: 4, name: 'Galicia ****5611', icon: <AntDesign name="bank" size={20} /> },
  ]);

  // Estado para el método seleccionado por defecto
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* TARJETA PRINCIPAL DE PUJA */}
      <View style={styles.card}>
        
        {/* Header (Logo y Títulos) */}
        <View style={styles.headerContainer}>
          <Image 
            source={require('../../assets/images/logo-gavel-gold.png')} 
            style={styles.logo} 
          />
          <View style={styles.headerTextContainer}>
            <View style={styles.tagOro}>
              <Text style={styles.tagText}>Oro</Text>
            </View>
            <Text style={styles.itemId}>1002</Text>
            <Text style={styles.itemName}>Cámara digital</Text>
          </View>
        </View>

        {/* Imagen del Ítem con flechas de navegación */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../assets/images/camara-mock.png')} 
            style={styles.itemImage} 
          />
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Estado y Botón de Detalles */}
        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Estado: Activa</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Ver detalles</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Oferta e Input */}
        <Text style={styles.offerText}>Oferta Actual: $100.000</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ingrese el monto de su puja"
            placeholderTextColor="#A49A8A"
            keyboardType="numeric"
            value={bidAmount}
            onChangeText={setBidAmount}
          />
        </View>

        {/* Textos informativos de límites */}
        <Text style={styles.limitsText}>
          Tu puja válida debe ser entre:{'\n'}
          Mínimo:  $101.000 (1%){'\n'}
          Máximo: $120.000 (20% sobre base)
        </Text>

        {/* BOTÓN DISPARADOR DEL POP-UP DE PAGO */}
        <Text style={styles.paymentLabel}>Método de Pago</Text>
        <TouchableOpacity 
          style={styles.paymentSelector} 
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.paymentSelectorContent}>
            <Text style={styles.paymentIcon}>{selectedPayment.icon}</Text>
            <Text style={styles.paymentText}>{selectedPayment.name}</Text>
          </View>
          <Text style={styles.paymentIcon}>›</Text>
        </TouchableOpacity>

        {/* Botón Final */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Realizar Puja</Text>
        </TouchableOpacity>

      </View>

      {/* NAVBAR INFERIOR */}
      <BottomNav />

      {/* COMPONENTE MODAL DE PAGOS SEPARADO */}
      <PaymentModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectPayment={setSelectedPayment}
        currentSelectedId={selectedPayment.id}
        methodsData={paymentMethods}
      />

    </SafeAreaView>
  );
}