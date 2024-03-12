import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../service/api.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AboutComponent} from '../about/about.component'

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {

  productForm !: FormGroup; 
  action = "SAVE";

  constructor( private formB : FormBuilder,
               private api : ApiService,
               @Inject(MAT_DIALOG_DATA) public editData:any,
               private dialogRef : MatDialogRef<FormDataComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formB.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      email : ['', Validators.required],
      phone : ['', Validators.required],
      address : ['', Validators.required],
      petname : ['', Validators.required],
      petprice : ['', Validators.required]
    })

    if(this.editData)
    {
      this.action = "UPDATE";
      this.productForm.controls['firstname'].setValue(this.editData.firstname)
      this.productForm.controls['lastname'].setValue(this.editData.lastname)
      this.productForm.controls['email'].setValue(this.editData.email)
      this.productForm.controls['phone'].setValue(this.editData.phone)
      this.productForm.controls['address'].setValue(this.editData.address)
      this.productForm.controls['petname'].setValue(this.editData.petname)
      this.productForm.controls['petprice'].setValue(this.editData.petprice)
    }
  }

  addEmployee()
  {
    if(!this.editData)
    {
      if(this.productForm.valid)
      {
        this.api.postEmployee(this.productForm.value).subscribe(
          {
            next : (res) => {
              alert("Employee added !")
              this.productForm.reset()
              this.dialogRef.close('SAVE')
              this.productForm
            },
            error : (err) => {
              alert("Error while adding employee details.. Please check !")
            }
          }
        )
      }
    }
    else
    {
      this.updateEmployee()
    }
  }

  updateEmployee()
  {
    this.api.updateEmp(this.editData.id, this.productForm.value).subscribe(
      {
        next : (res) => {
          alert("Employee details updated successfully !")
          this.productForm.reset()
          this.dialogRef.close('UPDATE')
          this.productForm
        },
        error : (err) => {
          alert("Error while updating the employee details.. Please check !")
        }
      }
    )
  }

}
