import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

const FormularioTecnico = ({ tecnico, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    nombreUsuario: tecnico?.nombreUsuario || "",
    email: tecnico?.email || "",
    password: tecnico?.password || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formValues)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <TextField
        label="Nombre de Usuario"
        fullWidth
        variant="outlined"
        margin="dense"
        name="nombreUsuario"
        value={formValues.nombreUsuario}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Correo Electrónico"
        fullWidth
        variant="outlined"
        margin="dense"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        required
      />
      {!tecnico && 
      <TextField
        label="Contraseña"
        fullWidth
        variant="outlined"
        margin="dense"
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
        required
      />}
    
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" type="submit">
          {tecnico ? "Actualizar" : "Agregar"}
        </Button>
      </Box>
    </form>
  );
};

export default FormularioTecnico;