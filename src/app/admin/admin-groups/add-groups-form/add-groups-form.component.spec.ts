import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupsFormComponent } from './add-groups-form.component';

describe('AddGroupsFormComponent', () => {
  let component: AddGroupsFormComponent;
  let fixture: ComponentFixture<AddGroupsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
