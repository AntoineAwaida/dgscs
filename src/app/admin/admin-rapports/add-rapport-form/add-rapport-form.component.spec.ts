import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRapportFormComponent } from './add-rapport-form.component';

describe('AddRapportFormComponent', () => {
  let component: AddRapportFormComponent;
  let fixture: ComponentFixture<AddRapportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRapportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRapportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
