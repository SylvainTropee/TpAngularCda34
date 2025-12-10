import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {User} from '../../services/user';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  standalone: true
})
export class Nav {

  @Input() username?: string


  constructor(private authService: User, private router: Router) {
  }

  logout() {
    this.authService.logout()
    this.router.navigate([''])
  }

}
