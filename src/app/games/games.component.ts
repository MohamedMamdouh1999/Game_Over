import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Games } from '../interface/games';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  constructor(private _DataService:DataService, private _ActivatedRoute:ActivatedRoute, private _NgxSpinnerService:NgxSpinnerService) { }
  term:string = ""
  gamesBy:any;
  selected:any;
  index:number = 20
  allGames:Games[] = []
  showGames:Games[] = []

  ngOnInit(): void {
    this._NgxSpinnerService.show().then(() => {
      this._ActivatedRoute.paramMap.subscribe(params => {
        this.gamesBy = params.get("gamesBy")
        this.selected = params.get("selected")
        if(this.gamesBy === "all"){
          this._DataService.getAll().subscribe({
            next: data => {
              this.allGames = data
              this.showGames = this.allGames.slice(0,20)
            }
          })
        } else if(this.gamesBy === "category"){
          this._DataService.getCategory(this.selected).subscribe({
            next: data => {
              this.allGames = data
              this.showGames = this.allGames.slice(0,20)
            }
          })
        } else if(this.gamesBy === "sort-by"){
          this._DataService.getSortBy(this.selected).subscribe({
            next: data => {
              this.allGames = data
              this.showGames = this.allGames.slice(0,20)
            }
          })
        } else if(this.gamesBy === "platforms"){
          this._DataService.getPlatform(this.selected).subscribe({
            next: data => {
              this.allGames = data
              this.showGames = this.allGames.slice(0,20)
            }
          })
        }
      })
    })
    setTimeout(() => {
      this._NgxSpinnerService.hide()
    }, 2000);
  }

  seeMore(){
    this.index +=20
    this.showGames = this.allGames.slice(0, this.index)
  }
}
