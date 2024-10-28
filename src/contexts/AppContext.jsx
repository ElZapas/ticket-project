import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
