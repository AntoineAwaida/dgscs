import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WptaskComponent } from './wptask.component';

describe('WptaskComponent', () => {
  let component: WptaskComponent;
  let fixture: ComponentFixture<WptaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WptaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WptaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
