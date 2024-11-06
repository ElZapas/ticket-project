import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem, Typography, Box 
} from '@mui/material';
import ModalEditar from './Modals/ModalEditar'
import ModalAgregarTicket from './Modals/ModalAgregarTicket'


const TablaTickets = () => {
  
  const data = Array(20).fill({
    idTicket: 'T001',
    idCliente: 'C001',
    idUsuario: 'U001',
    descripcion: 'Descripcion breve de la observación',
    fechaRecepcion: '05/11/24',
    estado: 'Abierto',
    prioridad: 'Alta',
    canalRecepcion: 'TEXT',
    fechaResolucion: '20/11/24',
  });

  const [openModalEditar, setOpenModalEditar] = useState(false);

  const handleOpenEdit = () => setOpenModalEditar(true);
  const handleCloseEdit = () => setOpenModalEditar(false);

  const [openModalAgregarTicket, setOpenModalAgregarTicket] = useState(false);

  const handleOpenAgregar = () => setOpenModalAgregarTicket(true);
  const handleCloseAgregar = () => setOpenModalAgregarTicket(false);


  return (
    <Box sx={{ marginLeft: 4 , marginRight: 4 }}>
      {/* Encabezado y filtros */}
      <Box sx={{ marginBottom: 4, padding: 3, boxShadow: 3, borderRadius: 2 }}>
  <Typography variant="h4" gutterBottom>
    Listado de Tickets
  </Typography>
  
  <Box display="flex" alignItems="center" gap={2} sx={{ marginTop: 2 }}>
    <TextField label="Buscar Técnico" variant="outlined" size="small" />
    <Select defaultValue="abierto" size="small">
      <MenuItem value="abierto">Abierto</MenuItem>
      <MenuItem value="cerrado">Cerrado</MenuItem>
    </Select>
    <Button variant="contained" color="primary">Agregar</Button>
  </Box>
</Box>


      {/* Tabla de tickets */}
      <TableContainer component={Paper} sx={{marginBottom: 4, padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="info"  onClick={handleOpenAgregar}  sx={{ fontSize: '16px' , paddingLeft: '20px',paddingRight: '20px'}}>
          Agregar
        </Button>
      </Box>

        <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>ID Ticket</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>ID Cliente</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>ID Usuario</TableCell>
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
            {data.map((ticket, index) => (
              <TableRow key={index}>
                <TableCell>{ticket.idTicket}</TableCell>
                <TableCell>{ticket.idCliente}</TableCell>
                <TableCell>{ticket.idUsuario}</TableCell>
                <TableCell>{ticket.descripcion}</TableCell>
                <TableCell>{ticket.fechaRecepcion}</TableCell>
                <TableCell>{ticket.estado}</TableCell>
                <TableCell>{ticket.prioridad}</TableCell>
                <TableCell>{ticket.canalRecepcion}</TableCell>
                <TableCell>{ticket.fechaResolucion || 'Pendiente'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" size="small" onClick={handleOpenEdit} >Editar</Button>
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

      <ModalEditar open={openModalEditar} handleClose={handleCloseEdit} />
      <ModalAgregarTicket open={openModalAgregarTicket} handleClose={handleCloseAgregar} />

      


    </Box>
  );
};

export default TablaTickets;
