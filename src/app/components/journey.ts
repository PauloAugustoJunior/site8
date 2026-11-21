import { Component, computed, output, signal } from '@angular/core';
import { JOURNEY } from '../data/content';

@Component({
  selector: 'app-journey',
  template: `
    <section class="section journey" aria-labelledby="journey-title">
      <div class="container journey-grid">
        <div><h2 id="journey-title">Comece onde está.<br>Evolua com sentido.</h2><p>Seu próximo passo não precisa ser o maior. Precisa resolver a necessidade certa.</p><p class="journey-note">Esta é uma jornada possível. Você pode entrar em qualquer etapa, combinar soluções ou contratar apenas uma delas.</p></div>
        <div class="journey-interaction">
          <div class="journey-options" role="group" aria-label="Explorar uma jornada possível">
            @for (stage of stages; track stage.id) {
              <button type="button" [class.selected]="current().id === stage.id" [attr.aria-pressed]="current().id === stage.id" aria-controls="journey-detail" (click)="choose(stage.id)"><span class="journey-node" aria-hidden="true"></span>{{ stage.title }}</button>
            }
          </div>
          <div class="journey-detail" id="journey-detail" aria-live="polite"><h3>{{ current().title }}</h3><p>{{ current().text }}</p><a class="text-link" href="#briefing" (click)="requestService.emit(current().link)">Planejar este passo</a></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .journey{background:var(--coal);color:var(--white)}
    .journey-grid{display:grid;grid-template-columns:1fr 1fr;gap:7rem;align-items:start}
    h2{max-width:14ch}.journey-grid>div>p{color:var(--on-coal-muted);line-height:1.75;font-size:1rem;max-width:40ch}.journey-grid>div>.journey-note{font-size:.81rem;margin-top:2rem}
    .journey-options{display:flex;flex-direction:column;gap:0;position:relative;margin-bottom:1.8rem}
    .journey-options:before{content:'';position:absolute;left:9px;top:28px;bottom:28px;width:1px;background:#626568}
    button{display:flex;align-items:center;gap:1.15rem;text-align:left;background:none;border:0;color:var(--on-coal-muted);padding:1rem 0;font-size:1.05rem;position:relative;min-height:54px}
    button:hover,button.selected{color:var(--white)}.journey-node{width:19px;height:19px;background:var(--coal);border:1px solid #818487;border-radius:50%;flex-shrink:0}.selected .journey-node{background:var(--coral);border-color:var(--coral);box-shadow:inset 0 0 0 4px var(--coal)}
    .journey-detail{padding-top:1.7rem;border-top:1px solid #55595b;min-height:210px}.journey-detail h3{font-size:1.25rem;font-weight:500;margin:0 0 .8rem}.journey-detail p{font-size:.88rem;color:var(--on-coal-muted);line-height:1.7;margin-bottom:1.5rem}.text-link{color:var(--coral)}
    @media(max-width:760px){.journey-grid{grid-template-columns:1fr;gap:2.4rem}.journey-detail{min-height:0}}
  `,
})
export class Journey {
  readonly requestService = output<string>();
  protected readonly stages = JOURNEY;
  private readonly selectedId = signal('conectar');
  protected readonly current = computed(() => this.stages.find((stage) => stage.id === this.selectedId()) ?? this.stages[0]);
  protected choose(id: string): void { this.selectedId.set(id); }
}
