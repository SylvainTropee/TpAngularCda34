import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';
import {CarbonFootprint} from './components/carbon-footprint/carbon-footprint';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CarbonFootprint],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TpAngularCda34');
}
