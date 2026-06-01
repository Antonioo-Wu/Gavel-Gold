import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Página principal
import Splash from './app/Splash/Splash';
import Login from './app/Login/Login';

// Subastas
import ListadeSubastas from './app/Subastas/ListadeSubastas';
import SubastaDetalles from './app/Subastas/SubastaDetalles';

// Recupero de contraseña
import Recupero from './app/Login/Recupero';
import RecuperoExito from './app/Login/RecuperoExito';



// Creación de Cuenta
import Registro from './app/Registro/RegistroUsuario';
import MensajeEspera from './app/Registro/MensajeEspera';
import ValidacionCategoria from './app/Registro/ValidacionCategoria';
import GenerarPassword from './app/Registro/GenerarPassword';
import RegistroExito from './app/Registro/RegistroExito';
import Perfil from './app/CuentaUsuario/Perfil';
import DatosUsuario from './app/CuentaUsuario/DatosUsuario';

// Método de Pago
import UsuarioMediosPago from './app/CuentaUsuario/UsuarioMediosPago';
import SeleccionMetodoPago from './app/Registro/SeleccionMetodoPago';
import MetodoPagoTarjeta from './app/Registro/MetodosdePago/MetodoPagoTarjeta';
import MetodoPagoCuentaBancaria from './app/Registro/MetodosdePago/MetodoPagoCuentaBancaria';
import MetodoPagoCheque from './app/Registro/MetodosdePago/MetodoPagoCheque';

// Legales
import TerminosCompra from './app/Legales/TerminosCompra';
import TerminosEnvio from './app/Legales/TerminosEnvio';
import TerminosyCondiciones from './app/Legales/TerminosyCondiciones';
import PoliticadePrivacidad from './app/Legales/PoliticadePrivacidad';
import SobreNosotros from './app/Legales/SobreNosotros';

// Crear Subasta
import CreacionBienPaso1 from './app/CrearSubasta/Creacion/CreacionBienPaso1';
import CreacionBienPaso2 from './app/CrearSubasta/Creacion/CreacionBienPaso2';
import CreacionBienExito from './app/CrearSubasta/Creacion/CreacionBienExito';

// Seguimiento de Subasta
import DetallePropuesta from './app/CrearSubasta/Seguimiento/DetallePropuesta';
import MisSubastas from './app/CrearSubasta/Seguimiento/MisSubastas';

// Puja
import MensajeExitoPuja from './app/Puja/MensajeExitoPuja';
import SeguimientoPuja from './app/Puja/SeguimientoPuja';

// Errores
import ErrorConexion from './app/Errores/ErrorConexion';
import ErrorSaldo from './app/Errores/ErrorSaldo';


// loadings
import LoadingCatalogo from './app/Loadings/LoadingCatalogo';
import LoadingPuja from './app/Loadings/LoadingPuja';
import LoadingSubirArticulo from './app/Loadings/LoadingSubirArticulo';
import LoadingCredenciales from './app/Loadings/LoadingCredenciales';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recupero" component={Recupero} />
        <Stack.Screen name="RecuperoExito" component={RecuperoExito} />
        
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="DatosUsuario" component={DatosUsuario} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="MensajeEspera" component={MensajeEspera} />
        <Stack.Screen name="ValidacionCategoria" component={ValidacionCategoria} />
        <Stack.Screen name="GenerarPassword" component={GenerarPassword} />
        <Stack.Screen name="RegistroExito" component={RegistroExito} />     

        <Stack.Screen name="UsuarioMediosPago" component={UsuarioMediosPago} />
        <Stack.Screen name="SeleccionMetodoPago" component={SeleccionMetodoPago} />
        <Stack.Screen name="MetodoPagoTarjeta" component={MetodoPagoTarjeta} />
        <Stack.Screen name="MetodoPagoCuentaBancaria" component={MetodoPagoCuentaBancaria} />
        <Stack.Screen name="MetodoPagoCheque" component={MetodoPagoCheque} />
        
        <Stack.Screen name="TerminosCompra" component={TerminosCompra} />
        <Stack.Screen name="TerminosEnvio" component={TerminosEnvio} />
        <Stack.Screen name="TerminosyCondiciones" component={TerminosyCondiciones} />
        <Stack.Screen name="PoliticadePrivacidad" component={PoliticadePrivacidad} />
        <Stack.Screen name="SobreNosotros" component={SobreNosotros} />

        <Stack.Screen name="CreacionBienPaso1" component={CreacionBienPaso1} />
        <Stack.Screen name="CreacionBienPaso2" component={CreacionBienPaso2} />
        <Stack.Screen name="CreacionBienExito" component={CreacionBienExito} />
        <Stack.Screen name="DetallePropuesta" component={DetallePropuesta} />
        <Stack.Screen name="MisSubastas" component={MisSubastas} />

       
        <Stack.Screen name="MensajeExitoPuja" component={MensajeExitoPuja} />
        <Stack.Screen name="SeguimientoPuja" component={SeguimientoPuja} />

        <Stack.Screen name="ListadeSubastas" component={ListadeSubastas} />
        <Stack.Screen name="SubastaDetalles" component={SubastaDetalles} />

        <Stack.Screen name="ErrorConexion" component={ErrorConexion} />
        <Stack.Screen name="ErrorSaldo" component={ErrorSaldo} />

        <Stack.Screen name="LoadingCatalogo" component={LoadingCatalogo} />
        <Stack.Screen name="LoadingPuja" component={LoadingPuja} />
        <Stack.Screen name="LoadingSubirArticulo" component={LoadingSubirArticulo} />
        <Stack.Screen name="LoadingCredenciales" component={LoadingCredenciales} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}