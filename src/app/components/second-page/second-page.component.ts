import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  logedUser?: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.logedUser = this.auth.user;
  }

}
