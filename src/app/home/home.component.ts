import { Component, OnInit } from "@angular/core";
import { DmAppServiceService } from "../dm-app-service.service";
import { Router } from "@angular/router";
import { MyAppsLaunchComponent } from "../myapps-launch/myapps-launch.component";
import _ from 'lodash';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  inputVal: string = "";
  newList = ["1", "2", "3"];
  // newList = [{name: "abc"}, {name: "a b c"}, {name: "abc def"}];
  selectedApplication: any;
  applicationsList = [
    {
      code: "petrel",
      name: "Petrel",
      endPoints: [
        {
          endPoint:
            "https://platappspot.com/launch?app=[petrel]",
          region: "DEV",
        },
        {
          endPoint:
            "https://placom/launch?app=[petrel]",
          region: "Stage",
        },
      ],
      nameNew: "Petrel",
      url: "assets/images/delfi/new-petrel.ico",
    },
    {
      code: "studio",
      name: "Studio",
      endPoints: [
        {
          endPoint:
            "https://platfot.com/launch?app=[studio]",
          region: "DEV",
        },
        {
          endPoint:
            "https://platfot.com/launch?app=[studio]",
          region: "Stage",
        },
      ],
      nameNew: "Studio Manager",
      url: "assets/images/delfi/new-studio.ico",
    },
    {
      code: "techlog",
      name: "Techlog",
      endPoints: [
        {
          endPoint:
            "https://platfpot.com/launch?app=[techlog]",
          region: "DEV",
        },
      ],
      nameNew: "Techlog",
      url: "assets/images/delfi/new-techlog.ico",
    },
  ];
  windowName: any;
  constructor(public dmService: DmAppServiceService, private router: Router, public matDialog: MatDialog,
  ) {
    console.log("appcomponent constructer");
  }
  ngOnInit() {
    this.dmService.getAllEmployees();
    console.log("appcomponent ngOnInit");
  }
  editEmpDetails(empID) {
    this.router.navigate(["app-edit-employee/" + empID]);
  }
  deleteEmpDetails(empID) {
    //this.dmService.deleteEmployee(empID);
    this.dmService.employees = this.dmService.employees.filter(
      (x) => x.id != empID
    );
  }

  myAppsLaunch(code: string){
      this.selectedApplication = this.applicationsList.find(
        (app) => app.code === code,
      );
      if (this.selectedApplication && this.selectedApplication.endPoints && this.selectedApplication.endPoints.length > 0) {
        this.selectedApplication.endPoints = _.uniqBy(
          this.selectedApplication.endPoints,
          'region',
        );
      }
      if(this.selectedApplication && this.selectedApplication.endPoints?.length === 1){
        this.windowName = this.getInstance(this.selectedApplication.endPoints[0].endPoint).origin;
        if(this.selectedApplication.code === 'petrel'){
          window.open(this.windowName + '/launch?app=TGX-Desktop',this.windowName)
        }
        else{
          window.open(this.selectedApplication.endPoints[0].endPoint, this.windowName);
        }
      }
      else{
        this.matDialog.open(MyAppsLaunchComponent, {
          width: '40%',
          height: 'auto',
          disableClose: true,
          data: {
            selectedApplication: this.selectedApplication,
        }});
      }
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
