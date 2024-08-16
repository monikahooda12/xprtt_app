// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  return (
    <DataContext.Provider value={{ notification, setNotification }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
