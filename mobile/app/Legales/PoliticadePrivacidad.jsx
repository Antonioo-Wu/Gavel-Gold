import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';
import { legajesStyles as styles } from '../../styles/Legales';

export default function PoliticaPrivacidad() {
  const navigation = useNavigation();

  const policies = [
    {
      title: 'Datos Recopilados:',
      content: 'Recopilamos información personal identificable (nombre, documento de identidad, domicilio legal) e información financiera proporcionada para validar su capacidad de puja (cuentas bancarias, tarjetas o cheques).'
    },
    {
      title: 'Uso de la Información:',
      content: 'Sus datos son utilizados para realizar una investigación externa obligatoria y aprobar su registro. La información financiera se usa exclusivamente para validar los fondos para participar en subastas y procesar cobros en caso de resultar ganador.'
    },
    {
      title: 'Compartición de Datos:',
      content: 'Gavel & Gold puede compartir su información con entidades de verificación externas únicamente para validar su identidad. En caso de duda sobre el origen lícito de un bien o incumplimiento de pago, la Empresa notificará a las autoridades competentes.'
    },
    {
      title: 'Seguridad de los Datos:',
      content: 'Toda la información intercambiada en la plataforma, incluyendo las pujas en tiempo real, se procesa mediante sistemas seguros integrados con nuestra infraestructura local.'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Política de Privacidad</Text>
        
        <Text style={styles.introText}>
          En Gavel & Gold, la privacidad y seguridad de sus datos son nuestra prioridad. Esta política describe cómo recopilamos, utilizamos y protegemos su información:
        </Text>

        <View style={styles.listContainer}>
          {policies.map((policy, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.itemNumber}>{index + 1}. </Text>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{policy.title}</Text>
                <Text style={styles.itemText}>{policy.content}</Text>
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