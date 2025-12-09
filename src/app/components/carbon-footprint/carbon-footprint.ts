import {Component} from '@angular/core';
import {CarbonFootprintForm} from '../carbon-footprint-form/carbon-footprint-form';
import {CarbonFootprintResult} from '../carbon-footprint-result/carbon-footprint-result';
import {DecimalPipe, NgClass, NgStyle} from '@angular/common';

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
  travels: { distance: number, consumptionPer100Km: number }[]

  constructor() {
    this.distance = 850
    this.consumptionPer100Km = 20

    this.travels = [
      {distance: 50, consumptionPer100Km: 5},
      {distance: 150, consumptionPer100Km: 6},
      {distance: 250, consumptionPer100Km: 7},
      {distance: 350, consumptionPer100Km: 8},
      {distance: 450, consumptionPer100Km: 9}
    ]

    this.calculateDistanceAndConsumptionAverage()
  }

  add100km() {
    this.distance += 100;
  }

  addTravel() {
    const distance = Math.floor(Math.random() * 1000)
    const consumption = Math.floor(Math.random() * 10)
    this.travels.push({distance: distance, consumptionPer100Km: consumption})
    this.calculateDistanceAndConsumptionAverage()
  }

  private calculateDistanceAndConsumptionAverage(){

    let totalDistance = 0
    let totalConsumption = 0

    for(const travel of this.travels){
      totalDistance += travel.distance
      totalConsumption += travel.consumptionPer100Km
    }

    this.distance = totalDistance
    this.consumptionPer100Km = totalConsumption / this.travels.length
  }

}
