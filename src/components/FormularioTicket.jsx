import React from "react";
import { TextField, Select, MenuItem, Button, Box, Typography } from "@mui/material";
import { useTicketAcciones } from "../hooks/useTicketAcciones"; // Importar el hook

const FormularioTicket = ({ ticket, onSubmit }) => {
  const { addTicket, updateTicket } = useTicketAcciones(); // Obtener las funciones del hook
  const [formValues, setFormValues] = React.useState({
    nombreCliente: ticket?.nombreCliente || "",
    nombreUsuario: ticket?.nombreUsuario || "",
    descripcion: ticket?.descripcion || "",
    estado: ticket?.estado || "Abierto", // Valor por defecto para estado
    prioridad: ticket?.prioridad || "Media", // Valor por defecto para prioridad
    canalRecepcion: ticket?.canalRecepcion || "Correo", // Valor por defecto para canalRecepcion
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ticketRenderizado;
    let isCreating = false
    try {
      if (ticket) {
        // Si ya existe el ticket, actualizamos
        await updateTicket(ticket.idTicket, formValues);
        ticketRenderizado = { ...ticket , ...formValues}
      } else {
        // Si es un nuevo ticket, lo agregamos
        console.log(formValues)
        const response = await addTicket(formValues);
        ticketRenderizado = response.ticket
        isCreating = true
      }
      onSubmit({ ticketRenderizado, isCreating }); // referenciando
    } catch (error) {
      console.error("Error en la acción del ticket:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <TextField
        label="NombreCliente"
        fullWidth
        variant="outlined"
        margin="dense"
        name="nombreCliente"
        value={formValues.nombreCliente}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="NombreTécnico"
        fullWidth
        variant="outlined"
        margin="dense"
        name="nombreUsuario"
        value={formValues.nombreUsuario}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Descripción"
        fullWidth
        variant="outlined"
        margin="dense"
        name="descripcion"
        value={formValues.descripcion}
        onChange={handleInputChange}
        multiline
        rows={4}
        required
      />
      <Select
        label="Estado"
        fullWidth
        variant="outlined"
        margin="dense"
        name="estado"
        value={formValues.estado}
        onChange={handleInputChange}
        required
      >
        <MenuItem value="Abierto">Abierto</MenuItem>
        <MenuItem value="En Proceso">En Proceso</MenuItem>
        <MenuItem value="Resuelto">Resuelto</MenuItem>
        <MenuItem value="Cerrado">Cerrado</MenuItem>
      </Select>
      <Select
        label="Prioridad"
        fullWidth
        variant="outlined"
        margin="dense"
        name="prioridad"
        value={formValues.prioridad}
        onChange={handleInputChange}
        required
      >
        <MenuItem value="Baja">Baja</MenuItem>
        <MenuItem value="Media">Media</MenuItem>
        <MenuItem value="Alta">Alta</MenuItem>
        <MenuItem value="Crítica">Crítica</MenuItem>
      </Select>
      <Select
        label="Canal de Recepción"
        fullWidth
        variant="outlined"
        margin="dense"
        name="canalRecepcion"
        value={formValues.canalRecepcion}
        onChange={handleInputChange}
        required
      >
        <MenuItem value="Correo">Correo</MenuItem>
        <MenuItem value="WhatsApp">WhatsApp</MenuItem>
      </Select>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" type="submit">
          {ticket ? "Actualizar" : "Agregar"}
        </Button>
      </Box>
    </form>
  );
};

export default FormularioTicket;


