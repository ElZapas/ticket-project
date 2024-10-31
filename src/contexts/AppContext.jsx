import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import useToken from "../hooks/useToken";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { hastoken, isTokenValid, clearToken, getUserDataFromToken } = useToken()
  const [user, setUser] = useState(() => getUserDataFromToken());
  useEffect(() => {
    const checkToken = () => {
      if (!hastoken()) return; // pide el token a ver si lo tiene por lo menos

      if (!isTokenValid()) {
        clearToken(); // si lo tiene, ve si este ha expirado
        setUser(undefined)
      };
    }

    checkToken();
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Definir las validaciones de las props
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Especificar que children es requerido y debe ser un nodo
};
