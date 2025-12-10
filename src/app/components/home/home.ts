import {AfterContentChecked, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../services/user';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements AfterContentChecked{

  error?: string | null

  constructor(private router: Router, private authService: User, private route: ActivatedRoute) {
  }

  login() {
    this.authService.login("Michel")
    this.goToSummary()
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
