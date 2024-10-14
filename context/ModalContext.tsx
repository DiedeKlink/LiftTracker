import React, { createContext, useState, ReactNode, useContext } from "react";
import { Exercise } from "../lib/types";

interface ModalContextType {
  closeModal: () => void;
  openModal: (data: Exercise) => void;
  isVisible: boolean;
  modalData: Exercise | undefined;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<Exercise>();
  const openModal = (data: Exercise) => {
    setModalData(data);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ isVisible, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
