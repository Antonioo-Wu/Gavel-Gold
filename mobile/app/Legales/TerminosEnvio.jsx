import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';

export default function TerminosEnvio() {
  const navigation = useNavigation();

  const terms = [
    {
      title: 'Declaración de Propiedad:',
      content: 'Declaro bajo juramento que el bien descrito me pertenece en propiedad exclusiva y que no posee ningún gravamen, impedimento legal, ni limitación que impida su libre subasta y transferencia de dominio.'
    },
    {
      title: 'Origen Lícito:',
      content: 'Me comprometo a acreditar el origen lícito del bien si la Empresa así lo requiere. Acepto que, en caso de duda sobre el origen, la Empresa notificará a las autoridades competentes.'
    },
    {
      title: 'Inspección y Envío:',
      content: 'Si la Empresa manifiesta interés, acepto enviar el bien a la dirección indicada para su inspección física.'
    },
    {
      title: 'Cargos por Devolución:',
      content: 'Acepto explícitamente que, en caso de que el bien no sea aceptado tras la inspección, la Empresa lo devolverá a mi cargo.'
    },
    {
      title: 'Modalidad de Subasta:',
      content: 'Acepto que, si la cantidad de artículos es numerosa, la Empresa podrá, a su criterio, agruparlos en una subasta denominada "Colección" bajo mi nombre.'
    },
    {
      title: 'Aceptación Final:',
      content: 'Entiendo que la inspección física es determinante y que la aceptación o rechazo final del bien me será informada a través de esta aplicación.'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Declaración Jurada{"\n"} y Términos de Envío</Text>
        
        <Text style={styles.introText}>
          Al enviar esta solicitud, usted, el "Usuario Solicitante", declara y acepta lo siguiente:
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
          text="Aceptar y Continuar" 
          variant="solid" 
          onPress={() => navigation.navigate('CreacionBienExito')} 
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