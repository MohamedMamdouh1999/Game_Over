import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  success:string = ""
  isLoading:boolean = false

  registerForm:FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[A-Z][a-z]{2,9}$/)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[A-Z][a-z]{2,9}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{5,15}$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(100)]),
  })

  submitRegisterForm(register:FormGroup){
    this.isLoading = true;
    this._NgxSpinnerService.show().then(()=>{
      this._AuthService.signUP(register.value).subscribe({
        next: response => {
          this.isLoading = false
          if(response.message === 'success'){
            this.error = "";
            this.success = response.message;
            this._Router.navigate(['/login'])
          } else{
            this.success = "";
            this.error = response.errors.email.message;
          }
        }
      })
    })
    setTimeout(() => {
      this._NgxSpinnerService.hide()
    }, 2000);
  }
}
