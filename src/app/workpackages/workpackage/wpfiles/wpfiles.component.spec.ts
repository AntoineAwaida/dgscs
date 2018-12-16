import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpfilesComponent } from './wpfiles.component';

describe('WpfilesComponent', () => {
  let component: WpfilesComponent;
  let fixture: ComponentFixture<WpfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
