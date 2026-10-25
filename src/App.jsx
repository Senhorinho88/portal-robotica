import { useEffect, useMemo, useState } from "react";
import { courses, faqItems } from "./data/courses.js";
import { useLearning } from "./context/LearningContext.jsx";
import { paginate } from "./lib/progress.js";
import { selectCatalog } from "./lib/catalog.js";
import Accordion from "./components/Accordion.jsx";
import LearningPath from "./components/LearningPath.jsx";
import { learningPath } from "./data/learningPath.js";
import CourseCard from "./components/CourseCard.jsx";
import CourseDetails from "./components/CourseDetails.jsx";
import DropdownMenu from "./components/DropdownMenu.jsx";
import Icon from "./components/Icon.jsx";
import Pagination from "./components/Pagination.jsx";
import RobotArt from "./components/RobotArt.jsx";
import ToastRegion from "./components/ToastNotification.jsx";

const levelOptions = [
  "Todos os níveis",
  "Iniciante",
  "Intermediário",
  "Avançado",
].map((label, i) => ({ value: i === 0 ? "all" : label, label }));
const sortOptions = [
  { value: "recommended", label: "Recomendados" },
  { value: "duration", label: "Menor duração" },
  { value: "title", label: "Título (A–Z)" },
];
const PAGE_SIZE = 3;

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Órbita, início">
      <span className="brand-symbol" aria-hidden="true">
        <span />
      </span>
      <span>
        órbita<span className="brand-subtitle">ROBOTICS ACADEMY</span>
      </span>
    </a>
  );
}

export default function App() {
  const { progress } = useLearning();
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showMyCourses, setShowMyCourses] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 700px)").matches,
  );
  const [activeNav, setActiveNav] = useState("inicio");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    function updateLayout(event) {
      setIsMobile(event.matches);
      setMobileMenuOpen(false);
    }
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  const enrolledCourses = courses.filter((course) => progress[course.id]);
  const completedLessons = Object.values(progress).reduce(
    (total, course) => total + course.completedLessons.length,
    0,
  );
  const filteredCourses = useMemo(
    () =>
      selectCatalog(courses, {
        query,
        level,
        sort,
        enrolledOnly: showMyCourses,
        progress,
      }),
    [level, query, sort, showMyCourses, progress],
  );
  const pagination = paginate(filteredCourses, page, PAGE_SIZE);

  function navigate(section, mine = false) {
    setActiveNav(mine ? "aprendizado" : section);
    setMobileMenuOpen(false);
    if (section === "cursos") {
      setShowMyCourses(mine);
      setLevel("all");
      setSort("recommended");
      setQuery("");
      setPage(1);
    }
  }

  function selectCourse(course) {
    setSelectedCourse(course);
    window.requestAnimationFrame(() => {
      document.getElementById("detalhes")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      document.getElementById("detail-title")?.focus({ preventScroll: true });
    });
  }

  function changePage(next) {
    setPage(next);
    document.getElementById("catalog-title")?.focus({ preventScroll: true });
  }

  const navItems = [
    { id: "inicio", href: "#inicio", title: "Visão geral", icon: "grid" },
    { id: "cursos", href: "#cursos", title: "Explorar cursos", icon: "book" },
    {
      id: "aprendizado",
      href: "#cursos",
      title: "Meu aprendizado",
      icon: "chart",
      mine: true,
    },
    {
      id: "trilha",
      href: "#trilha",
      title: "Trilha recomendada",
      icon: "flag",
    },
    { id: "ajuda", href: "#ajuda", title: "Central de ajuda", icon: "help" },
  ];

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="mobile-header">
        <Brand />
        <button
          id="mobile-menu-toggle"
          className="icon-button"
          aria-label={mobileMenuOpen ? "Fechar navegação" : "Abrir navegação"}
          aria-controls="sidebar-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "close" : "menu"} />
        </button>
      </header>
      <aside
        className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}
        id="sidebar-navigation"
        aria-hidden={isMobile && !mobileMenuOpen ? true : undefined}
        inert={isMobile && !mobileMenuOpen}
      >
        <Brand />
        <p className="nav-caption">SEU ESPAÇO DE CRIAÇÃO</p>
        <nav aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              href={item.href}
              key={item.id}
              onClick={() =>
                navigate(
                  item.id === "aprendizado" ? "cursos" : item.id,
                  item.mine,
                )
              }
              aria-current={activeNav === item.id ? "location" : undefined}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.title}</span>
              {item.mine && enrolledCourses.length > 0 && (
                <span className="nav-count">{enrolledCourses.length}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="maker-note">
            <span className="maker-icon">
              <Icon name="bolt" size={20} />
            </span>
            <h3>
              Ideias ganham vida
              <br />
              quando você começa.
            </h3>
            <p>Seu próximo projeto pode mudar o jeito de ver o mundo.</p>
            <a href="#cursos" onClick={() => navigate("cursos")}>
              Encontre seu curso
              <Icon name="arrow" size={16} />
            </a>
          </div>
          <div className="student">
            <span className="avatar">AL</span>
            <div>
              <strong>Área do aluno</strong>
              <span>Uma descoberta por vez</span>
            </div>
            <span className="online-dot" aria-label="Progresso local" />
          </div>
        </div>
      </aside>
      {mobileMenuOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main id="conteudo" inert={isMobile && mobileMenuOpen}>
        <div className="workspace-top">
          <span>
            <span className="status-dot" /> APRENDER É EXPERIMENTAR
          </span>
          <span className="top-label">
            Sua bancada digital <Icon name="code" size={17} />
          </span>
        </div>
        <section
          className="welcome"
          id="inicio"
          aria-labelledby="welcome-title"
        >
          <div>
            <p className="eyebrow">CURIOSIDADE É SÓ O COMEÇO</p>
            <h1 id="welcome-title">
              Olá, inventor<span>.</span>
            </h1>
            <p>
              Um novo circuito. Uma nova ideia. Seu próximo passo começa aqui.
            </p>
          </div>
          <a
            href="#cursos"
            className="welcome-link"
            onClick={() => navigate("cursos")}
          >
            Vamos construir
            <Icon name="arrow" size={18} />
          </a>
        </section>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="hero-tag">
              <span /> DA IDEIA À PRÁTICA
            </span>
            <h2 id="hero-title">
              Pequenas peças.
              <br />
              <span>Grandes possibilidades.</span>
            </h2>
            <p>
              Descubra a robótica com projetos que conectam
              <br className="desktop-break" /> programação, eletrônica e a sua
              imaginação.
            </p>
            <a
              href="#cursos"
              className="button lime"
              onClick={() => navigate("cursos")}
            >
              Explorar os cursos
              <Icon name="arrow" size={18} />
            </a>
            <div className="hero-footer">
              <span className="hero-footer-mark">↗</span>
              <span>Menos teoria solta. Mais mão na massa.</span>
            </div>
          </div>
          <div className="hero-visual">
            <span className="visual-coordinate coordinate-top">
              FIG. 01 — MOVIMENTO EM CONSTRUÇÃO
            </span>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <RobotArt variant="arm" hero />
            <span className="visual-coordinate coordinate-bottom">
              X: 124 <span>Y: 086</span> Z: ∞
            </span>
            <span className="visual-chip">
              <span /> SISTEMA CRIATIVO ATIVO
            </span>
          </div>
        </section>

        <section className="stats" aria-label="Resumo do aprendizado">
          <div className="stat">
            <span className="stat-icon mint">
              <Icon name="book" size={21} />
            </span>
            <div>
              <strong>{String(courses.length).padStart(2, "0")}</strong>
              <span>Cursos para explorar</span>
            </div>
            <span className="stat-caption">DO ZERO AO AVANÇADO</span>
          </div>
          <div className="stat">
            <span className="stat-icon lavender">
              <Icon name="bolt" size={21} />
            </span>
            <div>
              <strong>{String(enrolledCourses.length).padStart(2, "0")}</strong>
              <span>Cursos no seu aprendizado</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon peach">
              <Icon name="check" size={21} />
            </span>
            <div>
              <strong>{String(completedLessons).padStart(2, "0")}</strong>
              <span>Aulas concluídas</span>
            </div>
          </div>
        </section>

        <LearningPath
          steps={learningPath}
          courses={courses}
          progress={progress}
          onSelect={selectCourse}
        />

        <section
          className="catalog"
          id="cursos"
          aria-labelledby="catalog-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONHECIMENTO QUE VIRA PROJETO</p>
              <h2 id="catalog-title" tabIndex={-1}>
                {showMyCourses
                  ? "Meu aprendizado"
                  : "Encontre sua próxima descoberta"}
                <span className="count-pill">{filteredCourses.length}</span>
              </h2>
            </div>
            <span className="section-aside">Seu ritmo. Seu próximo nível.</span>
          </div>
          <div className="catalog-toolbar">
            <div
              className="catalog-mode"
              role="group"
              aria-label="Exibir cursos"
            >
              <button
                className={!showMyCourses ? "selected" : ""}
                aria-pressed={!showMyCourses}
                onClick={() => {
                  setShowMyCourses(false);
                  setPage(1);
                }}
              >
                Todos os cursos
              </button>
              <button
                className={showMyCourses ? "selected" : ""}
                aria-pressed={showMyCourses}
                onClick={() => {
                  setShowMyCourses(true);
                  setPage(1);
                }}
              >
                Meus cursos
              </button>
            </div>
            <div className="catalog-filters">
              <label className="search-field">
                <Icon name="search" size={17} />
                <span className="sr-only">Buscar cursos</span>
                <input
                  type="search"
                  placeholder="O que você quer criar?"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                />
              </label>
              <DropdownMenu
                label="Ordenar cursos"
                options={sortOptions}
                value={sort}
                onChange={(value) => {
                  setSort(value);
                  setPage(1);
                }}
              />
              <DropdownMenu
                label="Filtrar por nível"
                options={levelOptions}
                value={level}
                onChange={(value) => {
                  setLevel(value);
                  setPage(1);
                }}
              />
            </div>
          </div>
          <p className="sr-only" role="status">
            {filteredCourses.length} cursos encontrados. Página{" "}
            {pagination.currentPage} de {pagination.totalPages}.
          </p>
          {filteredCourses.length > 0 ? (
            <>
              <div className="course-grid">
                {pagination.items.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={selectCourse}
                  />
                ))}
              </div>
              <div className="catalog-bottom">
                <span>
                  Mostrando {(pagination.currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(
                    pagination.currentPage * PAGE_SIZE,
                    filteredCourses.length,
                  )}{" "}
                  de {filteredCourses.length} cursos
                </span>
                <Pagination
                  totalPages={pagination.totalPages}
                  currentPage={pagination.currentPage}
                  onPageChange={changePage}
                />
              </div>
            </>
          ) : (
            <div className="empty-state">
              <span className="stat-icon mint">
                <Icon name="search" size={24} />
              </span>
              <h3>
                {showMyCourses && enrolledCourses.length === 0
                  ? "Sua primeira descoberta espera por você"
                  : "Ainda não encontramos esse curso"}
              </h3>
              <p>
                {showMyCourses && enrolledCourses.length === 0
                  ? "Explore o catálogo e clique em “Começar curso” para iniciar seu aprendizado."
                  : "Experimente outra palavra ou remova os filtros para explorar mais possibilidades."}
              </p>
              <button
                className="button dark"
                onClick={() => {
                  setShowMyCourses(false);
                  setQuery("");
                  setLevel("all");
                  setPage(1);
                }}
              >
                Explorar todos os cursos
                <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
        </section>

        <CourseDetails course={selectedCourse} />

        <section
          className="help-section"
          id="ajuda"
          aria-labelledby="help-title"
        >
          <div className="help-copy">
            <p className="eyebrow">PODE PERGUNTAR</p>
            <h2 id="help-title">
              Toda descoberta
              <br />
              começa com uma dúvida.
            </h2>
            <p>
              Algumas respostas para você dar
              <br className="desktop-break" /> o primeiro passo com confiança.
            </p>
            <span className="help-decoration" aria-hidden="true">
              ?
            </span>
          </div>
          <Accordion items={faqItems} />
        </section>
        <footer className="site-footer">
          <span>
            Órbita <span className="footer-slash">/</span> Feito para quem gosta
            de construir.
          </span>
          <span>Portal demonstrativo de robótica · 2026</span>
        </footer>
      </main>
      <ToastRegion />
    </>
  );
}
