import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import '../styles/Perfil.css'

import { BiInfoCircle } from "react-icons/bi";
import { BiLockAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Mi Perfil</h1>
      
      <div className="perfil-category">
        Categoría: Común
      </div>

      {/* Sección Más Información refactorizada según el mockup */}
      <div className="info-card">
        <h3>Más información</h3>
        
        <div className="info-item" onClick={() => navigate('/terminos-y-condiciones')}>
          <BiInfoCircle size={22} color='black'/>
          <span>Términos y Condiciones</span>
        </div>

        <div className="info-item" onClick={() => navigate('/politica-de-privacidad')}>
          <BiLockAlt size={22} color='black'/>
          <span>Política de Privacidad</span>
        </div>

        <div className="info-item" onClick={() => navigate('/sobre-nosotros')}>
          <FiUsers size={22} color='black'/>
          <span>Sobre nosotros</span>
        </div>
      </div>

      <button className="logout-button" onClick={() => navigate('/')}>
        Cerrar Sesión
      </button>

      <BottomNav />
    </div>
  );
}