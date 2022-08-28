import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskLabelComponent } from './add-task-label.component';

describe('AddTaskLabelComponent', () => {
  let component: AddTaskLabelComponent;
  let fixture: ComponentFixture<AddTaskLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
