import { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Modal,
  Box,
  IconButton
} from '@mui/material';
// Importar los íconos
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTecnicos } from '../hooks/useTecnicos';
import { useTecnicosAcciones } from '../hooks/useTecnicosAcciones';
import FormularioTecnico from './FormularioTecnico';

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
    minWidth: 400,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

const TablaTecnicos = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState(null);

  const { tecnicos, loading, error, refetch } = useTecnicos();
  const { deshabilitarTecnico, editarTecnico, agregarTecnico } = useTecnicosAcciones();

  const handleOpenEdit = (tecnico) => {
    setSelectedTecnico(tecnico);
    setOpenEditModal(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await editarTecnico(selectedTecnico.idUsuario, updatedData);
      refetch();
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deshabilitarTecnico(selectedTecnico.idUsuario);
      refetch();
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const handleAddTecnico = async (newTecnico) => {
    try {
      await agregarTecnico(newTecnico);
      refetch();
      setOpenAddModal(false);
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenAddModal(true)}
        >
          Nuevo Técnico
        </Button>
      </Box>

      <TableContainer component={Paper}>
        {loading ? (
          <Typography variant="h6" align="center" p={2}>
            Cargando...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error" p={2}>
            {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tecnicos.map((tecnico) => (
                <TableRow key={tecnico.idUsuario}>
                  <TableCell>{tecnico.nombreUsuario}</TableCell>
                  <TableCell>{tecnico.email}</TableCell>
                  <TableCell>
                    <IconButton
                      color="warning"
                      onClick={() => handleOpenEdit(tecnico)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedTecnico(tecnico);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Modales */}
      <ModalFormulario open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <FormularioTecnico
          tecnico={selectedTecnico}
          onSubmit={handleSaveEdit}
          onCancel={() => setOpenEditModal(false)}
          isEditing
        />
      </ModalFormulario>

      <ModalFormulario open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <FormularioTecnico
          onSubmit={handleAddTecnico}
          onCancel={() => setOpenAddModal(false)}
        />
      </ModalFormulario>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h6" gutterBottom>
            ¿Eliminar {selectedTecnico?.nombreUsuario}?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ mr: 2 }}>
            Confirmar
          </Button>
          <Button variant="outlined" onClick={() => setOpenDeleteModal(false)}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TablaTecnicos;

