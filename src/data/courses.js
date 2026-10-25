const makeLessons = (titles) =>
  titles.map((title, i) => ({
    id: `aula-${i + 1}`,
    title,
    minutes: [12, 18, 15, 22, 16, 25][i],
  }));

export const courses = [
  {
    id: "arduino",
    title: "Arduino: do zero ao primeiro projeto",
    category: "ELETRÔNICA",
    level: "Iniciante",
    hours: 6,
    art: "board",
    color: "mint",
    description:
      "Transforme curiosidade em circuitos. Conheça a placa Arduino, conecte componentes e programe seu primeiro projeto interativo.",
    outcome:
      "Ao final, você terá um semáforo inteligente com LEDs, botões e uma lógica criada por você.",
    materials: [
      "Arduino Uno ou simulador Tinkercad",
      "Protoboard e cabos jumper",
      "LEDs e resistores de 220 Ω",
      "Cabo USB para a placa",
    ],
    lessons: makeLessons([
      "Conhecendo a placa e o ambiente",
      "Seu primeiro LED piscando",
      "Entradas digitais e botões",
      "Leitura de sinais analógicos",
      "Construindo um semáforo",
      "Desafio: seu circuito interativo",
    ]),
  },
  {
    id: "sensores",
    title: "Sensores: dê sentidos ao seu robô",
    category: "SENSORES & DADOS",
    level: "Iniciante",
    hours: 4,
    art: "sensor",
    color: "lavender",
    description:
      "Descubra como medir distância, luz e temperatura. Aprenda a transformar leituras do mundo real em decisões para seus projetos.",
    outcome:
      "Construa um assistente de distância que avisa quando um objeto se aproxima.",
    materials: [
      "Arduino Uno ou simulador",
      "Sensor ultrassônico HC-SR04",
      "Sensor de luz LDR",
      "Buzzer e cabos jumper",
    ],
    lessons: makeLessons([
      "Como um sensor percebe o mundo",
      "Distância com ultrassom",
      "Medindo a luminosidade",
      "Temperatura e calibração",
      "Tratando leituras instáveis",
      "Desafio: assistente de distância",
    ]),
  },
  {
    id: "robot-movel",
    title: "Construa seu primeiro robô móvel",
    category: "ROBÓTICA NA PRÁTICA",
    level: "Intermediário",
    hours: 8,
    art: "rover",
    color: "peach",
    description:
      "Da montagem do chassi ao controle de movimento. Integre motores, sensores e programação em um robô que explora o ambiente.",
    outcome:
      "Monte um robô capaz de identificar obstáculos e escolher um novo caminho.",
    materials: [
      "Kit chassi com dois motores DC",
      "Driver de motores L298N",
      "Arduino e sensor ultrassônico",
      "Suporte de pilhas e cabos",
    ],
    lessons: makeLessons([
      "Planejamento e montagem do chassi",
      "Motores DC e ponte H",
      "Controlando velocidade e direção",
      "Integrando o sensor de distância",
      "Algoritmo de desvio de obstáculos",
      "Desafio: exploração autônoma",
    ]),
  },
  {
    id: "programacao",
    title: "Lógica de programação para inventores",
    category: "CÓDIGO & LÓGICA",
    level: "Iniciante",
    hours: 5,
    art: "code",
    color: "blue",
    description:
      "Aprenda a pensar em algoritmos usando exemplos de robótica. Explore variáveis, condições, repetições e funções, passo a passo.",
    outcome:
      "Desenvolva a lógica de controle de um dispositivo com diferentes modos de operação.",
    materials: [
      "Computador com navegador",
      "Simulador de Arduino",
      "Caderno para planejar os algoritmos",
    ],
    lessons: makeLessons([
      "Pensando em passos e algoritmos",
      "Variáveis e tipos de dados",
      "Decisões com condições",
      "Automatizando com repetições",
      "Organizando com funções",
      "Desafio: modos de operação",
    ]),
  },
  {
    id: "automacao",
    title: "Uma casa mais inteligente com IoT",
    category: "AUTOMAÇÃO & IOT",
    level: "Intermediário",
    hours: 7,
    art: "home",
    color: "mint",
    description:
      "Conecte dispositivos e crie automações úteis. Conheça os fundamentos de redes, telemetria e controle com ESP32.",
    outcome:
      "Planeje uma estação de monitoramento de ambiente com leituras de temperatura.",
    materials: [
      "Placa ESP32",
      "Sensor DHT22",
      "Protoboard e jumpers",
      "Rede Wi-Fi para os exercícios",
    ],
    lessons: makeLessons([
      "Introdução à Internet das Coisas",
      "Conhecendo o ESP32",
      "Conectando à rede Wi-Fi",
      "Coletando dados do ambiente",
      "Regras de automação",
      "Desafio: estação conectada",
    ]),
  },
  {
    id: "braco",
    title: "Braço robótico: movimento com precisão",
    category: "MECÂNICA & CONTROLE",
    level: "Avançado",
    hours: 10,
    art: "arm",
    color: "lavender",
    description:
      "Entenda articulações, servomotores e sequências de movimento. Desenvolva um controle gradual para manipular pequenos objetos.",
    outcome:
      "Programe uma sequência de coleta e posicionamento para um braço de três eixos.",
    materials: [
      "Estrutura de braço robótico",
      "Três servomotores",
      "Fonte compatível com os motores",
      "Arduino e potenciômetros",
    ],
    lessons: makeLessons([
      "Articulações e graus de liberdade",
      "Controlando servomotores",
      "Limites e calibração dos eixos",
      "Movimentos suaves e coordenados",
      "Sequências de coleta e posição",
      "Desafio: ciclo de manipulação",
    ]),
  },
  {
    id: "seguidor",
    title: "Robô seguidor de linha com PID",
    category: "ROBÓTICA NA PRÁTICA",
    level: "Avançado",
    hours: 9,
    art: "rover",
    color: "blue",
    description:
      "Combine sensores de refletância e controle PID para construir um robô que segue trajetórias com estabilidade.",
    outcome:
      "Ajuste um controlador para acompanhar curvas e recuperar a linha.",
    materials: [
      "Chassi com motores e driver",
      "Módulo de sensores infravermelhos",
      "Arduino e bateria",
      "Pista com fita escura",
    ],
    lessons: makeLessons([
      "Sensores de refletância",
      "Calibração e posição da linha",
      "Controle proporcional",
      "Termos integral e derivativo",
      "Ajustando o controlador",
      "Desafio: circuito completo",
    ]),
  },
  {
    id: "prototipagem",
    title: "Do esboço ao protótipo funcional",
    category: "PROJETO & CRIAÇÃO",
    level: "Intermediário",
    hours: 6,
    art: "board",
    color: "peach",
    description:
      "Organize uma ideia de robótica, escolha os componentes e construa um protótipo com etapas claras de validação.",
    outcome:
      "Documente um projeto próprio, com esquema de ligação e plano de testes.",
    materials: [
      "Papel ou ferramenta de desenho",
      "Simulador de circuitos",
      "Componentes do projeto escolhido",
    ],
    lessons: makeLessons([
      "Definindo o problema",
      "Desenhando a solução",
      "Escolha dos componentes",
      "Montagem e organização",
      "Testes e ajustes do protótipo",
      "Desafio: apresentação do projeto",
    ]),
  },
];

export const faqItems = [
  {
    id: "experiencia",
    title: "Preciso saber programar para começar?",
    content:
      "Não. Os cursos de nível iniciante começam pelos fundamentos. Uma boa sequência é estudar lógica de programação e depois seguir para Arduino e sensores.",
  },
  {
    id: "kit",
    title: "É necessário comprar um kit de robótica?",
    content:
      "Você pode começar com simuladores gratuitos, como o Tinkercad Circuits. Cada curso apresenta a lista de materiais para quem prefere realizar os projetos com componentes físicos.",
  },
  {
    id: "progresso",
    title: "Como meu progresso é salvo?",
    content:
      "Ao marcar uma aula como concluída, seu progresso fica salvo neste navegador e dispositivo. Ele permanece ao atualizar a página, mas não é sincronizado entre dispositivos e pode ser apagado ao limpar os dados do navegador.",
  },
  {
    id: "conteudo",
    title: "Como funcionam as aulas deste portal?",
    content:
      "Este é um portal demonstrativo para organização do aprendizado. O catálogo, as ementas e os materiais são exemplos; não há videoaulas, cobrança ou emissão de certificados.",
  },
];
