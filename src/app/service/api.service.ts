import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) 
  { }

  private apiurl = "http://localhost:8080/api/employees";

  postEmployee(data : any){
    return this.http.post<any>(`${this.apiurl}`,data)
   }

   getEmployee(){
    return this.http.get<any>(`${this.apiurl}`)
   }

   updateEmp(id:number, data:any){
    return this.http.post<any>(`${this.apiurl}/` + id, data)
   }

   deleteEmp(id:any){
    return this.http.get<any>(`${this.apiurl}/` + id)
   }

}
