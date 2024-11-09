import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem,Modal, Typography, Box 
} from '@mui/material';
import ModalEditar from './Modals/ModalEditar';
import ModalAgregarTicket from './Modals/ModalAgregarTicket';
import useTickets from '../hooks/useTickets';

const TablaTickets = () => {
  const { tickets } = useTickets();
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalAgregarTicket, setOpenModalAgregarTicket] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Manejar apertura y cierre de los modales
  const handleOpenEdit = () => setOpenModalEditar(true);
  const handleCloseEdit = () => setOpenModalEditar(false);
  const handleOpenAgregar = () => setOpenModalAgregarTicket(true);
  const handleCloseAgregar = () => setOpenModalAgregarTicket(false);

  // Filtrar tickets basados en el término de búsqueda
  const filteredTickets = tickets.filter(ticket =>
    ticket.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = () => {
    console.log("Ticket eliminado");
    handleCloseDeleteModal(); // Cierra el modal después de eliminar
  };

  return (
    <Box sx={{ marginLeft: 4 , marginRight: 4 }}>
      {/* Encabezado y filtros */}
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
          <Button variant="contained" color="primary" onClick={handleOpenAgregar}>
            Agregar
          </Button>
        </Box>
      </Box>

      {/* Tabla de tickets */}
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
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={handleOpenEdit}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleDelete}
                    style={{ marginLeft: '8px' }} // Espacio entre los botones
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
                          Estas seguro de eliminar este ticket?
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                          ¿Estás seguro de que deseas eliminar este ticket?
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                          <Button variant="contained" color="error" onClick={handleDelete}>
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
      </TableContainer>

      {/* Paginación */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button>Previous</Button>
        <Typography variant="body1" sx={{ marginX: 2 }}>1</Typography>
        <Button>Next</Button>
      </Box>

      {/* Modales para agregar o editar */}
      <ModalEditar open={openModalEditar} handleClose={handleCloseEdit} />
      <ModalAgregarTicket open={openModalAgregarTicket} handleClose={handleCloseAgregar} />
    </Box>
  );
};

export default TablaTickets;

