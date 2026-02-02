// ===================================
// CONTROLADOR: LIBROS
// ===================================


  // Controlador para gestionar las operaciones de libros
 
export class LibroController {
  constructor(bibliotecaService, libroView) {
    this.bibliotecaService = bibliotecaService;
    this.libroView = libroView;
  }

  // Inicializa el controlador
  inicializar() {
    this.libroView.onAgregarLibro((datosLibro) => this.agregarLibro(datosLibro));
    this.libroView.onEliminarLibro((id) => this.eliminarLibro(id));
    this.libroView.onBuscar((termino, genero, disponibilidad) => 
      this.buscarLibros(termino, genero, disponibilidad)
    );
    
    // Renderizar libros iniciales
    this.mostrarLibros();
  }

  // Muestra todos los libros
  mostrarLibros() {
    const libros = this.bibliotecaService.libros;
    this.libroView.renderizar(libros);
  }

  // Busca y muestra libros filtrados
  // @param {string} termino - Término de búsqueda
  // @param {string} genero - Género a filtrar
  // @param {string} disponibilidad - Disponibilidad a filtrar
 
  buscarLibros(termino, genero, disponibilidad) {
    const libros = this.bibliotecaService.buscarLibros(termino, genero, disponibilidad);
    this.libroView.renderizar(libros);
  }

  // Agrega un nuevo libro
  // @param {Object} datosLibro - Datos del libro
  
  async agregarLibro(datosLibro) {
    try {
      const libro = this.bibliotecaService.agregarLibro(datosLibro);
      
      this.bibliotecaService.notificacionService.success(
        'Libro Agregado',
        `El libro "${libro.titulo}" ha sido agregado exitosamente.`
      );

      this.libroView.cerrarModal();
      this.libroView.limpiarFormulario();
      this.mostrarLibros();
    } catch (error) {
      this.bibliotecaService.notificacionService.error(
        'Error',
        'No se pudo agregar el libro.'
      );
    }
  }

  // Elimina un libro
  // @param {string} id - ID del libro
  
  eliminarLibro(id) {
    const libro = this.bibliotecaService.buscarLibroPorId(id);
    
    if (!libro) return;

    if (!libro.disponible) {
      this.bibliotecaService.notificacionService.warning(
        'No se puede eliminar',
        'El libro está actualmente prestado.'
      );
      return;
    }

    if (confirm(`¿Estás seguro de eliminar "${libro.titulo}"?`)) {
      this.bibliotecaService.eliminarLibro(id);
      
      this.bibliotecaService.notificacionService.success(
        'Libro Eliminado',
        `El libro "${libro.titulo}" ha sido eliminado.`
      );
      
      this.mostrarLibros();
    }
  }
}
