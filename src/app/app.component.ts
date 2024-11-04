import { Component, VERSION } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Employee Management Application';// + VERSION.major;
  constructor(private router: Router){
    console.log('appcomponent constructer');
  }

  ngOnInit()
  {    
  } 

  gotoHome()
  {
    this.router.navigate(['']);
  }
  gotoAddemployee()
  {    
    this.router.navigate(['app-add-employee']);
  }
}
