import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkpackagesFormComponent } from './add-workpackages-form.component';

describe('AddWorkpackagesFormComponent', () => {
  let component: AddWorkpackagesFormComponent;
  let fixture: ComponentFixture<AddWorkpackagesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkpackagesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkpackagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
