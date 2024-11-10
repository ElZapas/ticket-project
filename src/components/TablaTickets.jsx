import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem, Typography, Box 
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
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenEdit = () => setOpenModalEditar(true);
  const handleCloseEdit = () => setOpenModalEditar(false);
  const handleOpenAgregar = () => setOpenModalAgregarTicket(true);
  const handleCloseAgregar = () => setOpenModalAgregarTicket(false);

  const filteredTickets = tickets.filter(ticket =>
    ticket.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    user ? (  // Verificación para asegurarse de que `user` esté definido
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
            {user.puesto === 'responsable' && ( // Botón solo para responsables
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
                    {user.puesto === 'responsable' ? ( // Solo los responsables pueden editar
                      <Button variant="contained" color="warning" size="small" onClick={handleOpenEdit}>
                        Editar
                      </Button>
                    ) : ( // Mensaje para los técnicos
                      <Typography variant="body2" color="textSecondary">
                        Los técnicos no pueden editar
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button>Previous</Button>
          <Typography variant="body1" sx={{ marginX: 2 }}>1</Typography>
          <Button>Next</Button>
        </Box>

        <ModalEditar open={openModalEditar} handleClose={handleCloseEdit} />
        <ModalAgregarTicket open={openModalAgregarTicket} handleClose={handleCloseAgregar} />
      </Box>
    ) : (
      <Typography variant="h6">Cargando usuario...</Typography> // Mensaje temporal mientras se carga `user`
    )
  );
};

export default TablaTickets;