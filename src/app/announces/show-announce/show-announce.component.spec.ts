import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnnounceComponent } from './show-announce.component';

describe('ShowAnnounceComponent', () => {
  let component: ShowAnnounceComponent;
  let fixture: ComponentFixture<ShowAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
