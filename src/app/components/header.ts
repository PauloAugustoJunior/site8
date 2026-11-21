import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Icon } from './icon';

@Component({
  selector: 'app-header',
  imports: [Icon],
  host: { '(document:keydown.escape)': 'onEscape()' },
  template: `
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#inicio" aria-label="Nexo, início" (click)="closeMenu()">
          <svg viewBox="0 0 38 38" aria-hidden="true"><path d="M6 30V8h7l12 22h7V8M6 8l26 22" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" /></svg>
          <span>nexo<span class="brand-dot">.</span></span>
        </a>
        <button #menuButton class="menu-toggle" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-controls="main-navigation" [attr.aria-label]="menuOpen() ? 'Fechar menu' : 'Abrir menu'">
          <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
        </button>
        <nav id="main-navigation" aria-label="Navegação principal" [class.open]="menuOpen()">
          <a href="#solucoes" (click)="closeMenu()">Soluções</a>
          <a href="#possibilidades" (click)="closeMenu()">Na prática</a>
          <a href="#sobre" (click)="closeMenu()">A Nexo</a>
          <a href="#processo" (click)="closeMenu()">Como trabalhamos</a>
          <a class="button button-small button-dark" href="#briefing" (click)="closeMenu()">Planejar meu projeto</a>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.scss',
})
export class Header {
  protected readonly menuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  protected toggleMenu(): void { this.menuOpen.update((open) => !open); }
  protected closeMenu(): void { this.menuOpen.set(false); }
  protected onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      this.menuButton()?.nativeElement.focus();
    }
  }
}
