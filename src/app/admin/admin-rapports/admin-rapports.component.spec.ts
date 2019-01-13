import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportsComponent } from './admin-rapports.component';

describe('AdminRapportsComponent', () => {
  let component: AdminRapportsComponent;
  let fixture: ComponentFixture<AdminRapportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRapportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
