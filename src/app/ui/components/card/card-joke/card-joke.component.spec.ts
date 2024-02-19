import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJokeComponent } from './card-joke.component';

describe('CardJokeComponent', () => {
  let component: CardJokeComponent;
  let fixture: ComponentFixture<CardJokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardJokeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
