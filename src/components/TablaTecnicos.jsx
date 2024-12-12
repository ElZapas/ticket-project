import { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, Modal, Box } from '@mui/material';
import { useTecnicos }  from '../hooks/useTecnicos';
import { useTecnicosAcciones } from '../hooks/useTecnicosAcciones';
import ModalTecnicoEditar from './FormularioTecnico';
import ModalTecnicoAgregar from './FormularioTecnico';

const ModalFormulario = ({ open, onClose, children }) => {
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

const TablaTecnicos = ({ handleEdit, token }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const { tecnicos, loading, error } = useTecnicos(token);
  const { deshabilitarTecnico } = useTecnicosAcciones();

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

  const handleOpenDeleteModal = (tecnico) => {
    setSelectedTecnico(tecnico);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedTecnico(null);
  };

  const handleDelete = async () => {
    try {
      await deshabilitarTecnico(selectedTecnico.idTecnico);
    } catch (error) {
      console.error("Error al eliminar técnico:", error.message);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAdd = (newTecnico) => {
   
    setOpenAddModal(false);
  };

  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ marginBottom: 4, padding: 2, boxShadow: 3, borderRadius: 2, maxWidth: 1600 }}>
        {loading ? (
          <Typography variant="h6" sx={{ textAlign: 'center', padding: 2 }}>
            Cargando técnicos...
          </Typography>
        ) : error ? (
          <Typography variant="h6" sx={{ textAlign: 'center', padding: 2, color: 'red' }}>
            {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Correo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Editar</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Eliminar</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Agregar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tecnicos.map((tecnico, index) => (
                <TableRow key={index}>
                  <TableCell>{tecnico.nombreUsuario}</TableCell>
                  <TableCell>{tecnico.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => handleOpenEdit(tecnico)}
                    >
 Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleOpenDeleteModal(tecnico)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenAddModal(tecnico)}
                    >
                      Agregar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
  
      <div style={{ position: 'relative' }}>
      {/* Modal para confirmar eliminación */}
      {openDeleteModal && (
        <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
          <Box sx={{ ...style, width: 400, p: 4 }}>
            <Typography variant="h6" gutterBottom>¿Está seguro de que desea eliminar a {selectedTecnico?.nombreUsuario}?</Typography>
            <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>Cancelar</Button>
          </Box>
        </Modal>
      )}
  
      {/* Modal para editar técnico */}
      {openEditModal && (
        <ModalFormulario open={openEditModal} onClose={handleCloseEditModal}>
          <ModalTecnicoEditar tecnico={selectedTecnico} onSave={handleSaveEdit} />
        </ModalFormulario>
      )}
  
      {/* Modal para agregar técnico */}
      {openAddModal && (
        <ModalFormulario open={openAddModal} onClose={handleCloseAddModal}>
          <ModalTecnicoAgregar onAdd={handleAdd} />
        </ModalFormulario>
      )}
    </div>
  </div>
  );
};

export default TablaTecnicos;

