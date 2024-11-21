import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'slb-myapps-launch',
  templateUrl: './myapps-launch.component.html',
  styleUrls: ['./myapps-launch.component.scss'],
})
export class MyAppsLaunchComponent implements OnInit {
  public myapps: any;
  public windowName: any;
  tgx: any;

  constructor(
    public dialogRef: MatDialogRef<MyAppsLaunchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {

    if(this.data.selectedApplication){
      this.myapps = this.data.selectedApplication
      this.myapps.endPoints.sort((a, b) => a.region.localeCompare(b.region));
    }
    else {
      this.myapps = this.data;
      this.myapps.sort((a, b) => a.region.localeCompare(b.region));
    }
  }

  public closeModal(): void {
    this.dialogRef.close(null);
  }
  
  public LaunchRegion(event) {
    this.windowName = this.getInstance(event).origin;
    if(this.data.applicationSpecific && this.data.applicationSpecific.includes(this.myapps.code)){
      window.open(this.windowName + '/launch?app=TGX-Desktop',this.windowName)
    }
    else{
      window.open(event, this.windowName);
    }
    this.closeModal();
  }

  public getInstance(url) {
    try{
      const newHost = new URL(url);
      newHost.search = '';
      return newHost;
    }
    catch (error){
      return url?.split("?")[0];
    }
  }
}
