import {Component, effect, Signal} from '@angular/core';
import {CarbonFootprintForm} from '../carbon-footprint-form/carbon-footprint-form';
import {CarbonFootprintResult} from '../carbon-footprint-result/carbon-footprint-result';
import {DecimalPipe, NgClass, NgStyle} from '@angular/common';
import {CarbonFootprintCompute} from '../../services/carbon-footprint-compute';
import {Travel, TravelType} from '../../models/travel';

@Component({
  selector: 'app-carbon-footprint',
  imports: [
    CarbonFootprintForm,
    CarbonFootprintResult,
    NgStyle,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.css',
  standalone: true
})
export class CarbonFootprint {

  readonly MAX_CONSUMPTION: number = 7;
  readonly MIN_CONSUMPTION: number = 4;

  distance: number = 0
  consumptionPer100Km: number = 0
  quantityCo2: number = 0

  travels: Signal<Travel[]>;

  constructor(private cfcs: CarbonFootprintCompute) {

    effect(
      () => {
        this.distance = this.cfcs.resumeTravels().totalDistance
        this.consumptionPer100Km = this.cfcs.resumeTravels().consumptionPer100Km
        this.quantityCo2 = this.cfcs.resumeTravels().totalQuantityCo2
      }
    )

    this.travels = this.cfcs.travels
    this.cfcs.getTravels()
  }

  add100km() {
    this.distance += 100;
  }

  addTravel() {
    const distance = Math.floor(Math.random() * 1000)
    const consumption = Math.floor(Math.random() * 10)
    this.cfcs.addTravel({distance: distance, consumption: consumption, travelType : TravelType.Car}).subscribe()
  }

}
