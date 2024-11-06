// ModalComponent.js
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ModalEditar = ({ open, handleClose, ticketData }) => {
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
          Editar Ticket
        </Typography>

        {/* Campos del formulario */}
        <TextField label="ID Ticket" variant="outlined" fullWidth margin="normal" defaultValue={ticketData?.idTicket || ''} />
        <TextField label="ID Cliente" variant="outlined" fullWidth margin="normal" defaultValue={ticketData?.idCliente || ''} />
        <TextField label="ID Usuario" variant="outlined" fullWidth margin="normal" defaultValue={ticketData?.idUsuario || ''} />
        <TextField label="Descripción" variant="outlined" fullWidth margin="normal" multiline rows={3} defaultValue={ticketData?.descripcion || ''} />
        <TextField label="Fecha de Recepción" variant="outlined" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} defaultValue={ticketData?.fechaRecepcion || ''} />
        <TextField label="Estado" variant="outlined" fullWidth margin="normal" defaultValue={ticketData?.estado || ''} />
        <TextField label="Prioridad" variant="outlined" fullWidth margin="normal" defaultValue={ticketData?.prioridad || ''} />
        <TextField label="Canal de Recepción" variant="outlined" fullWidth margin="normal" defaultValue={ticketData?.canalRecepcion || ''} />
        <TextField label="Fecha de Resolución" variant="outlined" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} defaultValue={ticketData?.fechaResolucion || ''} />

        {/* Botones de acción */}
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

export default ModalEditar;
