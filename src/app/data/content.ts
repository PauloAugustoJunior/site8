export type IconName = 'web' | 'code' | 'spark' | 'connect' | 'chart' | 'data' | 'compass' | 'check' | 'plus' | 'download' | 'copy' | 'menu' | 'close';
export interface Service {
  readonly id: string;
  readonly title: string;
  readonly short: string;
  readonly icon: IconName;
  readonly headline: string;
  readonly description: string;
  readonly deliverables: readonly string[];
  readonly example: string;
}
export const SERVICES: readonly Service[] = [
  { id: 'digital', title: 'Presença digital', short: 'Sua empresa mais acessível', icon: 'web', headline: 'Uma boa experiência começa no primeiro acesso.', description: 'Transforme sua presença na internet em um ponto de encontro claro, rápido e útil para seus clientes.', deliverables: ['Sites e landing pages', 'Portais e e-commerce', 'Aplicações web responsivas'], example: 'Um profissional liberal apresenta seus serviços e organiza pedidos de atendimento em um portal.' },
  { id: 'software', title: 'Software sob medida', short: 'Ferramentas que cabem no seu negócio', icon: 'code', headline: 'Seu processo merece um sistema que faça sentido.', description: 'Desenvolvemos e modernizamos ferramentas para reunir tarefas, reduzir retrabalho e apoiar a operação.', deliverables: ['Sistemas e plataformas personalizados', 'Aplicativos mobile', 'Modernização de aplicações e APIs'], example: 'Uma empresa reúne pedidos, estoque e acompanhamento da equipe em uma aplicação própria.' },
  { id: 'ia', title: 'Inteligência artificial', short: 'Mais capacidade para a sua equipe', icon: 'spark', headline: 'IA aplicada a uma tarefa de verdade.', description: 'Agentes, assistentes e chatbots para apoiar atendimento, encontrar informações e simplificar atividades, com limites e revisão definidos no projeto.', deliverables: ['Assistentes e chatbots', 'Agentes conectados aos seus processos', 'Busca e análise de documentos'], example: 'Um assistente consulta uma base de conhecimento para apoiar a equipe nas dúvidas recorrentes.' },
  { id: 'automation', title: 'Automações e integrações', short: 'Menos tarefas entre uma ferramenta e outra', icon: 'connect', headline: 'Deixe a informação seguir seu caminho.', description: 'Conectamos sistemas e automatizamos etapas repetitivas para que sua equipe se concentre nas decisões e no atendimento.', deliverables: ['Integrações via APIs', 'Fluxos com WhatsApp e ferramentas empresariais', 'Automação de rotinas operacionais'], example: 'Um novo pedido no site atualiza o sistema de gestão e inicia o acompanhamento da equipe.' },
  { id: 'analytics', title: 'Dados e analytics', short: 'Clareza para decidir', icon: 'chart', headline: 'Enxergue o que está acontecendo no seu negócio.', description: 'Organizamos indicadores em dashboards e análises que ajudam a entender a operação e a acompanhar prioridades.', deliverables: ['Dashboards e Business Intelligence', 'Análise de dados e indicadores', 'Visões por área e objetivo'], example: 'Uma gestão acompanha vendas, despesas e etapas de atendimento em uma visão compartilhada.' },
  { id: 'engineering', title: 'Engenharia e ciência de dados', short: 'Uma base para ir além', icon: 'data', headline: 'Dados preparados para novas possibilidades.', description: 'Estruturamos a coleta, a organização e o uso dos seus dados, desde a integração de fontes até modelos analíticos e preditivos.', deliverables: ['Pipelines e ETL/ELT', 'Modelagem e integração de fontes', 'Predição e machine learning'], example: 'Dados de diferentes sistemas formam uma base consistente para análises e previsão de demanda.' },
  { id: 'consulting', title: 'Consultoria em tecnologia', short: 'Um caminho antes do investimento', icon: 'compass', headline: 'Escolha o próximo passo com mais clareza.', description: 'Avaliamos o cenário, as necessidades e as possibilidades técnicas para desenhar uma evolução viável para sua empresa.', deliverables: ['Diagnóstico e prioridades', 'Arquitetura de soluções', 'Planejamento de transformação digital'], example: 'Um negócio mapeia seus gargalos e define quais integrações, sistemas ou dados devem ser priorizados.' },
];
export interface JourneyStage { readonly id: string; readonly title: string; readonly text: string; readonly link: string; }
export const JOURNEY: readonly JourneyStage[] = [
  { id: 'presenca', title: 'Estar presente', text: 'Um site ou portal abre uma porta para seus clientes encontrarem, conhecerem e acessarem seu negócio.', link: 'digital' },
  { id: 'conectar', title: 'Conectar a operação', text: 'Automações e integrações ajudam as informações a circular e reduzem etapas manuais entre suas ferramentas.', link: 'automation' },
  { id: 'entender', title: 'Entender os dados', text: 'Bases organizadas e dashboards tornam a operação mais visível e ajudam a escolher prioridades.', link: 'analytics' },
  { id: 'ampliar', title: 'Ampliar possibilidades', text: 'IA e sistemas personalizados podem apoiar novos processos quando houver uma necessidade e uma base adequadas.', link: 'ia' },
];
export const FAQS = [
  { question: 'Preciso contratar todas as soluções?', answer: 'Não. Cada serviço pode ser contratado separadamente. Podemos começar por um site, uma integração, um dashboard ou outra necessidade e conectar novas soluções quando fizer sentido.' },
  { question: 'A Nexo atende empresas pequenas e profissionais liberais?', answer: 'Sim. Desenvolvemos soluções sob demanda para pequenas e médias empresas e profissionais liberais, de diferentes áreas, com atendimento remoto em todo o Brasil.' },
  { question: 'Já tenho sistemas. É preciso trocar tudo?', answer: 'A avaliação começa pelo que você já usa. Integrações, automações e modernização podem aproveitar ferramentas existentes. A recomendação depende do cenário e das limitações técnicas identificadas.' },
  { question: 'Como são definidos prazo e investimento?', answer: 'A partir dos objetivos, do escopo, das integrações e da complexidade. Esses pontos são combinados em uma proposta específica antes do desenvolvimento.' },
  { question: 'Como preparo um pedido de orçamento?', answer: 'Use o criador de briefing desta página. Ele organiza sua necessidade em um arquivo de texto para compartilhar quando um canal oficial da Nexo estiver disponível. Nenhuma informação é enviada pelo site.' },
] as const;
