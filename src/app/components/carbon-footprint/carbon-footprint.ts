import {Component} from '@angular/core';
import {CarbonFootprintForm} from '../carbon-footprint-form/carbon-footprint-form';
import {CarbonFootprintResult} from '../carbon-footprint-result/carbon-footprint-result';
import {DecimalPipe, NgClass, NgStyle} from '@angular/common';
import {CarbonFootprintCompute} from '../../services/carbon-footprint-compute';

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

  distance: number
  consumptionPer100Km: number
  quantityCo2: number
  travels: { distance: number, consumptionPer100Km: number, quantityCo2: number }[]

  constructor(private cfcs: CarbonFootprintCompute) {
    this.distance = 0
    this.consumptionPer100Km = 0
    this.quantityCo2 = 0
    this.travels = this.cfcs.getTravels()
    this.calculateDistanceAndConsumptionAverage()
  }

  add100km() {
    this.distance += 100;
  }

  addTravel() {
    const distance = Math.floor(Math.random() * 1000)
    const consumption = Math.floor(Math.random() * 10)
    const quantityCo2 = this.cfcs.quantityCo2ByTravel(distance, consumption, "car")
    this.cfcs.addTravel({distance: distance, consumptionPer100Km: consumption, quantityCo2: quantityCo2})
    this.calculateDistanceAndConsumptionAverage()
  }

  private calculateDistanceAndConsumptionAverage() {

    let result = this.cfcs.getResumeTravels()
    this.distance = result.totalDistance
    this.consumptionPer100Km = result.consumptionPer100Km
    this.quantityCo2 = result.totalQuantityCo2
  }
}
