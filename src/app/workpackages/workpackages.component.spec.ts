import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackagesComponent } from './workpackages.component';

describe('WorkpackagesComponent', () => {
  let component: WorkpackagesComponent;
  let fixture: ComponentFixture<WorkpackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
