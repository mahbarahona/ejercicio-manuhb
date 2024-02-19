import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJokeDeleteConfirmComponent } from './dialog-joke-delete-confirm.component';

describe('DialogJokeDeleteConfirmComponent', () => {
  let component: DialogJokeDeleteConfirmComponent;
  let fixture: ComponentFixture<DialogJokeDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogJokeDeleteConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogJokeDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
