import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  standalone: true
})
export class Profile {

  username? : string | null

  constructor(private route : ActivatedRoute) {
    if(this.route.snapshot.paramMap.get("username")){
      this.username = this.route.snapshot.paramMap.get("username")
    }
  }



}
