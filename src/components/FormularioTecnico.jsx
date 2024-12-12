
import React from "react";
import { TextField, Select, MenuItem, Button, Box, Typography } from "@mui/material";
import { useTecnicosAcciones } from "../hooks/useTecnicosAcciones";

const FormularioTecnico = ({ tecnico, onSubmit }) => {
  const { addTecnico, updateTecnico } = useTecnicosAcciones();
  const [formValues, setFormValues] = React.useState({
    nombreUsuario: tecnico?.nombreUsuario || "",
    email: tecnico?.email || "",
    password: tecnico?.password || "",
    rol: tecnico?.rol || "Tecnico", // Valor por defecto para rol
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tecnicoRenderizado;
    let isCreating = false
    try {
      if (tecnico) {
        // Si ya existe el técnico, actualizamos
        await updateTecnico(tecnico.idTecnico, formValues);
        tecnicoRenderizado = { ...tecnico, ...formValues }
      } else {
        // Si es un nuevo técnico, lo agregamos
        const response = await addTecnico(formValues);
        tecnicoRenderizado = response.tecnico
        isCreating = true
      }
      onSubmit({ tecnicoRenderizado, isCreating }); // referenciando
    } catch (error) {
      console.error("Error en la acción del técnico:", error.message);
    }
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
      <TextField
        label="Contraseña"
        fullWidth
        variant="outlined"
        margin="dense"
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
        required
      />
      <Select
        label="Rol"
        fullWidth
        variant="outlined"
        margin="dense"
        name="rol"
        value={formValues.rol}
        onChange={handleInputChange}
        required
      >
        <MenuItem value="Tecnico">Tecnico</MenuItem>
        <MenuItem value="Administrador">Administrador</MenuItem>
      </Select>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" type="submit">
          {tecnico ? "Actualizar" : "Agregar"}
        </Button>
      </Box>
    </form>
  );
};

export default FormularioTecnico;