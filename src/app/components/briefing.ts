import { Component, computed, effect, ElementRef, input, signal, viewChild } from '@angular/core';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { SERVICES } from '../data/content';
import { CONTACT_CONFIG } from '../data/site.config';
import { Icon } from './icon';

interface BriefingModel {
  business: string;
  service: string;
  need: string;
  tools: string;
  timing: string;
}

@Component({
  selector: 'app-briefing',
  imports: [FormField, Icon],
  templateUrl: './briefing.html',
  styleUrl: './briefing.scss',
})
export class Briefing {
  readonly initialService = input<Readonly<{ id: string }>>({ id: 'ia' });
  protected readonly services = SERVICES;
  protected readonly contact = CONTACT_CONFIG;
  protected readonly model = signal<BriefingModel>({ business: '', service: 'ia', need: '', tools: '', timing: 'Ainda vou definir' });
  protected readonly briefingForm = form(this.model, (schema) => {
    required(schema.business);
    maxLength(schema.business, 120);
    required(schema.need);
    minLength(schema.need, 20);
    maxLength(schema.need, 3000);
    maxLength(schema.tools, 500);
  });
  protected readonly attempted = signal(false);
  protected readonly generated = signal('');
  protected readonly feedback = signal('');
  protected readonly businessInvalid = computed(() => this.model().business.trim().length < 2);
  protected readonly needInvalid = computed(() => this.model().need.trim().length < 20);
  private readonly formElement = viewChild<ElementRef<HTMLFormElement>>('formElement');

  constructor() {
    effect(() => {
      const service = this.initialService().id;
      this.model.update((value) => ({ ...value, service }));
    });
    effect(() => {
      this.model();
      this.generated.set('');
      this.feedback.set('');
    });
  }

  protected generate(event: Event): void {
    event.preventDefault();
    this.attempted.set(true);
    if (this.briefingForm().invalid() || this.businessInvalid() || this.needInvalid()) {
      const id = this.businessInvalid() ? '#business' : '#need';
      this.formElement()?.nativeElement.querySelector<HTMLElement>(id)?.focus();
      return;
    }
    const value = this.model();
    const service = this.services.find((item) => item.id === value.service)?.title ?? 'A definir com a Nexo';
    this.generated.set([
      'Briefing de projeto | Nexo',
      '',
      `Negócio ou atividade: ${value.business.trim()}`,
      `Solução de interesse: ${service}`,
      '',
      'Necessidade e objetivo:',
      value.need.trim(),
      '',
      `Ferramentas atuais: ${value.tools.trim() || 'A detalhar'}`,
      `Prazo desejado: ${value.timing}`,
      '',
      'Pontos para alinhar na proposta: escopo, integrações, entregáveis, prazo e investimento.',
      '',
      'Documento preparado localmente. Nenhuma informação foi enviada à Nexo.',
      'Compartilhe este briefing por um canal oficial da Nexo quando ele estiver disponível.',
    ].join('\n'));
    this.feedback.set('Briefing pronto. Você pode baixar ou copiar o documento.');
  }

  protected download(): void {
    const blob = new Blob([this.generated()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'briefing-projeto-nexo.txt';
    anchor.click();
    URL.revokeObjectURL(url);
    this.feedback.set('Download iniciado. Guarde o arquivo para compartilhar por um canal oficial.');
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.generated());
      this.feedback.set('Briefing copiado. Guarde o texto para compartilhar por um canal oficial.');
    } catch {
      this.feedback.set('A cópia automática não está disponível. Selecione o texto do briefing e use o comando de copiar do seu dispositivo.');
    }
  }
}
