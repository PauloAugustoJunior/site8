# Nexo — site8

Site institucional da Nexo em Angular 22, com conteúdo original em pt-BR. Apresenta presença digital, software personalizado, IA, automações e integrações, analytics, engenharia/ciência de dados e consultoria. Cada solução pode ser contratada isoladamente e conectada às demais.

## Executar localmente

Ambiente preparado: Node 24.22.3, npm 12.0.2, Angular/CLI 22.3.0 e TypeScript 6.0.3. Dependências já instaladas por `npm ci`.

```bash
export PATH=/home/codex/.local/bin:$PATH
npm start
```

A aplicação abre em `http://localhost:4208`. O script usa `ng serve --port 4208`.

```bash
npm run build -- --configuration production
npm test -- --watch=false
```

Saída estática: `dist/site8/browser`. Não há SSR nem backend. O Router carrega a página principal sob demanda, mantém o título e redireciona rotas desconhecidas à página inicial. Navegação comercial usa âncoras na página.

## Conceito visual e referência

«Conexões que fazem avançar»: carvão, coral/vermelho autoral e campos claros, com Sora local. O hero demonstra uma solicitação organizada por automação, enriquecida com dados e IA e revisada pela equipe. O fluxo é ilustrativo e não representa resultado comercial real.

A referência única [redrex.tech](https://redrex.tech/) foi investigada por ferramenta web e leitura de HTML/CSS/bundle público em 21/11/2026. Foram observados fundo quase preto, acento vermelho, Inter + Space Grotesk, navegação fixa com soluções, hero centralizado com gradiente, seções de soluções/cases e CTA de diagnóstico. A resposta de texto da ferramenta web não expôs conteúdo legível por se tratar de SPA. A leitura dos assets confirmou a estrutura e os tokens, mas não equivale à verificação da renderização em navegador. Não houve screenshots, cópia de código, marca, conteúdo, dados ou imagens. Detalhes e tokens implementados estão em [DESIGN.md](DESIGN.md).

## Arquitetura e arquivos

- `src/app/app.routes.ts`: rota principal lazy e título.
- `src/app/home.*`: composição da página e seleção destinada ao briefing.
- `src/app/components/`: header, hero, explorador de serviços, aplicações, jornada, briefing e ícones.
- `src/app/data/content.ts`: serviços, jornada, FAQ e tipos.
- `src/app/data/site.config.ts`: configuração tipada de contatos.
- `src/styles.scss`: tokens, fonte local, componentes globais, foco e redução de movimento.
- `src/index.html`: idioma, título, description e Open Graph.
- `public/favicon.svg`: favicon autoral.
- `public/fonts/`: Sora variável e licença SIL OFL preservada.
- `src/app/app.spec.ts`: testes de navegação e interações.

Componentes standalone padrão do Angular 22, signals/input/output, controle de fluxo nativo, Signal Forms tipado e SCSS. Nenhuma dependência adicionada.

## Contatos e briefing

Não foram fornecidos contatos reais. `CONTACT_CONFIG` centraliza `email`, `phone`, `whatsapp` e `schedulingUrl` como `null` e `status: 'pending'`. Não há email, telefone, endereço, WhatsApp ou agenda inventados.

O CTA abre um criador de briefing local. Ele exige identificação da atividade e descrição da necessidade, normaliza espaços, reúne a solução escolhida, ferramentas e prazo, e permite baixar TXT ou copiar o texto. Falha de permissão da área de transferência mostra instrução para copiar manualmente. Editar os campos invalida o documento anterior. Nenhum dado é enviado, persistido ou tratado por um servidor. Ao recarregar, o conteúdo é perdido.

Quando os canais oficiais forem fornecidos, preencher a configuração e implementar os respectivos links/fluxos comerciais; alterar apenas `status` não cria automaticamente um canal de envio. Até lá, o visitante é orientado a guardar o documento e compartilhá-lo quando houver canal oficial. O formulário não simula envio ou confirmação de atendimento.

## Acessibilidade e limites

Estrutura semântica, um h1, skip link, foco visível, menu móvel com `aria-expanded`/`aria-controls`, fechamento por navegação e Escape, controles por teclado, feedback anunciado, contraste calculado dos tokens, responsividade planejada desde 320px e redução de movimento. Exemplos são identificados como ilustração. Não existem métricas, depoimentos ou clientes fictícios.

Sem domínio conhecido, não foi inventada URL canônica ou de Open Graph. Não há imagem OG proprietária nem serviços externos. Não há dependência de fontes externas durante o uso.

O briefing exclui screenshots e regressão visual. O coordenador executou QA de navegador sem screenshots: zero overflow em 320/390/768/1024/1440px, zero violações axe em desktop/mobile/menu aberto/FAQ expandido, menu e FAQ por teclado, nenhum erro JavaScript ou recurso com falha. Não foi executado lint, pois não está configurado. A workflow preexistente `.github/workflows/pages.yml` foi preservada, sem configuração ou execução de publicação. Não houve deploy, push ou backend novo.

## Validação

Validação final em 21/11/2026:

- `npm run build -- --configuration production`: passou, sem erros nem avisos. Bundle inicial 236,67 kB (66,21 kB estimados de transferência); página lazy 109,43 kB. Budgets originais preservados.
- `npm test -- --watch=false`: passou, 13 testes em 1 arquivo. Cobre rota/h1, destinos internos, menu/Escape/foco, seleção e reaplicação de serviços, jornada, contatos pendentes, validação inclusive espaços, geração e invalidação do briefing, cópia, recuperação de falha e download TXT.
- QA de navegador pelo coordenador: sem screenshots, zero overflow nas cinco larguras citadas e zero violações axe nos cenários citados.
- Contraste dos principais pares calculado em script local pela fórmula WCAG; detalhes em DESIGN.md.
- `git check-ignore node_modules dist .angular/cache`: confirmou exclusão dos três caminhos.

O comando de testes usa Vitest/jsdom; não representa, sozinho, validação de layout. A verificação de navegador acima complementa os testes.
