import { Component, Inject, VERSION } from '@angular/core';

import { Router } from '@angular/router';
import { GoogleAnalyticsService } from './google-analytics.servive';
import { DataLayerService } from './dataLayaer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Employee Management Application';// + VERSION.major;
  constructor(private router: Router, private googleAnalyticsService: GoogleAnalyticsService,  @Inject(DataLayerService) private dataLayerService: DataLayerService){
    console.log('appcomponent constructer');
  }

  ngOnInit()
  {    
    this.googleAnalyticsService.loadGoogleAnalytics();
    // this.dataLayerService.logCustomDimensionTest("email_domain", "nihaan2");
    this.googleAnalyticsService.setDomainProperties();
  } 

  gotoHome()
  {
    this.router.navigate(['']);
  }
  gotoAddemployee()
  {    
    this.router.navigate(['app-add-employee']);
  }

  loadTheButtonAnalytics(event: string){
    this.googleAnalyticsService.trackEvent(event, event)
  }
}
