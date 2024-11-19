import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DmAppServiceService } from '../dm-app-service.service';
import { Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

  @Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  NewEmpID:number = 1;
  EmployeeData:Employee;
  errorMessage:string ="";
  isValidForm:boolean = false;

  constructor(public dmService:DmAppServiceService, private location:Location, private route:ActivatedRoute) {
    console.log('AddEmployee constructor');
   }
  ngOnInit() {
    console.log('AddEmployee ngOnInit');   
    this.loadInitialData();
  }
  loadInitialData()
  {
    this.EmployeeData = new Employee(); 
    this.dmService.employees.forEach(x=>
      {
        if(x.id > this.NewEmpID)
        {
          this.NewEmpID = x.id;
        }
      })

    this.EmployeeData.id = this.NewEmpID +1;
  }
  validate()
  {
    this.isValidForm = true;
    this.errorMessage ="";

    if(this.EmployeeData.name == undefined || this.EmployeeData.name == "" || this.EmployeeData.name == null)
    {
      this.errorMessage = 'Please provide valid employee name';
      this.isValidForm = false;
    }
    else if(this.EmployeeData.location == undefined || this.EmployeeData.location == "" || this.EmployeeData.location == null)
    {
      this.errorMessage = 'Please provide valid location';
      this.isValidForm = false;
    }
    else if(this.EmployeeData.mobile == undefined || this.EmployeeData.mobile.toString() == "" || this.EmployeeData.mobile == null)
    {
      this.errorMessage = 'Please provide valid mobile number';
      this.isValidForm = false;      
    }
  }
  addEmployeeDetails(EmpDetails)
  {   
    this.validate();
    if(this.isValidForm)
    {
      this.dmService.addEmployee(EmpDetails);
      this.dmService.employees.push(EmpDetails);    
      this.loadInitialData();
      this.isValidForm = false;   
      //console.log('Saveemployeebutton' + this.dmService.employees.length);
    }
  }
  Cancel()
  {
    this.location.back();
  }
  ngDestroy()
  {
    console.log('Add Emp Destroy');
  }

}