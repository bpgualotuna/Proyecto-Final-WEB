// ===================================
// CONTROLADOR: RESERVAS
// ===================================

// Controlador para gestionar las operaciones de reservas

export class ReservaController {
  constructor(bibliotecaService, reservaView) {
    this.bibliotecaService = bibliotecaService;
    this.reservaView = reservaView;
  }

  // Inicializa el controlador
  inicializar() {
    this.reservaView.onReservarLibro((libroId, usuario, email) => 
      this.reservarLibro(libroId, usuario, email)
    );
    this.reservaView.onCancelarReserva((reservaId) => 
      this.cancelarReserva(reservaId)
    );
    
    // Renderizar reservas iniciales
    this.mostrarReservas();
  }

  // Muestra todas las reservas
  mostrarReservas() {
    const reservas = this.bibliotecaService.reservas;
    this.reservaView.renderizar(reservas);
  }

  // Procesa una reserva de libro
  // @param {string} libroId - ID del libro
  // @param {string} usuario - Nombre del usuario
  // @param {string} email - Email del usuario
  
  async reservarLibro(libroId, usuario, email) {
    try {
      this.bibliotecaService.notificacionService.info(
        'Procesando',
        'Procesando reserva...'
      );

      const reserva = await this.bibliotecaService.procesarReserva(libroId, usuario, email);

      this.bibliotecaService.notificacionService.success(
        'Reserva Realizada',
        `Tu reserva para "${reserva.libroTitulo}" ha sido confirmada. Te notificaremos cuando esté disponible.`
      );

      this.reservaView.cerrarModal();
      this.reservaView.limpiarFormulario();
      this.mostrarReservas();
    } catch (error) {
      this.bibliotecaService.notificacionService.error(
        'Error',
        error
      );
    }
  }

  // Cancela una reserva
  // @param {string} reservaId - ID de la reserva
  
  cancelarReserva(reservaId) {
    const reserva = this.bibliotecaService.reservas.find(r => r.id === reservaId);
    
    if (!reserva) return;

    if (confirm(`¿Cancelar la reserva de "${reserva.libroTitulo}"?`)) {
      this.bibliotecaService.cancelarReserva(reservaId);
      
      this.bibliotecaService.notificacionService.info(
        'Reserva Cancelada',
        `La reserva de "${reserva.libroTitulo}" ha sido cancelada.`
      );
      
      this.mostrarReservas();
    }
  }
}
