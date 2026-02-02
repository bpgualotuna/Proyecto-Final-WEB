// ===================================
// MODELO: PRÉSTAMO
// ===================================

import { generarId, calcularDiferenciaDias } from '../utils/helpers.js';
import { ESTADOS_PRESTAMO, DIAS } from '../utils/constants.js';

// Clase que representa un préstamo de libro

export class Prestamo {
  constructor({ id = null, libroId, libroTitulo, usuario, dias = DIAS.PRESTAMO_DEFAULT }) {
    this.id = id || generarId();
    this.libroId = libroId;
    this.libroTitulo = libroTitulo;
    this.usuario = usuario;
    this.fechaPrestamo = new Date();
    this.fechaDevolucion = this.calcularFechaDevolucion(dias);
    this.estado = this.calcularEstado();
  }

  // Calcula la fecha de devolución
  // @param {number} dias - Días de préstamo
  // @returns {Date} Fecha de devolución
  
  calcularFechaDevolucion(dias) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  // Calcula el estado actual del préstamo
  // @returns {string} Estado del préstamo
  
  calcularEstado() {
    const hoy = new Date();
    const diferenciaDias = calcularDiferenciaDias(this.fechaDevolucion, hoy);

    if (diferenciaDias < 0) return ESTADOS_PRESTAMO.VENCIDO;
    if (diferenciaDias <= DIAS.PRESTAMO_PROXIMO_VENCER) return ESTADOS_PRESTAMO.PROXIMO;
    return ESTADOS_PRESTAMO.ACTIVO;
  }

  // Actualiza el estado del préstamo
  
  actualizarEstado() {
    const estadoAnterior = this.estado;
    this.estado = this.calcularEstado();
    return estadoAnterior !== this.estado;
  }

  // Obtiene los días restantes hasta la devolución
  // @returns {number} Días restantes
  
  getDiasRestantes() {
    const dias = calcularDiferenciaDias(this.fechaDevolucion, new Date());
    return Math.max(0, dias);
  }

  // Verifica si el préstamo está vencido
  // @returns {boolean} True si está vencido
  
  estaVencido() {
    return this.estado === ESTADOS_PRESTAMO.VENCIDO;
  }

  // Verifica si el préstamo está próximo a vencer
  // @returns {boolean} True si está próximo a vencer
  
  estaProximoVencer() {
    return this.estado === ESTADOS_PRESTAMO.PROXIMO;
  }

  // Convierte el préstamo a objeto plano
  // @returns {Object} Objeto con los datos del préstamo
  
  toJSON() {
    return {
      id: this.id,
      libroId: this.libroId,
      libroTitulo: this.libroTitulo,
      usuario: this.usuario,
      fechaPrestamo: this.fechaPrestamo,
      fechaDevolucion: this.fechaDevolucion,
      estado: this.estado
    };
  }

  // Crea un préstamo desde un objeto plano
  // @param {Object} data - Datos del préstamo
  // @returns {Prestamo} Instancia de Prestamo
  
  static fromJSON(data) {
    const prestamo = Object.create(Prestamo.prototype);
    Object.assign(prestamo, data);
    prestamo.fechaPrestamo = new Date(data.fechaPrestamo);
    prestamo.fechaDevolucion = new Date(data.fechaDevolucion);
    return prestamo;
  }
}
