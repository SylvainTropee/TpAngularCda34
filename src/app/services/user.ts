import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {

  public login(username: string) {
    localStorage.setItem('user', JSON.stringify({name: username}))
  }

  getUsername(){
    const user = localStorage.getItem('user')
    if(user){
      return JSON.parse(user).name
    }
    return ''
  }

  isLogged(){
    return this.getUsername() != ''
  }

  logout(){
    localStorage.removeItem('user')
  }

}
