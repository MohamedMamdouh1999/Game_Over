import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Games } from '../interface/games';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _DataService:DataService, private _Spinner:NgxSpinnerService) { }
  personalizedData:Games[] = [];
  ngOnInit(): void {
    this._Spinner.show().then(() => {
      this._DataService.getPersonalized().subscribe({
        next: data => this.personalizedData = data.splice(0,3)
      })
    })
    setTimeout(() => {
      this._Spinner.hide()
    }, 2000);
  }
}
