// ===================================
// MODELO: LIBRO
// ===================================

import { generarId } from '../utils/helpers.js';

// Clase que representa un libro en la biblioteca

export class Libro {
  constructor({ id = null, titulo, autor, genero, descripcion = '', disponible = true }) {
    this.id = id || generarId();
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.descripcion = descripcion;
    this.disponible = disponible;
    this.fechaAgregado = new Date();
  }

  // Marca el libro como prestado
  
  prestar() {
    if (!this.disponible) {
      throw new Error('El libro no está disponible');
    }
    this.disponible = false;
  }

  // Marca el libro como disponible
  
  devolver() {
    this.disponible = true;
  }

  // Verifica si el libro coincide con un término de búsqueda
  // @param {string} termino - Término de búsqueda
  // @returns {boolean} True si coincide
  
  coincideBusqueda(termino) {
    const terminoLower = termino.toLowerCase();
    return (
      this.titulo.toLowerCase().includes(terminoLower) ||
      this.autor.toLowerCase().includes(terminoLower) ||
      this.genero.toLowerCase().includes(terminoLower)
    );
  }

  // Convierte el libro a objeto plano
  // @returns {Object} Objeto con los datos del libro
  
  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      genero: this.genero,
      descripcion: this.descripcion,
      disponible: this.disponible,
      fechaAgregado: this.fechaAgregado
    };
  }

  // Crea un libro desde un objeto plano
  // @param {Object} data - Datos del libro
  // @returns {Libro} Instancia de Libro
  
  static fromJSON(data) {
    const libro = new Libro(data);
    libro.fechaAgregado = new Date(data.fechaAgregado);
    return libro;
  }
}
