export enum TravelType{
  Car = 'car',
  Train = 'train',
  Plane = 'plane'
}

export interface Travel {
  id?: number
  distance : number
  consumption : number
  co2?  : number
  date? : Date
  travelType? : TravelType
  userId? : number
}
