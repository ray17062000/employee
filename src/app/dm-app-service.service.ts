import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import {Employee} from './employee';
import {Observable} from 'rxjs'

@Injectable()
export class DmAppServiceService {

  constructor(private http: HttpClient) { }

  private path:string="/api/dbEmployees";
  LocList = ['Trichy', 'Chennai', 'Bangalore', 'Delhi', 'Pune'];  
  employees:Employee[] ;
  
  // getAllEmployees():Observable<Employee[]>{
  //   return this.http.get<Employee[]>(this.path)
  // }

  getAllEmployees()
  {
    this.http.get<Employee[]>(this.path)
    .subscribe(EmpDetais=>{
       this.employees=EmpDetais
    });
  }
  addEmployee(EmpDetails:Employee)
  {
    this.http.post(this.path, EmpDetails)
    .subscribe(EmpDetais=>{
       let output =EmpDetais;
       console.log("ouput",output);
    });
  }
  editEmployee(EmpDetails:Employee)
  {
    this.http.put(this.path, EmpDetails)
    .subscribe(EmpDetais=>{
       let output =EmpDetais;
       console.log(output);
    });
  }
  deleteEmployee(id:number)
  {
    // let input:Employee ={
    //   id: id,
    //   location: '',
    //   name: '',
    //   mobile: 0
    // }
    // this.http.delete(this.path, id)
    // .subscribe(EmpDetais=>{
    //    let output =EmpDetais;
    //    console.log(output);
    // });

  const params = new HttpParams().set('Employee.id', id);
  this.http.delete(this.path, { params })
    .subscribe(
      result => console.log(result),
      err => console.error(err)
    );
  }
}