import { Component, computed, output, signal } from '@angular/core';
import { SERVICES } from '../data/content';
import { Icon } from './icon';

@Component({
  selector: 'app-service-explorer',
  imports: [Icon],
  template: `
    <section id="solucoes" class="section services" aria-labelledby="services-title">
      <div class="container">
        <div class="section-intro">
          <h2 id="services-title">O que seu negócio<br>precisa agora?</h2>
          <p>Uma necessidade pontual ou uma transformação maior. Explore nossas soluções e encontre um bom ponto de partida.</p>
        </div>
        <div class="explorer">
          <div class="service-options" role="group" aria-label="Explorar competências da Nexo">
            @for (service of services; track service.id) {
              <button type="button" [class.active]="selected().id === service.id" [attr.aria-pressed]="selected().id === service.id" aria-controls="service-detail" (click)="select(service.id)">
                <app-icon [name]="service.icon" />
                <span>{{ service.title }}</span>
                <span class="service-indicator" aria-hidden="true"></span>
              </button>
            }
          </div>
          <article id="service-detail" class="service-detail" aria-live="polite" aria-atomic="true">
            <div class="service-meta"><app-icon [name]="selected().icon" /><span>{{ selected().short }}</span></div>
            <h3>{{ selected().headline }}</h3>
            <p>{{ selected().description }}</p>
            <ul class="deliverables">
              @for (item of selected().deliverables; track item) {
                <li><app-icon name="check" />{{ item }}</li>
              }
            </ul>
            <div class="service-example"><span>Uma possibilidade de uso</span><p>{{ selected().example }}</p><small>Exemplo ilustrativo, sem vínculo com projeto realizado.</small></div>
            <a class="text-link" href="#briefing" (click)="requestService.emit(selected().id)">Incluir esta solução no briefing <app-icon name="plus" /></a>
          </article>
        </div>
        <p class="services-note">Cada serviço pode ser contratado separadamente. As conexões acontecem quando fazem sentido para você.</p>
      </div>
    </section>
  `,
  styleUrl: './service-explorer.scss',
})
export class ServiceExplorer {
  readonly requestService = output<string>();
  protected readonly services = SERVICES;
  private readonly selectedId = signal('ia');
  protected readonly selected = computed(() => this.services.find((service) => service.id === this.selectedId()) ?? this.services[0]);
  protected select(id: string): void { this.selectedId.set(id); }
}
