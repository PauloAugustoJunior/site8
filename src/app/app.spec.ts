import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { Home } from './home';
import { CONTACT_CONFIG } from './data/site.config';

function element<T extends HTMLElement>(root: HTMLElement, selector: string): T {
  const result = root.querySelector<T>(selector);
  if (!result) throw new Error(`Elemento não encontrado: ${selector}`);
  return result;
}

async function home(): Promise<{ fixture: ComponentFixture<Home>; root: HTMLElement }> {
  await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
  const fixture = TestBed.createComponent(Home);
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

async function enter(fixture: ComponentFixture<Home>, root: HTMLElement, selector: string, value: string): Promise<void> {
  const input = element<HTMLInputElement | HTMLTextAreaElement>(root, selector);
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  fixture.detectChanges();
  await fixture.whenStable();
}

function submit(root: HTMLElement): void {
  element<HTMLFormElement>(root, '#briefing form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

afterEach(() => { vi.restoreAllMocks(); });

describe('Nexo — navegação e conteúdo', () => {
  it('carrega a página principal pela rota e mantém um único h1', async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes)] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelector('h1')?.textContent).toContain('Menos tarefas soltas.');
    expect(root.querySelector('a.skip-link')?.getAttribute('href')).toBe('#conteudo');
    expect(root.querySelectorAll('.service-options button')).toHaveLength(7);
    expect(root.querySelector('.flow-demo figcaption')?.textContent).toContain('ilustrativo');
  });

  it('abre o menu, fecha com Escape e devolve o foco ao controle', async () => {
    const { fixture, root } = await home();
    const toggle = element<HTMLButtonElement>(root, '.menu-toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click(); fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element(root, '#main-navigation').classList.contains('open')).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('fecha o menu após selecionar um destino', async () => {
    const { fixture, root } = await home();
    const toggle = element<HTMLButtonElement>(root, '.menu-toggle');
    toggle.click(); fixture.detectChanges();
    element<HTMLAnchorElement>(root, '#main-navigation a[href="#solucoes"]').click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('troca a competência e leva sua escolha ao briefing', async () => {
    const { fixture, root } = await home();
    const analytics = [...root.querySelectorAll<HTMLButtonElement>('.service-options button')].find((button) => button.textContent?.includes('Dados e analytics'));
    analytics?.click(); fixture.detectChanges();
    expect(analytics?.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('#service-detail h3')?.textContent).toContain('Enxergue');
    element<HTMLAnchorElement>(root, '#service-detail a').click(); fixture.detectChanges(); await fixture.whenStable();
    expect(element<HTMLSelectElement>(root, '#service').value).toBe('analytics');
  });

  it('reaplica uma solução mesmo quando o visitante alterou o seletor do briefing', async () => {
    const { fixture, root } = await home();
    const select = element<HTMLSelectElement>(root, '#service');
    select.value = 'software';
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges(); await fixture.whenStable();
    expect(select.value).toBe('software');
    element<HTMLAnchorElement>(root, '#service-detail a').click();
    fixture.detectChanges(); await fixture.whenStable();
    expect(select.value).toBe('ia');
  });

  it('permite explorar a jornada e planejar uma etapa isolada', async () => {
    const { fixture, root } = await home();
    const first = element<HTMLButtonElement>(root, '.journey-options button');
    first.click(); fixture.detectChanges();
    expect(first.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('#journey-detail h3')?.textContent).toBe('Estar presente');
    element<HTMLAnchorElement>(root, '#journey-detail a').click(); fixture.detectChanges(); await fixture.whenStable();
    expect(element<HTMLSelectElement>(root, '#service').value).toBe('digital');
  });

  it('mantém todos os destinos internos existentes e contatos pendentes explícitos', async () => {
    const { root } = await home();
    for (const link of root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      const href = link.getAttribute('href');
      expect(href && root.querySelector(href)).toBeTruthy();
    }
    expect(CONTACT_CONFIG.status).toBe('pending');
    expect(CONTACT_CONFIG.email).toBeNull();
    expect(CONTACT_CONFIG.phone).toBeNull();
    expect(CONTACT_CONFIG.whatsapp).toBeNull();
    expect(root.querySelector('a[href^="mailto:"],a[href^="tel:"],a[href*="wa.me"]')).toBeNull();
  });
});

describe('Nexo — briefing local', () => {
  it('valida os campos obrigatórios e não gera documento vazio', async () => {
    const { fixture, root } = await home();
    submit(root); fixture.detectChanges();
    expect(root.querySelector('#business-error')).toBeTruthy();
    expect(root.querySelector('#need-error')).toBeTruthy();
    expect(root.querySelector('#briefing-preview')).toBeNull();
    expect(document.activeElement?.id).toBe('business');
  });

  it('rejeita espaços e uma descrição curta', async () => {
    const { fixture, root } = await home();
    await enter(fixture, root, '#business', '   ');
    await enter(fixture, root, '#need', 'curto');
    submit(root); fixture.detectChanges();
    expect(element(root, '#business').getAttribute('aria-invalid')).toBe('true');
    expect(element(root, '#need').getAttribute('aria-invalid')).toBe('true');
    expect(root.querySelector('#briefing-preview')).toBeNull();
  });

  it('gera um briefing útil e limpa o documento ao alterar os dados', async () => {
    const { fixture, root } = await home();
    await enter(fixture, root, '#business', 'Loja de bairro');
    await enter(fixture, root, '#need', 'Quero organizar os pedidos do site e acompanhar o andamento em um sistema.');
    await enter(fixture, root, '#tools', 'Planilhas e WhatsApp');
    submit(root); fixture.detectChanges();
    const preview = element<HTMLTextAreaElement>(root, '#briefing-preview');
    expect(preview.value).toContain('Loja de bairro');
    expect(preview.value).toContain('Planilhas e WhatsApp');
    expect(preview.value).toContain('Nenhuma informação foi enviada');
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Briefing pronto');
    await enter(fixture, root, '#business', 'Outra loja');
    expect(root.querySelector('#briefing-preview')).toBeNull();
  });

  it('copia o briefing gerado para a área de transferência', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const { fixture, root } = await home();
    await enter(fixture, root, '#business', 'Consultoria');
    await enter(fixture, root, '#need', 'Quero reunir as informações de atendimento em um painel para a equipe.');
    submit(root); fixture.detectChanges();
    const copy = [...root.querySelectorAll<HTMLButtonElement>('.result-actions button')].find((button) => button.textContent?.includes('Copiar texto'));
    copy?.click(); await fixture.whenStable(); fixture.detectChanges();
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Consultoria'));
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Briefing copiado');
  });

  it('oferece recuperação quando a cópia automática falha', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error('blocked')) }, configurable: true });
    const { fixture, root } = await home();
    await enter(fixture, root, '#business', 'Meu negócio');
    await enter(fixture, root, '#need', 'Quero automatizar uma rotina de atendimento recorrente.');
    submit(root); fixture.detectChanges();
    const copy = [...root.querySelectorAll<HTMLButtonElement>('.result-actions button')].find((button) => button.textContent?.includes('Copiar texto'));
    copy?.click(); await fixture.whenStable(); fixture.detectChanges();
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Selecione o texto');
  });

  it('baixa um arquivo de texto e libera a URL temporária', async () => {
    const create = vi.fn().mockReturnValue('blob:nexo-briefing');
    const revoke = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { value: create, configurable: true });
    Object.defineProperty(URL, 'revokeObjectURL', { value: revoke, configurable: true });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
    const { fixture, root } = await home();
    await enter(fixture, root, '#business', 'Meu negócio');
    await enter(fixture, root, '#need', 'Quero automatizar uma rotina de atendimento recorrente.');
    submit(root); fixture.detectChanges();
    element<HTMLButtonElement>(root, '.result-actions button').click(); fixture.detectChanges();
    expect(create).toHaveBeenCalledOnce();
    expect(create.mock.calls[0][0]).toBeInstanceOf(Blob);
    expect(click).toHaveBeenCalledOnce();
    expect(revoke).toHaveBeenCalledWith('blob:nexo-briefing');
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Download iniciado');
  });
});
