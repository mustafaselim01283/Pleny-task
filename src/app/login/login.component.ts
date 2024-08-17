import { Component } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { login } from '../interfaces/interface';
import { Router } from '@angular/router';
import { SignalsService } from '../services/signals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService:UserLoginService , private router:Router ,private signals:SignalsService){}

  // user login form to get user data
  loginForm=new FormGroup({
    username:new FormControl<string>("",[Validators.required ]),
    password:new FormControl<string>("",[Validators.required])
  })

  userLogin(){

    // create object by user form value to send it to backend throw api
    let loginObj:login={
      username: this.loginForm.controls.username.value!,
      password:this.loginForm.controls.password.value!,
      expiresInMins:60

    }

    this.loginService.userLogin(loginObj).subscribe({
      next:(data)=>{

        // save user token in localstorage 
        localStorage.setItem("userToken",data.token)

        // notify the userLogin signal to change its value to true for notify navbar to change its items 
        this.signals.userLogin$.next(true)

        // when login is success go to home component
        this.router.navigateByUrl("")
        
      },
      error:(error)=>{

        // when login is faild show alert to user 
        window.alert("login faild somthing error")
      }
    })

  }
}
