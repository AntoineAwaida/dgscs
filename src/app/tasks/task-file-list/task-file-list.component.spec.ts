import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFileListComponent } from './task-file-list.component';

describe('TaskFileListComponent', () => {
  let component: TaskFileListComponent;
  let fixture: ComponentFixture<TaskFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
