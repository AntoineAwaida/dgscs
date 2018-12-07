import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkpackagesComponent } from './admin-workpackages.component';

describe('AdminWorkpackagesComponent', () => {
  let component: AdminWorkpackagesComponent;
  let fixture: ComponentFixture<AdminWorkpackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWorkpackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
