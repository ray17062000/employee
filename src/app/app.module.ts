import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HelloComponent } from './hello.component';
import { DmAppServiceService } from './dm-app-service.service';
import { NamefilterPipe } from './namefilter.pipe';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component'
import { ApproutingModule } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
//import {Routes,Router,RouterModule} from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, ApproutingModule, HttpClientModule,HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  )],
  declarations: [
    AppComponent,
    HomeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    HelloComponent,
    NamefilterPipe
  ],
  bootstrap: [AppComponent],
  providers: [DmAppServiceService]
})
export class AppModule {}
