import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFileEditDialogComponent } from './task-file-edit-dialog.component';

describe('TaskFileEditDialogComponent', () => {
  let component: TaskFileEditDialogComponent;
  let fixture: ComponentFixture<TaskFileEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFileEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFileEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
