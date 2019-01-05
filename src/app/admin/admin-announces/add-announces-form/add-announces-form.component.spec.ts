import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnouncesFormComponent } from './add-announces-form.component';

describe('AddAnnouncesFormComponent', () => {
  let component: AddAnnouncesFormComponent;
  let fixture: ComponentFixture<AddAnnouncesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnnouncesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnnouncesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
