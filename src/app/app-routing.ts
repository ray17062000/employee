import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import { DmAppServiceService } from './dm-app-service.service';

const myapproutes:Routes =[
  { path:'',component: HomeComponent },
  { path:'app-add-employee', component:AddEmployeeComponent},
  { path:'app-edit-employee/:empID', component:EditEmployeeComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(myapproutes)],
  exports: [RouterModule]
})
export class ApproutingModule { 

  constructor(private dmService:DmAppServiceService){
    console.log('ApproutingModule constructer');
    //this.dmService.getAllEmployees();
  }
}