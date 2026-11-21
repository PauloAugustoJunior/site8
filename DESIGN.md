# Nexo — conexões que fazem avançar

## Referência investigada

Referência única: [RedRex](https://redrex.tech/), inspecionada em 21/11/2026 por ferramenta web e leitura do HTML, CSS e bundle JavaScript públicos. A resposta web não expôs linhas de conteúdo porque a página é uma SPA. A leitura direta de assets foi bem-sucedida; não houve captura de tela, comparação visual ou cópia de código.

Observações verificadas no código público da referência:

- Fundo HSL 0 0% 3%, superfícies 8% e 12%, vermelho HSL 0 78% 55%, bordas 14% e texto claro 95%.
- Inter no corpo e Space Grotesk no display, com pesos de 300 a 900 no carregamento de fontes.
- Navegação fixa, translúcida, com menu de soluções, links para cases/sobre e ação de diagnóstico. Menu móvel condicionado ao estado.
- Hero centralizado, título grande com quebra de linha, trecho com gradiente animado, texto de apoio e ações. A página também inclui um banner de evento.
- Seções de soluções, aplicações/cases, abordagem comercial, FAQ e chamadas para diagnóstico. Outras páginas detalham dados, IA e produto.
- Utilitários de cards, gradientes, brilho, aurora/shimmer, transições e expansão de conteúdo.

Essas observações vêm da estrutura e dos estilos inspecionados. A renderização real e todas as interações da referência não foram verificadas em navegador nesta execução. Não foram reaproveitados textos, marcas, casos, dados, imagens ou composição.

## Conceito implementado

A Nexo mostra como tarefas dispersas podem se tornar um fluxo de trabalho claro. A assinatura é uma sequência empresarial ilustrativa: solicitação no site, organização por automação, contexto de dados + IA e revisão humana. As etapas deslocadas criam um caminho geométrico próprio, em vez de um diagrama abstrato.

O público avalia soluções durante o trabalho, em telas de diferentes tamanhos e ambientes com luz. Campos claros favorecem a leitura; o carvão concentra atenção na demonstração inicial e na jornada. Coral conduz os pontos do fluxo e as ações; vermelho mais escuro oferece contraste em texto e foco sobre superfícies claras.

## Tokens reais

| Papel | Token | Valor |
|---|---|---|
| Fundo mineral | `--paper` | `#f6f7f5` |
| Superfície | `--white` | `#ffffff` |
| Texto e carvão | `--ink`, `--coal` | `#25282a` |
| Texto secundário claro | `--muted` | `#5c6264` |
| Texto secundário sobre carvão | `--on-coal-muted` | `#c6c8c8` |
| Texto/ação/foco vermelho | `--red` | `#b82e23` |
| Acento sobre carvão | `--coral` | `#ff8975` |
| Campo de briefing | `--coral-light` | `#f5e9e3` |
| Divisores | `--line` | `#d7dcda` |

Principais pares calculados pela fórmula WCAG: texto carvão/fundo mineral 13,80:1; secundário/fundo mineral 5,77:1; vermelho/branco 6,08:1; vermelho/campo coral claro 5,11:1; carvão/coral 6,42:1; texto secundário/carvão 8,83:1.

## Tipografia e recursos

Sora variável, arquivo local de 111.400 bytes em `public/fonts/sora-variable.ttf`, com licença SIL Open Font License 1.1 preservada em `public/fonts/OFL-Sora.txt`. Fonte original distribuída pelo repositório Google Fonts, sem alteração. Pesos 400–600, display máximo 4,5rem, tracking mínimo -0,04em, títulos equilibrados. Todos os recursos essenciais são locais. Ícones SVG e marca geométrica são autorais; não há imagens raster ou fotografias.

## Composição e comportamento

- Header claro fixado por sticky, com marca original e navegação móvel acionada por botão.
- Hero carvão com oferta legível, ação de planejamento e fluxo ilustrativo concreto.
- Introdução da proposta de valor em duas colunas.
- Explorador de sete serviços: botões com `aria-pressed`, detalhe anunciado e inclusão da escolha no briefing.
- Aplicações com um fluxo em destaque e duas situações complementares, todas ilustrativas.
- Jornada flexível: quatro entradas exploráveis, sem impor ordem de contratação.
- Apresentação da empresa, princípios, processo sequencial de quatro etapas e FAQ nativo.
- Briefing local validado, com preview, download TXT e cópia com orientação de recuperação.
- Footer com navegação útil e contexto de atendimento.

Não há rolagem automática ou efeitos contínuos. Transições discretas respondem a ações. `prefers-reduced-motion` remove transições e rolagem suave. O desenho se reorganiza em 1.000, 760 e 380px; os grids usam colunas flexíveis e a navegação abre abaixo de 1.000px. O menu fecha ao navegar e com Escape, devolvendo foco ao botão no segundo caso.

## Revisão de entrega

Revisão da implementação e dos testes: requisitos comerciais cobertos, sem métricas, clientes ou contatos inventados; um h1; link de pular conteúdo; labels e feedback acessíveis; destinos internos verificados; dados de demonstração identificados. Estilos divididos por responsabilidade para manter os budgets originais. QA de navegador sem screenshots executado pelo coordenador: zero overflow em 320, 390, 768, 1024 e 1440px; zero violações axe em desktop, mobile, menu aberto e FAQ expandido; menu e FAQ operados por teclado; nenhum erro JavaScript ou requisição falha. O transbordamento inicial em aplicações foi corrigido com colunas minmax, min-width:0 e escala de título. Nenhuma verificação por screenshot foi executada.
