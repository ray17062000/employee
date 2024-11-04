import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DmAppServiceService } from '../dm-app-service.service';
import { Location} from '@angular/common';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  EmployeeData:any;
  EmpID:number;
  constructor(private route:ActivatedRoute, private location:Location,public dmService:DmAppServiceService) { }

  ngOnInit() {
    this.EmpID = Number(this.route.snapshot.paramMap.get('empID'));
    this.EmployeeData = this.dmService.employees.find(x=> x.id == this.EmpID );
  }
  updateEmployee(EmpDetails)
  {   
  //   this.dmService.employees = this.dmService.employees.map( item => {
  //     if(item.id == EmpDetails.id)
  //     {
  //       item.location = EmpDetails.location,
  //       item.mobile = EmpDetails.mobile,
  //       item.name = EmpDetails.name
  //     }     
  //     return item;
  //  });
    this.dmService.editEmployee(EmpDetails);
    this.location.back();
   //console.log('Saveemployeebutton' + this.dmService.employees.length);
  }
  Cancel()
  {
    this.location.back();
  }

}