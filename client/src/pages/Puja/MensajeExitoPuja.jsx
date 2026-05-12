import React from 'react';
import FeedbackScreen from '../../components/FeedbackScreen';


export default function MensajeExitoPuja() {
    return (
        <FeedbackScreen 
          text={"¡Has ganado la subasta!"}
            navigateTo="/seguimiento-puja"
        />
        
    );
}