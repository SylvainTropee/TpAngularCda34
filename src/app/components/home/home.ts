import {AfterContentChecked, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../services/user';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements AfterContentChecked {

  error?: string | null
  userLogin: string = ""
  password: string = ""
  errors: string[] = []

  constructor(private router: Router, private authService: User, private route: ActivatedRoute) {
  }

  login() {

    this.errors = []

    if (this.userLogin.length < 3) {
      this.errors.push("Le login doit avoir au moins 3 caractères")
    }

    console.log(this.password)
    if (this.password.length < 6) {
      this.errors.push("Le mot de passe doit avoir au moins  6 caractères")
    }

    if (this.errors.length == 0) {
      this.authService.login(this.userLogin)
      this.goToSummary()
    }
  }

  goToSummary() {
    this.router.navigate(["/summary"]);
  }

  ngAfterContentChecked(): void {
    if (this.route.snapshot.queryParamMap.get('error')) {
      this.error = this.route.snapshot.queryParamMap.get('error')
    }
  }
}
