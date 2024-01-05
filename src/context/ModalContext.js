// ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
