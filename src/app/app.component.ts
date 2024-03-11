import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormDataComponent } from './form-data/form-data.component';
import { ApiService } from './service/api.service'
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'emscrud';

  displayedColumns : string[] = ['firstname', 'lastname', 'email' , 'phone','address', 'action']

  

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService) {}

  dataSource !: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getAllEmployees()
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

  applyFilter(event : Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
