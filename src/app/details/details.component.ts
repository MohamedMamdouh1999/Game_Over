import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Sreenshots } from '../interface/sreenshots';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isHide:boolean = false
  details:any = {}
  screenshots:Sreenshots[] = []
  constructor(private _ActivatedRoute:ActivatedRoute, private _DataService:DataService, private _NgxSpinnerService:NgxSpinnerService) { }
  ngOnInit(): void {
    this._NgxSpinnerService.show().then(() => {
      let {id} = this._ActivatedRoute.snapshot.params
      this._DataService.getDetails(id).subscribe({
        next: data => {
          this.details = data
          this.screenshots = this.details.screenshots
        }
      })
    })
    setTimeout(() => {
      this._NgxSpinnerService.hide()
    }, 2000);
  }
  hideImage():void{
    this.isHide = !this.isHide;
  }
}
