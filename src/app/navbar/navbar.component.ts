import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) { }
  isLogin:boolean = false
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=>{this._AuthService.userData.getValue() !== null ? this.isLogin = true : this.isLogin = false;}
    })
  }
  signOut(){
    localStorage.removeItem("userToken")
    this._AuthService.userData.next(null)
    this._Router.navigate(["/login"])
  }
}
