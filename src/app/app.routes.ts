import {Routes} from '@angular/router';
import {Home} from './components/home/home';
import {Summary} from './components/summary/summary';
import {Profile} from './components/profile/profile';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "summary", component: Summary, canActivate : [authGuard]},
  {path: "profile/:username", component: Profile, canActivate : [authGuard]}

];
