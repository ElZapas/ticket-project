// ModalComponent.js
import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';

const ModalAgregarTicket = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"

      
    >
      <Box 
       sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxHeight: '80vh',  // Limita la altura máxima del modal
        overflowY: 'auto',   // Agrega scroll vertical cuando el contenido excede el tamaño
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        // Estilos personalizados del scrollbar para navegadores Webkit
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Agregar Nuevo Ticket
        </Typography>
        
        {/* ID Ticket */}
        <TextField
          label="ID Ticket"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        {/* ID Cliente */}
        <TextField
          label="ID Cliente"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        {/* ID Usuario */}
        <TextField
          label="ID Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        {/* Descripción */}
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        
        {/* Fecha de Recepción */}
        <TextField
          label="Fecha de Recepción"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        {/* Estado */}
        <TextField
          label="Estado"
          variant="outlined"
          fullWidth
          margin="normal"
          select
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="En Proceso">En Proceso</MenuItem>
          <MenuItem value="Cerrado">Cerrado</MenuItem>
        </TextField>
        
        {/* Prioridad */}
        <TextField
          label="Prioridad"
          variant="outlined"
          fullWidth
          margin="normal"
          select
        >
          <MenuItem value="Baja">Baja</MenuItem>
          <MenuItem value="Media">Media</MenuItem>
          <MenuItem value="Alta">Alta</MenuItem>
        </TextField>
        
        {/* Canal de Recepción */}
        <TextField
          label="Canal de Recepción"
          variant="outlined"
          fullWidth
          margin="normal"
          select
        >
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Teléfono">Teléfono</MenuItem>
          <MenuItem value="Chat">Chat</MenuItem>
          <MenuItem value="Presencial">Presencial</MenuItem>
        </TextField>
        
        {/* Fecha de Resolución */}
        <TextField
          label="Fecha de Resolución"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} sx={{ marginRight: 2 }} variant="outlined">
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAgregarTicket;
