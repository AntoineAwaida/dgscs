import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpchatComponent } from './wpchat.component';

describe('WpchatComponent', () => {
  let component: WpchatComponent;
  let fixture: ComponentFixture<WpchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
