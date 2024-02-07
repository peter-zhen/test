import React, { ReactNode, createContext, useContext, useState } from "react";

interface ConnectionTypeContextProps {
  connectionType: ConnectionsEnum | null;
  isRedirecting: boolean;
  changeIsRedirecting: (value: boolean) => void;
  changeConnectionType: (connectionType: ConnectionsEnum) => void;
  resetConnectionType: () => void;
}

interface ConnectionTypeProviderProps {
  children: ReactNode;
}

export enum ConnectionsEnum {
  Eth = "ETH",
  Trc = "TRC",
}

const ConnectionTypeContext = createContext<ConnectionTypeContextProps | null>(
  null
);

export const ConnectionTypeProvider = ({
  children,
}: ConnectionTypeProviderProps) => {
  const storedConnectionType =
    (localStorage.getItem("connectionType") as ConnectionsEnum) || null;

  const [connectionType, setConnectionType] = useState<ConnectionsEnum | null>(
    storedConnectionType
  );
  const [isRedirecting, setIsRedirecting] = useState(false);

  const changeConnectionType = (connectionType: ConnectionsEnum) => {
    setConnectionType(connectionType);
    localStorage.setItem("connectionType", connectionType);
  };

  const resetConnectionType = () => {
    setConnectionType(null);
    localStorage.removeItem("connectionType");
  };

  const changeIsRedirecting = (value: boolean) => {
    setIsRedirecting(value);
  };

  return (
    <ConnectionTypeContext.Provider
      value={{
        connectionType,
        isRedirecting,
        changeConnectionType,
        changeIsRedirecting,
        resetConnectionType,
      }}
    >
      {children}
    </ConnectionTypeContext.Provider>
  );
};

export const useConnectionType = () => {
  const context = useContext(ConnectionTypeContext);

  if (!context) {
    throw new Error(
      "useConnectionType must be used within a ConnectionTypeContext"
    );
  }

  return context;
};
