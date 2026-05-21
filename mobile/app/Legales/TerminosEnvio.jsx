import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';
import { legajesStyles as styles } from '../../styles/legajes/Legales';

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
        <Text style={styles.title}>Declaración Jurada y Términos de Envío</Text>

        <Text style={styles.introText}>
          Al enviar esta solicitud, usted, el "Usuario Solicitante", declara y acepta lo siguiente:
        </Text>

        <View style={styles.listContainer}>
          {terms.map((term, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.itemNumber}>{index + 1}. </Text>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{term.title}</Text>
                <Text style={styles.itemText}>{term.content}</Text>
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