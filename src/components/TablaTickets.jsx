import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem, Modal, Typography, Box 
} from '@mui/material';
import ModalEditar from './Modals/ModalEditar';
import ModalAgregarTicket from './Modals/ModalAgregarTicket';
import useTickets from '../hooks/useTickets';
import { useApp } from '../contexts/useApp';

const TablaTickets = () => {
  const { tickets } = useTickets();
  const { user } = useApp();
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalAgregarTicket, setOpenModalAgregarTicket] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Estado para el modal de eliminar
  const [selectedTicket, setSelectedTicket] = useState(null); // Estado para el ticket seleccionado
  const [searchTerm, setSearchTerm] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
  };
  
  const handleOpenEdit = () => setOpenModalEditar(true);
  const handleCloseEdit = () => setOpenModalEditar(false);
  const handleOpenAgregar = () => setOpenModalAgregarTicket(true);
  const handleCloseAgregar = () => setOpenModalAgregarTicket(false);

  const handleOpenDeleteModal = (ticket) => {
    setSelectedTicket(ticket); // Guarda el ticket seleccionado para eliminar
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedTicket(null);
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    console.log(`Ticket eliminado: ${selectedTicket.idTicket}`);
    handleCloseDeleteModal(); // Cierra el modal después de eliminar
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    user ? (
      <Box sx={{ marginLeft: 4, marginRight: 4 }}>
        <Box sx={{ marginBottom: 4, padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Listado de Tickets
          </Typography>
          
          <Box display="flex" alignItems="center" gap={2} sx={{ marginTop: 2 }}>
            <TextField 
              label="Buscar Técnico" 
              variant="outlined" 
              size="small" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select defaultValue="abierto" size="small">
              <MenuItem value="abierto">Abierto</MenuItem>
              <MenuItem value="cerrado">Cerrado</MenuItem>
            </Select>
            {user.puesto === 'responsable' && (
              <Button variant="contained" color="primary" onClick={handleOpenAgregar}>
                Agregar
              </Button>
            )}
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ marginBottom: 4, padding: 2, boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>ID Ticket</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre Cliente</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre Técnico</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Fecha de Recepción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Prioridad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Canal de Recepción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Fecha de Resolución</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Editar</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.idTicket}</TableCell>
                  <TableCell>{ticket.nombreCliente}</TableCell>
                  <TableCell>{ticket.nombreUsuario}</TableCell>
                  <TableCell>{ticket.descripcion}</TableCell>
                  <TableCell>{ticket.fechaRecepcion}</TableCell>
                  <TableCell>{ticket.estado}</TableCell>
                  <TableCell>{ticket.prioridad}</TableCell>
                  <TableCell>{ticket.canalRecepcion}</TableCell>
                  <TableCell>{ticket.fechaResolucion || 'Pendiente'}</TableCell>
                  <TableCell>
                    {user.puesto === 'responsable' ? (
                      <Button variant="contained" color="warning" size="small" onClick={handleOpenEdit}>
                        Editar
                      </Button>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Los técnicos no pueden editar
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.puesto === 'responsable' && (
                      <Button variant="contained" color="error" size="small" onClick={() => handleOpenDeleteModal(ticket)}>
                        Eliminar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal de confirmación de eliminación */}
        <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
          <Box sx={{ ...style, width: 400, p: 4 }}>
            <Typography variant="h6" gutterBottom>¿Deseas eliminar este ticket?</Typography>
            <Typography variant="body2" gutterBottom>Esta acción no se puede deshacer.</Typography>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
              <Button variant="outlined" onClick={handleCloseDeleteModal}>Cancelar</Button>
            </Box>
          </Box>
        </Modal>

        <ModalEditar open={openModalEditar} handleClose={handleCloseEdit} />
        <ModalAgregarTicket open={openModalAgregarTicket} handleClose={handleCloseAgregar} />
      </Box>
    ) : (
      <Typography variant="h6">Cargando usuario...</Typography>
    )
  );
};

export default TablaTickets;
