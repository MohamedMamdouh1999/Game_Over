import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router, private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this._NgxSpinnerService.show().then(()=>{
      this._AuthService.userData.subscribe({
        next:()=>{
          if(this._AuthService.userData.getValue() !== null){
            this._Router.navigate(["/home"])
          }
        }
      })
    })
    setTimeout(() => {
      this._NgxSpinnerService.hide()
    }, 2000);
  }
  error:string = ""
  isLoading:boolean = false
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,15}$/)])
  })
  submitLoginForm(login:FormGroup){
    this.isLoading = true;
    this._NgxSpinnerService.show().then(()=>{
      this._AuthService.signIn(login.value).subscribe({
        next:response => {
          this.isLoading = false
          if(response.message === "success"){
            this.error = ""
            localStorage.setItem("userToken", response.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
          } else{
            this.error = response.message
          }
        }
      })
    })
    setTimeout(() => {
      this._NgxSpinnerService.hide()
    }, 2000);
  }
  forgotPassword(){
    alert("Hahahahaha, make a new account")
  }
}
