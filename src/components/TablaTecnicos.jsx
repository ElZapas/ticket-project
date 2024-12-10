import { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button } from '@mui/material';
import useTecnicos from '../hooks/useTecnicos'; // Importa el hook
import ModalTecnicoEditar from './Modals/ModalTecnicoEditar';

const TablaTecnicos = ({ handleEdit, token }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState(null);

  // Usar el hook personalizado
  const { tecnicos, loading, error } = useTecnicos(token);

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
      {loading ? (
        <Typography variant="h6" sx={{ textAlign: 'center', padding: 2 }}>
          Cargando técnicos...
        </Typography>
      ) : error ? (
        <Typography variant="h6" sx={{ textAlign: 'center', padding: 2, color: 'red' }}>
          {error}
        </Typography>
      ) : tecnicos.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', padding: 2 }}>
          No hay técnicos registrados.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Correo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Editar</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

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

