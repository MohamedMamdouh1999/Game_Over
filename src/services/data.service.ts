import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _HttpClient:HttpClient) { }

  headers = {'X-RapidAPI-Key': 'f0ae77836dmshfa49706a2645550p16f53djsnc76b86a12092','X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',};

  getPersonalized():Observable<any>{
    return this._HttpClient.get("https://free-to-play-games-database.p.rapidapi.com/api/filter",
    {headers:this.headers, params: {tag: '3d.mmorpg.fantasy.pvp', platform: 'pc'}})
  }

  getAll():Observable<any>{
    return this._HttpClient.get("https://free-to-play-games-database.p.rapidapi.com/api/games",
    {headers:this.headers})
  }

  getCategory(category:string):Observable<any>{
    return this._HttpClient.get("https://free-to-play-games-database.p.rapidapi.com/api/games",
    {headers:this.headers, params: {category: category}})
  }

  getSortBy(sort:string):Observable<any>{
    return this._HttpClient.get("https://free-to-play-games-database.p.rapidapi.com/api/games",
    {headers:this.headers, params: {'sort-by': sort}})
  }

  getPlatform(platform:string):Observable<any>{
    return this._HttpClient.get("https://free-to-play-games-database.p.rapidapi.com/api/games",
    {headers:this.headers, params: {platform: platform}})
  }

  getDetails(id:string):Observable<any>{
    return this._HttpClient.get("https://free-to-play-games-database.p.rapidapi.com/api/game",
    {headers:this.headers, params: {id: id}})
  }
}
