import {computed, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Travel} from '../models/travel';
import {firstValueFrom, map, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {

  private _travels = signal<Travel[]>([])
  readonly travels = this._travels.asReadonly()

  private readonly BASE_URL = "http://localhost:8080"

  readonly resumeTravels = computed(() => this.getResumeTravels())

  constructor(private http: HttpClient) {
  }

  public async getTravels() {

    // this.http.get<Travel[]>(`${this.BASE_URL}/tousMesVoyages/1`).subscribe(
    //     response => this._travels.set(response)
    // )

    const travels = await firstValueFrom(this.http.get<any[]>(`${this.BASE_URL}/tousMesVoyages/1`).pipe(
        map(
          response => response.map(
            item => {
              const travel: Travel = {
                id: item.id,
                co2: item.co2,
                date: item.date,
                travelType: item.travelType,
                consumption: item.consommation,
                distance: item.distance,
                userId: item.userId
              }
              return travel
            }
          )
        )
      )
    )

    this._travels.set(travels)
  }

  public getQuantityCo2ByCar(travel: Travel) {
    const params = new HttpParams()
      .set("consommationPour100Km", travel.consumption)
      .set("distanceKm", travel.distance)

    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetVoiture`, {params: params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }
  public getQuantityCo2ByTrain(travel: Travel) {
    const params = new HttpParams()
      .set("distanceKm", travel.distance)

    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetTrain`, {params: params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public getQuantityCo2ByPlane(travel: Travel) {
    const params = new HttpParams()
      .set("distanceKm", travel.distance)

    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetAvion`, {params: params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public addTravel(travel: Travel) {

    console.log(travel)

    return this.quantityCo2ByTravel(travel).pipe(
      switchMap(
        co2 => {
          const data = {
            userId : 1,
            consommation : travel.consumption,
            co2 : co2,
            distance : travel.distance,
            travelType : travel.travelType
          }
          return this.http.post(`${this.BASE_URL}/ajouterUnVoyage`, data)
        }
      ),
      tap(
        () => this.getTravels()
      )
    )
  }

  public quantityCo2ByTravel(travel : Travel) {
    switch (travel.travelType) {
      case "train" :
        return this.getQuantityCo2ByTrain(travel)
      case "plane" :
        return this.getQuantityCo2ByPlane(travel)
      default :
        return this.getQuantityCo2ByCar(travel)
    }
  }

  public getResumeTravels() {
    let totalDistance = 0
    let totalConsumption = 0
    let totalQuantityCo2 = 0

    for (const travel of this.travels()) {
      totalDistance += travel.distance
      totalConsumption += travel.consumption
      totalQuantityCo2 += travel.co2 ?? 0
    }
    return {
      totalDistance: totalDistance,
      consumptionPer100Km: totalConsumption / this.travels().length,
      totalQuantityCo2: totalQuantityCo2
    }
  }


}
