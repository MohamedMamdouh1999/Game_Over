import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem("userToken") !== null){
      this.saveUserData()
    }
  }
  userData:any = new BehaviorSubject(null)

  signUP(registerValue:object):Observable<any>{
    return this._HttpClient.post("https://route-movies-api.vercel.app/signup", registerValue)
  }

  signIn(loginValue:object):Observable<any>{
    return this._HttpClient.post("https://route-movies-api.vercel.app/signin", loginValue)
  }

  saveUserData(){
    let data = JSON.stringify(localStorage.getItem("userToken"))
    let enDecode:object = jwtDecode(data)
    this.userData.next(enDecode)
  }
}
