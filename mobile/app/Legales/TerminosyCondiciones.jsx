import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';

export default function TerminosYCondiciones() {
  const navigation = useNavigation();

  const terms = [
    {
      title: 'Registro y Categorías de Usuarios:',
      content: 'La participación en las subastas requiere un registro obligatorio que consta de dos etapas: la carga de datos personales (incluyendo imágenes del documento de identidad y domicilio), y una verificación de antecedentes. Tras la verificación, se le asignará una categoría (Común, Especial, Plata, Oro o Platino).'
    },
    {
      title: 'Condiciones para Postores:',
      content: 'Para pujar, el usuario debe tener al menos un medio de pago verificado. Las subastas utilizan modalidad dinámica ascendente. Toda puja debe superar la oferta actual por al menos un 1% del valor base y el máximo no puede superar la oferta actual más el 20% del valor base (excepto categorías Oro y Platino). Los usuarios no pueden estar conectados en más de una subasta a la vez.'
    },
    {
      title: 'Penalizaciones por Incumplimiento:',
      content: 'Si un usuario gana una subasta y no posee los fondos para cumplir con el pago, se le aplicará una multa automática equivalente al 10% del valor ofertado. Tendrá 72 horas para regularizar la multa y el pago, de lo contrario derivará en acciones judiciales y suspensión de la cuenta.'
    },
    {
      title: 'Condiciones para Vendedores:',
      content: 'Todo usuario que postule un artículo debe declarar bajo juramento que el bien le pertenece exclusivamente y acreditar su origen lícito. La Empresa inspeccionará el bien físicamente. Los artículos aceptados serán asegurados por la Empresa en función de su valor base. Si un artículo llega a la subasta y no recibe ninguna puja, la Empresa lo comprará por el valor base establecido.'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Términos y{"\n"} Condiciones de Uso</Text>
        
        <Text style={styles.introText}>
          El acceso y uso de la plataforma Gavel & Gold está sujeto a los siguientes términos y condiciones. Al utilizar nuestra aplicación, usted acepta cumplir con estas normativas:
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
          text="Volver" 
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