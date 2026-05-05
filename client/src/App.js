import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Principio
import Splash from './pages/Login/Splash';
import Login from './pages/Login/Login'; 

// Recupero de contraseña
import Recupero from './pages/Login/Recupero';
import RecuperoExito from './pages/Login/RecuperoExito';
import Perfil from './pages/Perfil';

// Registro de usuario
import Registro from './pages/Registro/RegistroUsuario';

import ValidacionCategoria from './pages/Registro/ValidacionCategoria';
import GenerarPassword from './pages/Registro/GenerarPassword';
import RegistroExito from './pages/Registro/RegistroExito';

// Método de Pago
import SeleccionMetodoPago from './pages/Registro/SeleccionMetodoPago';
import MetodoPagoTarjeta from './pages/Registro/MetodosdePago/MetodoPagoTarjeta';
import MetodoPagoCuentaBancaria from './pages/Registro/MetodosdePago/MetodoPagoCuentaBancaria';
import MetodoPagoCheque from './pages/Registro/MetodosdePago/MetodoPagoCheque';


// Puja



// Legales
import TerminosCompra from './pages/Legales/TerminosCompra';
import TerminosEnvio from './pages/Legales/TerminosEnvio';
import TerminosyCondiciones from './pages/Legales/TerminosyCondiciones';
import PoliticadePrivacidad from './pages/Legales/PoliticadePrivacidad';
import SobreNosotros from './pages/Legales/SobreNosotros';

// Crear Subasta
import CreacionBienPaso1 from './pages/CrearSubasta/CreacionBienPaso1';
import CreacionBienPaso2 from './pages/CrearSubasta/CreacionBienPaso2';
import CreacionBienExito from './pages/CrearSubasta/CreacionBienExito';


// Subastas
import ListadeSubastas from './pages/ListadeSubastas';
import DetalleSubasta from './pages/DetalleSubasta';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
     
        <Route path="/login" element={<Login />} />
        <Route path="/recupero" element={<Recupero />} />
        <Route path="/recupero-exito" element={<RecuperoExito />} />
        
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro-exito" element={<RegistroExito />} />
        <Route path="/validacion-categoria" element={<ValidacionCategoria />} />
        <Route path="/generar-password" element={<GenerarPassword />} />

        <Route path="/terminos-compra" element={<TerminosCompra />} />
        <Route path="/terminos-envio" element={<TerminosEnvio />} />
        <Route path="/politica-de-privacidad" element={<PoliticadePrivacidad />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path='/terminos-y-condiciones' element={<TerminosyCondiciones />} />

        <Route path="/crear-subasta-paso1" element={<CreacionBienPaso1 />} />
        <Route path="/crear-subasta-paso2" element={<CreacionBienPaso2 />} />
        <Route path="/crear-subasta-exito" element={<CreacionBienExito />} /> 

        <Route path="/subastas" element={<ListadeSubastas />} />
        <Route path="/detalle-subasta" element={<DetalleSubasta />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;