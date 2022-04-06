import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    pswConfirm: new FormControl("", [Validators.required]),
    mail: new FormControl("", [Validators.email]),
    dob: new FormControl("", [Validators.required]),
  });

  passwordCheck?: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    if (this.registerForm.value.password === this.registerForm.value.pswConfirm) {
        const newUser: User = {username: this.registerForm.value.username,
        password:this.registerForm.value.password,
        mail: this.registerForm.value.mail,
        dob: new Date(this.registerForm.value.dob).getTime()}
        
        this.auth.register(newUser).subscribe({
        next:(user) => console.log(user),
        error: err => console.log(err),
      });
      this.passwordCheck = "";
      this.router.navigate(["private"]);
    } else{
       this.passwordCheck = "La password inserita è errata";
    }
  }

}
