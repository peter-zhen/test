import React, { createContext, useState, ReactNode, useContext } from "react";

interface PaymentContextProps {
  quantity: string;
  handleQuantityChange: (quantity: string) => void;
}

const PaymentContext = createContext<PaymentContextProps | null>(null);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [quantity, setQuantity] = useState('');

  const handleQuantityChange = (newQuantity: string) => {
    setQuantity(newQuantity);
  };

  const contextValue: PaymentContextProps = {
    quantity,
    handleQuantityChange,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error(
      "usePayment must be used within a PaymentProvider"
    );
  }
  return context;
};
