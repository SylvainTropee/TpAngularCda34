import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {User} from '../services/user';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(User)
  const router = inject(Router)

  if (authService.isLogged()) {
    return true;
  } else {
    router.navigate([''], {
      queryParams : {
        error : "Veuillez vous connecter !"
      }
    })
  }
  return false
};
