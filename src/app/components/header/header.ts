import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {

  username : string

  constructor() {
    this.username = "Sylvain"
  }

}
