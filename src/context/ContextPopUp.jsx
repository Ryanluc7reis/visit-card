import React, { createContext, useState, useContext, useEffect } from "react";

const PopUpContext = createContext();

export const ContextPopUpProvider = ({ children }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [messageType, setMessageType] = useState("");

  return (
    <PopUpContext.Provider
      value={{ showPopUp, setShowPopUp, messageType, setMessageType }}
    >
      {children}
    </PopUpContext.Provider>
  );
};

export const usePopUp = () => useContext(PopUpContext);
