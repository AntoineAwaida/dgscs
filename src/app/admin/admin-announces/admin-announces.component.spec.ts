import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncesComponent } from './admin-announces.component';

describe('AdminAnnouncesComponent', () => {
  let component: AdminAnnouncesComponent;
  let fixture: ComponentFixture<AdminAnnouncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnnouncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnnouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
