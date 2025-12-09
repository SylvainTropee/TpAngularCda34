import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    DatePipe
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  standalone: true
})
export class Footer {

  date : Date

  constructor() {
    this.date = new  Date()
  }

}
