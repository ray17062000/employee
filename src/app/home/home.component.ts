import { Component, OnInit } from '@angular/core';
import { DmAppServiceService } from '../dm-app-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  inputVal:string = '';
  applicationsList = ['1', '2', '3'];
  constructor(public dmService:DmAppServiceService, private router:Router){
    console.log('appcomponent constructer');    
  }
  ngOnInit()
  {
    this.dmService.getAllEmployees();
    console.log('appcomponent ngOnInit');
  }
  editEmpDetails(empID)
  {
    this.router.navigate(['app-edit-employee/' +empID]);  
  }
  deleteEmpDetails(empID)
  {
    //this.dmService.deleteEmployee(empID);
    this.dmService.employees = this.dmService.employees.filter(x => x.id != empID);    
  }
}