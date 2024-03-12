import { Component, OnInit } from '@angular/core';
import { FormDataComponent } from '../form-data/form-data.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  ownername = "";
  constructor() { }
  productForm !: FormGroup; 
  ngOnInit(): void {
    this.ownername = this.productForm.controls['firstname'].value;
  }


  showPug()
  {
    alert("Hello, I'm ")
  }
}
