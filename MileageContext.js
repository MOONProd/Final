import React, { createContext, useState } from 'react';

export const MileageContext = createContext();

export const MileageProvider = ({ children }) => {
  const [mileage, setMileage] = useState(0);

  return (
    <MileageContext.Provider value={{ mileage, setMileage }}>
      {children}
    </MileageContext.Provider>
  );
};
