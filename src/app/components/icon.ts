import { Component, input } from '@angular/core';
import { IconName } from '../data/content';

const PATHS: Record<IconName, string> = {
  web: 'M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01 M9 13l-2 2 2 2 M15 13l2 2-2 2',
  code: 'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',
  spark: 'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z M20 2v4 M18 4h4',
  connect: 'M8 8h8v8H8z M12 2v6 M12 16v6 M2 12h6 M16 12h6 M3 3h3v3H3z M18 18h3v3h-3z',
  chart: 'M4 3v17h17 M8 15v-3 M13 15V8 M18 15V5',
  data: 'M20 6c0 2-4 3-8 3S4 8 4 6s4-3 8-3 8 1 8 3z M4 6v6c0 2 4 3 8 3s8-1 8-3V6 M4 12v6c0 2 4 3 8 3s8-1 8-3v-6',
  compass: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M16 8l-3 5-5 3 3-5z',
  check: 'M5 12l4 4L19 6',
  plus: 'M12 5v14 M5 12h14',
  download: 'M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5',
  copy: 'M8 8h13v13H8z M16 8V3H3v13h5',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'M5 5l14 14 M5 19L19 5',
};

@Component({
  selector: 'app-icon',
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name()]" /></svg>',
  styles: ':host{display:inline-flex;flex-shrink:0;width:1.5rem;height:1.5rem}svg{width:100%;height:100%}',
})
export class Icon {
  readonly name = input.required<IconName>();
  protected readonly paths = PATHS;
}
