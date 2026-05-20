import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';

export default function TerminosCompra() {
  const navigation = useNavigation();

  const terms = [
    {
      title: 'Oferta Vinculante:',
      content: 'Esta puja constituye una oferta de compra firme e irrevocable. Si su puja es la última y más alta al cierre de la subasta, usted se convierte en el nuevo dueño de la pieza.'
    },
    {
      title: 'Monto de la Puja:',
      content: 'Confirma que el monto de su puja cumple con los límites establecidos (mínimo del 1% y máximo del 20% sobre el valor base respecto a la oferta anterior), a menos que sea una subasta de categoría Oro o Platino.'
    },
    {
      title: 'Medios de Pago:',
      content: 'Declara poseer al menos un medio de pago verificado por la Empresa y con fondos suficientes (o garantía equivalente) para cubrir el monto total de la puja más comisiones e impuestos.'
    },
    {
      title: 'Penalización por Incumplimiento:',
      content: 'Acepta que, si su oferta gana y no posee los fondos para cumplir con el pago, recibirá una multa del 10% del valor ofertado, debiendo abonar dicha multa y los fondos necesarios antes de 72 horas para poder volver a participar.'
    },
    {
      title: 'Derivación Judicial:',
      content: 'Entiende que el incumplimiento continuado de pago resultará en la derivación del caso a la justicia y la suspensión total de los servicios de la aplicación.'
    },
    {
      title: 'Validación del Sistema:',
      content: 'Acepta que su puja solo es válida una vez recibida la confirmación de éxito por parte del sistema, respetando el orden de registro en tiempo real.'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Confirmación de{"\n"}Puja y Términos de{"\n"}Compra</Text>
        
        <Text style={styles.introText}>
          Al registrar un medio de pago y/o participar activamente en cualquier subasta de <Text style={styles.bold}>Gavel & Gold</Text>, declara y acepta irrevocablemente lo siguiente:
        </Text>

        <View style={styles.listContainer}>
          {terms.map((term, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.termNumber}>{index + 1}. </Text>
              <View style={styles.termContent}>
                <Text style={styles.termTitle}>{term.title}</Text>
                <Text style={styles.termText}>{term.content}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton 
          text="Acepto y Continúo" 
          variant="solid" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },
  scrollContent: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    lineHeight: 34,
  },
  introText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 24,
    lineHeight: 21,
  },
  bold: {
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  termNumber: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginRight: 8,
  },
  termContent: {
    flex: 1,
  },
  termTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  termText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 21,
  },
  footer: {
    padding: 24,
    backgroundColor: '#F8FAF8',
  },
});