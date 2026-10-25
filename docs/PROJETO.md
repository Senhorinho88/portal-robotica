# Órbita: proposta e evolução do portal

## Ideia central

Um espaço para organizar o primeiro contato com a robótica: descobrir o que estudar, escolher um curso e acompanhar pequenas etapas de aprendizado. O público é formado por estudantes e pessoas curiosas sobre programação, eletrônica e construção de robôs.

O percurso sugerido parte de lógica de programação, passa por Arduino e sensores e chega à construção de um robô móvel. Cursos de IoT, controle e prototipagem permitem aprofundar esse caminho.

## Jornada do aluno

1. Entender a proposta na visão geral.
2. Escolher um ponto de partida na trilha recomendada.
3. Pesquisar, filtrar e ordenar o catálogo.
4. Ler a ementa, conferir os materiais e começar um curso.
5. Concluir ou reabrir aulas e retomar a próxima etapa.
6. Acompanhar o progresso e consultar as dúvidas frequentes.

## Componentes da atividade

| Requisito           | Aplicação no portal                                  |
| ------------------- | ---------------------------------------------------- |
| Acordeão            | Perguntas frequentes, com apenas uma resposta aberta |
| Paginação           | Lista de cursos em páginas de três itens             |
| Barra de progresso  | Percentual de aulas concluídas                       |
| Abas                | Sobre o curso, Aulas e Materiais                     |
| Menu suspenso       | Seleção de filtros e ordenação                       |
| Toast               | Feedback ao iniciar cursos e atualizar aulas         |
| Estado global extra | Context API compartilhando progresso e notificações  |

## Entregas incrementais

Cada etapa é registrada com uma alteração concreta e uma mensagem de commit correspondente. Os commits da implementação inicial permanecem no histórico.

1. **Proposta:** documentar o objetivo, a jornada e os limites do portal.
2. **Trilha:** orientar o estudo em três etapas com acesso aos cursos.
3. **Catálogo:** permitir ordenação por recomendação, duração e título.
4. **Continuidade:** destacar a próxima aula dos cursos iniciados.
5. **Materiais:** disponibilizar um checklist de preparação para download.
6. **Persistência:** avisar quando o navegador só puder manter o progresso na sessão.

## Escopo e decisões

Os cursos e suas ementas são demonstrativos. O portal não entrega videoaulas, certificados, pagamentos ou contas de acesso. O progresso é local ao navegador. A interface deve oferecer feedback claro, funcionar com teclado e se reorganizar em celular, tablet e desktop.

As regras de negócio ficam em funções independentes para permitir testes. Os componentes recebem dados e callbacks por props, mantendo estados de interface próximos de onde são utilizados. O contexto fica responsável pelos dados que precisam ser compartilhados.
