import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Modal,
  Box,
  Typography
} from '@mui/material';
import ModalTecnicoEditar from './Modals/ModalTecnicoEditar';

const TablaTecnicos = ({ tecnicos, handleEdit, handleDelete }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState(null);

  const handleOpenDelete = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenEdit = (tecnico) => {
    setSelectedTecnico(tecnico);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedTecnico(null);
  };

  const handleSaveEdit = (updatedTecnico) => {
    handleEdit(updatedTecnico); // Llama a la función de edición proporcionada por el componente padre
    setOpenEditModal(false);
  };

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 4, padding: 2, boxShadow: 3, borderRadius: 2, maxWidth: 1600 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>ID Técnico</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Apellido</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Correo</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Área</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(tecnicos || []).map((tecnico, index) => (
            <TableRow key={index}>
              <TableCell>{tecnico.idTecnico}</TableCell>
              <TableCell>{tecnico.nombre}</TableCell>
              <TableCell>{tecnico.apellido}</TableCell>
              <TableCell>{tecnico.correo}</TableCell>
              <TableCell>{tecnico.area}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => handleOpenEdit(tecnico)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleOpenDelete}
                  style={{ marginLeft: '8px' }}
                >
                  Eliminar
                </Button>
                <Modal
                  open={openDeleteModal}
                  onClose={handleCloseDeleteModal}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 300,
                      bgcolor: 'background.paper',
                      borderRadius: '8px',
                      boxShadow: 24,
                      p: 4,
                      textAlign: 'center'
                    }}
                  >
                    <Typography id="modal-title" variant="h6" component="h2">
                      ¿Estás seguro de eliminar este técnico?
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" color="error" onClick={() => handleDelete(tecnico)}>
                        Sí, eliminar
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleCloseDeleteModal}
                        sx={{ ml: 2 }}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de edición */}
      <ModalTecnicoEditar
        open={openEditModal}
        onClose={handleCloseEditModal}
        tecnico={selectedTecnico}
        onSave={handleSaveEdit}
      />
    </TableContainer>
  );
};

export default TablaTecnicos;
