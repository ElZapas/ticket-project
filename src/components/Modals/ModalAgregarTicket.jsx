// ModalComponent.js
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Agregar Nuevo Ticket
        </Typography>
        
        <TextField
          label="Campo 1"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Campo 2"
          variant="outlined"
          fullWidth
          margin="normal"
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
