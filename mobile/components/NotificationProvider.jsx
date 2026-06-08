import React, { createContext, useContext, useState } from 'react';
import PopupSubastaGanada from '../app/Puja/PopUps/PopupSubastaGanada';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [winInfo, setWinInfo] = useState(null);

  return (
    <NotificationContext.Provider value={{ setWinInfo }}>
      {children}
      <PopupSubastaGanada
        visible={!!winInfo}
        onClose={() => setWinInfo(null)}
        itemData={winInfo}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);