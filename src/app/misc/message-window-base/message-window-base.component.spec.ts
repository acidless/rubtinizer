import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWindowBaseComponent } from './message-window-base.component';

describe('MessageWindowBaseComponent', () => {
  let component: MessageWindowBaseComponent;
  let fixture: ComponentFixture<MessageWindowBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageWindowBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageWindowBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
