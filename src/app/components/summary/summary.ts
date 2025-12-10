import { Component } from '@angular/core';
import {CarbonFootprint} from '../carbon-footprint/carbon-footprint';

@Component({
  selector: 'app-summary',
  imports: [CarbonFootprint],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
  standalone: true
})
export class Summary {

}
