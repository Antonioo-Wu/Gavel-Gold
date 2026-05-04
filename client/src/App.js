import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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
import MetodoPagoTarjeta from './pages/Registro/M%C3%A9todosdePago/MetodoPagoTarjeta';
import MetodoPagoCuentaBancaria from './pages/Registro/M%C3%A9todosdePago/MetodoPagoCuentaBancaria';
import MetodoPagoCheque from './pages/Registro/M%C3%A9todosdePago/MetodoPagoCheque';


// Puja



// Legales
import TerminosCompra from './pages/Legales/TerminosCompra';
import TerminosVenta from './pages/Legales/TerminosVenta';
import PoliticaPrivacidad from './pages/Legales/PoliticaPrivacidad';
import SobreNosotros from './pages/Legales/SobreNosotros';

// Crear Subasta
import CreacionBienPaso1 from './pages/CrearSubasta/CreacionBienPaso1';
import CreacionBienPaso2 from './pages/CrearSubasta/CreacionBienPaso2';
import CreacionBienExito from './pages/CrearSubasta/CreacionBienExito';



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
        <Route path="/terminos-venta" element={<TerminosVenta />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />

        <Route path="/crear-subasta-paso1" element={<CreacionBienPaso1 />} />
        <Route path="/crear-subasta-paso2" element={<CreacionBienPaso2 />} />
        <Route path="/crear-subasta-exito" element={<CreacionBienExito />} /> 
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;