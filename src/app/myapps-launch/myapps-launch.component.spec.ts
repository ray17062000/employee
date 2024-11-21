import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyAppsLaunchComponent } from './myapps-launch.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubscriptionsLibService } from '../../../../services/subscriptions-lib.service';
import { mockStore } from '@slb-portal-ui/data-layer';
import { provideMockStore } from '@ngrx/store/testing';

describe('MyAppsLaunchComponent', () => {
  let component: MyAppsLaunchComponent;
  let fixture: ComponentFixture<MyAppsLaunchComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<MyAppsLaunchComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MyAppsLaunchComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            selectedApplication: {
              endPoints: [{ region: 'US', endPoint: 'http://us.example.com' }],
            }
          },
        },
        provideMockStore({ initialState: mockStore }),
        SubscriptionsLibService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppsLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct heading', () => {
    const headingElement: HTMLElement = fixture.debugElement.query(
      By.css('.heading'),
    ).nativeElement;
    expect(headingElement.textContent).toContain(
      'Select Region to launch Desktop',
    );
  });

  it('should call closeModal when close button is clicked', () => {
    const closeButton: DebugElement = fixture.debugElement.query(
      By.css('#prev-page'),
    );
    closeButton.triggerEventHandler('click', null);
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should display regions if endPoints are available', () => {
    const regions = fixture.debugElement.queryAll(By.css('.regions'));
    expect(regions.length).toBe(1);
    expect(regions[0].nativeElement.textContent).toContain('US');
  });

  it('should call LaunchRegion with correct endpoint when Launch button is clicked', () => {
    spyOn(component, 'LaunchRegion');
    const launchButton: DebugElement = fixture.debugElement.query(
      By.css('button[slb-button]'),
    );
    launchButton.triggerEventHandler('click', null);
    expect(component.LaunchRegion).toHaveBeenCalledWith(
      'http://us.example.com',
    );
  });

  it('should open the correct URL when LaunchRegion is called', () => {
    component.myapps.code
    spyOn(window, 'open');
    component.LaunchRegion('http://us.example.com');
    expect(window.open).toHaveBeenCalledWith(
      'http://us.example.com',
      'http://us.example.com',
    );
  });
});
