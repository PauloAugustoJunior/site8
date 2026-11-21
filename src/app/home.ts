import { Component, signal } from '@angular/core';
import { Applications } from './components/applications';
import { Hero } from './components/hero';
import { Header } from './components/header';
import { ServiceExplorer } from './components/service-explorer';
import { Journey } from './components/journey';
import { Briefing } from './components/briefing';
import { Icon } from './components/icon';
import { FAQS } from './data/content';

@Component({
  selector: 'app-home',
  imports: [Applications, Hero, Header, ServiceExplorer, Journey, Briefing, Icon],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly faqs = FAQS;
  protected readonly serviceForBriefing = signal({ id: 'ia' });
  protected chooseService(id: string): void { this.serviceForBriefing.set({ id }); }
}
