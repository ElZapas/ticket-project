import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ModalTecnicoEditar = ({ open, onClose, tecnico, onSave }) => {
  const [formData, setFormData] = useState({
    idTecnico: '',
    nombre: '',
    apellido: '',
    correo: '',
    area: ''
  });

  useEffect(() => {
    if (tecnico) {
      setFormData(tecnico);
    }
  }, [tecnico]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Editar Técnico
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="ID Técnico"
          name="idTecnico"
          value={formData.idTecnico}
          onChange={handleChange}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Área"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary" onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalTecnicoEditar;
