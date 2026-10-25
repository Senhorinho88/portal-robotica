# Órbita — Portal de cursos de robótica

Aplicação responsiva em React para explorar cursos de robótica, consultar ementas e materiais e acompanhar aulas concluídas. O catálogo possui oito cursos fictícios de eletrônica, programação, sensores, automação e controle.

## Executar no GitHub Codespaces

Na página do repositório, abra **Code → Codespaces** e selecione o ambiente. No terminal:

```bash
npm install
npm run dev
```

Abra a porta **5173** na aba **Portas**. Mantenha a visibilidade privada. O servidor usa `0.0.0.0` para funcionar com o encaminhamento do Codespaces.

Requisito: Node.js 22.12 ou superior; o ambiente utilizado é Node.js 24.

```bash
npm test         # Testes de progresso, armazenamento e paginação
npm run build   # Versão de produção em dist/
npm run preview # Conferência da versão de produção
```

Com o arquivo `package-lock.json` disponível, utilize `npm ci` para instalar exatamente as versões registradas.

Consulte a [proposta, a jornada do aluno e as entregas incrementais](docs/PROJETO.md).

## Funcionalidades

- Busca por título, categoria ou nível, com tratamento de acentos.
- Filtro de nível com menu suspenso e navegação por teclado.
- Catálogo paginado, com três cursos por página.
- Abas de descrição, aulas e materiais de cada curso.
- Inscrição local e marcação de aulas concluídas, com possibilidade de reabertura.
- Barra de progresso sincronizada com as aulas e os indicadores do painel.
- Lista de cursos iniciados em **Meu aprendizado**.
- Perguntas frequentes em acordeão e notificações temporárias.
- Persistência no navegador e recuperação de dados inválidos.

## Organização

```text
src/
  App.jsx                       # Página principal e filtros do catálogo
  components/
    Accordion.jsx               # FAQ: um item aberto por vez
    Pagination.jsx              # Anterior, próxima e páginas específicas
    ProgressBar.jsx             # Valor de 0 a 100 recebido por props
    Tabs.jsx                    # Aba ativa, painéis e controle por teclado
    DropdownMenu.jsx            # Opções, seleção e fechamento externo
    ToastNotification.jsx       # Feedback com fechamento manual e temporizado
    CourseCard.jsx              # Resumo de cada curso
    CourseDetails.jsx           # Ementa, aulas, materiais e progresso
    Icon.jsx                    # Ícones SVG
    RobotArt.jsx                # Ilustrações SVG dos projetos
  context/LearningContext.jsx   # Estado compartilhado de aprendizado e feedback
  data/courses.js               # Cursos, aulas, materiais e perguntas
  lib/progress.js               # Regras de progresso e paginação
  main.jsx                      # Entrada da aplicação e provider
  styles.css                    # Layout, estados e regras responsivas
tests/learning.test.js          # Testes das regras de negócio
```

## Componentes e conceitos React

| Componente        | Dados recebidos por props        | Estado e comportamento                                              |
| ----------------- | -------------------------------- | ------------------------------------------------------------------- |
| Accordion         | Itens com título e conteúdo      | `useState` controla o item aberto; transição em CSS                 |
| Pagination        | Total, página atual e callback   | Estado controlado pelo `App`; botões desabilitados nos limites      |
| ProgressBar       | Valor e rótulo                   | Preenchimento derivado de um valor entre 0 e 100                    |
| Tabs              | Títulos e conteúdo dos painéis   | `useState` controla a aba; setas, Home e End movem o foco           |
| DropdownMenu      | Opções, valor, rótulo e callback | `useState` controla a abertura; `useEffect` trata clique externo    |
| ToastNotification | Mensagem, tipo, ID e callback    | `useEffect` controla cinco segundos de exibição; pausa ao interagir |

**Context API:** o `LearningProvider` compartilha o progresso entre o painel, os cartões e os detalhes do curso. Também conecta as ações às notificações, sem repassar essas informações por todos os componentes intermediários. Esse é o recurso de estado global do desafio extra.

As alterações de estado usam atualizações imutáveis. Os efeitos de temporizador e de eventos removem seus recursos ao desmontar o componente. A entrada e saída de dados do armazenamento são protegidas contra JSON inválido e indisponibilidade.

## Conferência manual

1. Busque “arduino”, troque o nível e limpe a busca. Experimente uma busca sem resultados.
2. Navegue pelas três páginas e confira os limites dos botões Anterior e Próxima.
3. Explore um curso e abra as abas Sobre, Aulas e Materiais.
4. Clique em Começar curso e marque uma aula na aba Aulas. Confira o progresso, o painel e o toast.
5. Reabra uma aula e conclua todas as aulas para verificar o estado de conclusão do curso.
6. Atualize a página e confira se os dados persistiram. Abra Meu aprendizado.
7. Abra e feche o FAQ. No menu de níveis, selecione uma opção, clique fora e use Escape.
8. Navegue com Tab, Shift+Tab, setas, Home, End, Enter e Espaço onde aplicável.
9. Confira o layout em celular, tablet e desktop, incluindo o menu móvel e textos longos.

## Escopo

Portal demonstrativo, sem backend, autenticação, pagamentos, videoaulas ou certificação. Os materiais são listas de referência e o Tinkercad é um recurso externo. O progresso usa a chave `orbita-progress-v1` no `localStorage`: pertence ao navegador e dispositivo atual e pode ser removido ao limpar os dados locais. Não há coleta de nome, e-mail ou outros dados de cadastro.

React e React DOM são as dependências de execução; Vite e seu plugin React são ferramentas de desenvolvimento. Os ícones e as ilustrações são SVGs do próprio projeto. A tipografia utiliza DM Sans e Manrope via Google Fonts, com fontes locais de reserva.
