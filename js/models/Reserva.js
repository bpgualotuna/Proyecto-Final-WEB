// ===================================
// MODELO: RESERVA
// ===================================

import { generarId } from '../utils/helpers.js';
import { ESTADOS_RESERVA } from '../utils/constants.js';

// Clase que representa una reserva de libro

export class Reserva {
  constructor({ id = null, libroId, libroTitulo, usuario, email }) {
    this.id = id || generarId();
    this.libroId = libroId;
    this.libroTitulo = libroTitulo;
    this.usuario = usuario;
    this.email = email;
    this.fechaReserva = new Date();
    this.estado = ESTADOS_RESERVA.PENDIENTE;
  }

  // Marca la reserva como completada
  
  completar() {
    this.estado = ESTADOS_RESERVA.COMPLETADA;
  }

  // Cancela la reserva
  
  cancelar() {
    this.estado = ESTADOS_RESERVA.CANCELADA;
  }

  // Verifica si la reserva está pendiente
  // @returns {boolean} True si está pendiente
  
  estaPendiente() {
    return this.estado === ESTADOS_RESERVA.PENDIENTE;
  }

  // Convierte la reserva a objeto plano
  // @returns {Object} Objeto con los datos de la reserva
  
  toJSON() {
    return {
      id: this.id,
      libroId: this.libroId,
      libroTitulo: this.libroTitulo,
      usuario: this.usuario,
      email: this.email,
      fechaReserva: this.fechaReserva,
      estado: this.estado
    };
  }

  // Crea una reserva desde un objeto plano
  // @param {Object} data - Datos de la reserva
  // @returns {Reserva} Instancia de Reserva
  
  static fromJSON(data) {
    const reserva = Object.create(Reserva.prototype);
    Object.assign(reserva, data);
    reserva.fechaReserva = new Date(data.fechaReserva);
    return reserva;
  }
}
