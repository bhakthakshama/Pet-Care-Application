import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormDataComponent } from './form-data/form-data.component';
import { ApiService } from './service/api.service'
import {AfterViewInit, ViewChild} from '@angular/core';
import {AboutComponent} from './about/about.component';
import {Router} from '@angular/router'
import { ReviewComponent } from './review/review.component';
import {FrontpageComponent} from './frontpage/frontpage.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'emscrud';

  constructor(private dialog : MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    open('http://localhost:54099/frontpage');
  }

  bark()
  {
    alert("BOW BOW !!")
  }

}
