import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,InputLabel , Button, TextField, Modal, Typography, Box, Select , MenuItem} from '@mui/material';
import FormularioTicket from './FormularioTicket'; // Componente reutilizable para agregar/editar
import { useTicketsFiltrados } from '../hooks/useTicketsFiltrados';
import { useTicketAcciones } from '../hooks/useTicketAcciones'; // Importamos el hook de acciones
import { useApp } from '../contexts/useApp';

const TablaTickets = () => {
  const { tickets, fetchTickets, setTickets } = useTicketsFiltrados();
  const { user } = useApp();
  const { deleteTicket } = useTicketAcciones(); // Acciones para eliminar y editar
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTickets(); // Cargar tickets al montar el componente
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
  };

  const handleOpenModal = (ticket = null) => {
    setSelectedTicket(ticket);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setOpenModal(false);
  };

  const handleOpenDeleteModal = (ticket) => {
    setSelectedTicket(ticket);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedTicket(null);
    setOpenDeleteModal(false);
  };

  const handleTicketSubmit = async ({ ticketRenderizado, isCreating }) => {
    if (isCreating) {
      setTickets((oldTickets) => ([...oldTickets, ticketRenderizado]))
    } else {
      console.log(ticketRenderizado)
      setTickets((oldTickets) =>
        oldTickets.map((ticket) => ticket.idTicket === ticketRenderizado.idTicket ? ticketRenderizado : ticket)
      )
    }
    handleCloseModal();
  };

  const handleDelete = async () => {
    if (selectedTicket) {
      await deleteTicket(selectedTicket.idTicket); // Eliminamos
      setTickets((oldTickets) =>
        oldTickets.filter((ticket) => ticket.idTicket !== selectedTicket.idTicket)
      )
    }
    handleCloseDeleteModal();
  };

  /*const filteredTickets = tickets.filter(ticket =>
    ticket.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );*/


  const [estado, setEstado] = useState("abierto");
  const [prioridad, setPrioridad] = useState("baja");

  const handleChangeEstado = (event) => {
    setEstado(event.target.value);
  };


  const handleChangePrioridad = (event) => {
    setPrioridad(event.target.value);
  };



  return (
    user ? (
      <Box sx={{ marginLeft: 4, marginRight: 4 }}>
        <Box sx={{ marginBottom: 4, padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Listado de Tickets
          </Typography>

        <Box display="flex" sx={{ justifyContent: 'space-between'}} >
              <Box display="flex" alignItems="center" gap={2} sx={{ marginTop: 2 }}>
                <TextField
                  label="Buscar Técnico"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {user.puesto === 'responsable' && (
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
                    Agregar
                  </Button>
                )}
                
              </Box>
              
              <Box display="flex" sx={{ gap: 2}}>
                  <div>
                     <InputLabel id="estado-label">Estado</InputLabel>
                      <Select
                          labelId="estado-label"
                          id="estado"
                          value={estado}
                          onChange={handleChangeEstado}
                          label="Estado"
                        >
                            <MenuItem value="abierto">Abierto</MenuItem>
                            <MenuItem value="cerrado">Cerrado</MenuItem>
                      </Select>
                  </div>
                 
                  <div>
                    <InputLabel id="prioridad-label">Prioridad</InputLabel>
                    <Select
                        labelId="prioridad-label"
                        id="prioridad"
                        value={prioridad}
                        onChange={handleChangePrioridad}
                        label="prioridad"
                      >
                          <MenuItem value="baja">Baja</MenuItem>
                          <MenuItem value="media">Media</MenuItem>
                          <MenuItem value="alta">Alta</MenuItem>
                          <MenuItem value="critica">Critica</MenuItem>
                    </Select>
                  </div>
                  


              </Box>
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
              {Array.isArray(tickets) && tickets.length > 0 ? (
                tickets.map((ticket, index) => (
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
                        <Button variant="contained" color="warning" size="small" onClick={() => handleOpenModal(ticket)}>
                          Editar
                        </Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No Autorizado
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.puesto === 'responsable' ? (
                        <Button variant="contained" color="error" size="small" onClick={() => handleOpenDeleteModal(ticket)}>
                          Eliminar
                        </Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No Autorizado
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No se encontraron tickets registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal para agregar/editar ticket */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ ...style, width: 400, p: 4 }}>
            <Typography variant="h6" gutterBottom>
              {selectedTicket ? 'Editar Ticket' : 'Agregar Ticket'}
            </Typography>
            <FormularioTicket
              ticket={selectedTicket}
              onSubmit={handleTicketSubmit}
            />
          </Box>
        </Modal>

        {/* Modal para confirmar eliminación */}
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
      </Box>
    ) : (
      <Typography variant="h6">Cargando usuario...</Typography>
    )
  );
};

export default TablaTickets;

