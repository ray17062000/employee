import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  private window;

  constructor() {
    this.window = getWindow();
  }

  private pingHome(obj) {
    if (obj) this.window.dataLayer.push(obj);
  }

  logPageView(url: string) {
    const hit = { event: 'content-view', pageName: url };
    this.pingHome(hit);
  }

  logEvent(event: string, category: string, action: string, label: string) {
    const hit = { event, category, action, label };
    this.pingHome(hit);
  }

  logCustomDimensionTest(name: string, value: string) {
    const hit = { event: name, value: value};
    this.pingHome(hit);
  }
}