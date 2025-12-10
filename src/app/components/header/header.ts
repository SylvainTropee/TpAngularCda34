import { Component } from '@angular/core';
import {Nav} from '../nav/nav';
import {User} from '../../services/user';

@Component({
  selector: 'app-header',
  imports: [
    Nav
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {

  username : string

  constructor(private authService : User) {
    this.username = this.authService.getUsername()
  }

  isLogged() {
    return this.authService.isLogged()
  }
}
