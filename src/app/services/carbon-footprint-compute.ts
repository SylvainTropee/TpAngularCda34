import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {

  private travels: { distance: number, consumptionPer100Km: number , quantityCo2 : number}[]

  constructor() {
    this.travels = [
      {distance: 50, consumptionPer100Km: 5, quantityCo2 : 10},
      {distance: 150, consumptionPer100Km: 6, quantityCo2 : 45},
      {distance: 250, consumptionPer100Km: 7, quantityCo2 : 110},
      {distance: 350, consumptionPer100Km: 8, quantityCo2 : 38},
      {distance: 450, consumptionPer100Km: 9, quantityCo2 : 1}
    ]
  }

  public getTravels() {
    return this.travels
  }

  public addTravel(travel: { distance: number, consumptionPer100Km: number, quantityCo2 : number }) {
    this.travels.push(travel)
  }

  public quantityCo2ByTravel(distance: number, consumptionPer100Km: number){
    return (distance * consumptionPer100Km) / 100 * 2.3
  }

  public getResumeTravels(){
    let totalDistance = 0
    let totalConsumption = 0
    let totalQuantityCo2 = 0

    for (const travel of this.travels) {
      totalDistance += travel.distance
      totalConsumption += travel.consumptionPer100Km
      totalQuantityCo2 += travel.quantityCo2
    }

    return {
      totalDistance : totalDistance,
      "consumptionPer100Km" : totalConsumption / this.travels.length,
      totalQuantityCo2 : totalQuantityCo2
    }
  }


}
