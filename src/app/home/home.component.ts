import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../service/api.service';
import {Router} from '@angular/router';
import {AboutComponent} from '../about/about.component';
import {MatDialog} from '@angular/material/dialog';
import { FormDataComponent } from '../form-data/form-data.component';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns : string[] = ['firstname', 'lastname', 'email' , 'phone','address', 'petname', 'petprice','action']

  constructor(private api : ApiService, private dialog : MatDialog) { }

  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void {
    this.getAllEmployees();
  }

  bark()
  {
    alert("BOW BOW !!")
  }

  openReview()
  {
    this.dialog.open(ReviewComponent, {
      width : '40%'
    });
  }

  getAllEmployees()
  {
    this.api.getEmployee().subscribe(
      {
        next : (res) => {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error : (err) => {
          alert("Error while retreiving the employee records.. Please check !")
        }
      }
    )
  }

  openForm()
  {
      this.dialog.open(FormDataComponent, {
        width:'45%'
      }).afterClosed().subscribe( val => 
        {
          if(val === "SAVE")
          {
            this.getAllEmployees()
          }
        }
        )
  }

  applyFilter(event : Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      // if (id == filterValue)
      // {
      //   this.api.getEmployee();
      // }
    }
  }

  editEmployee(row : any)
  {
    this.dialog.open(FormDataComponent, {
      width : '30%',
      data : row
    }).afterClosed().subscribe( val => {
      if(val === "UPDATE")
      {
        this.getAllEmployees()
      }
    })
  }

  deleteEmployee(id : number)
  {
    const confirmmsg = confirm("Are you sure you wanna delete this product?");
    if(confirmmsg)
    {
      this.api.deleteEmp(id).subscribe({
        next : () => {
          alert("Product deletion successfully")
          this.getAllEmployees()
        },
        error : (err) => {
          alert("Error in deleting the product")
        }
      })
    }
  }

}
