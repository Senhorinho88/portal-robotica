import Icon from "./Icon.jsx";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <nav className="pagination" aria-label="Páginas dos cursos">
      <button
        className="page-direction"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        <Icon className="rotate-180" name="arrow" size={16} />
        <span>Anterior</span>
      </button>
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="page-direction"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Próxima página"
      >
        <span>Próxima</span>
        <Icon name="arrow" size={16} />
      </button>
    </nav>
  );
}
