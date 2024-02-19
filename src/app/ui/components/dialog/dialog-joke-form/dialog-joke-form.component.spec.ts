import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJokeFormComponent } from './dialog-joke-form.component';

describe('DialogJokeFormComponent', () => {
  let component: DialogJokeFormComponent;
  let fixture: ComponentFixture<DialogJokeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogJokeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogJokeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
