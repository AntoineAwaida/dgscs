import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportFormComponent } from './add-report-form.component';

describe('AddReportFormComponent', () => {
  let component: AddReportFormComponent;
  let fixture: ComponentFixture<AddReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
