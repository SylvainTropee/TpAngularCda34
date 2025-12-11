import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CarbonFootprintCompute} from '../../services/carbon-footprint-compute';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.css',
  standalone: true
})
export class CarbonFootprintForm {

  public travelForm: FormGroup = new FormGroup({})

  constructor(private cfpc: CarbonFootprintCompute) {
    this.travelForm = new FormGroup(
      {
        travelType: new FormControl('car', [Validators.pattern(/(car|train|plane)/), (control) => this.travelTypeValidator(control)]),
        distance: new FormControl(null, [Validators.min(1), Validators.required]),
        consumption: new FormControl(0, [Validators.min(1), Validators.required]),
        date: new FormControl(null, [Validators.required])
      }
    )
  }

  travelTypeValidator(control: AbstractControl) {

    const travelType = control.value

    if (travelType == 'car') {
      this.travelForm.get('consumption')?.setValidators([Validators.min(1), Validators.required])
    } else {
      this.travelForm.get('consumption')?.clearValidators()
      this.travelForm.get('consumption')?.setValue(0)
    }

    //restester la valeur et déclenché la validation
    this.travelForm.get("consumption")?.updateValueAndValidity()
    return null
  }


  onTravelSubmit() {
    console.log(this.travelForm.valid)

    if (this.travelForm.valid) {
      let value = this.travelForm.value
      if (value.distance && value.consumption) {
        let quantityCo2 = this.cfpc.quantityCo2ByTravel(value.distance, value.consumption)
        this.cfpc.addTravel(
          {distance: value.distance, consumptionPer100Km: value.consumption, quantityCo2: quantityCo2}
        )
      }
    }
  }
}
