import { Injectable } from '@angular/core';
import {
  APP_STATES_TYPE,
  Joke,
  JokeCategories,
  LOADING_STATE,
} from '../../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private _state!: BehaviorSubject<APP_STATES_TYPE>;
  public $state!: Observable<APP_STATES_TYPE>;

  private _jokes!: BehaviorSubject<Joke[]>;
  public $jokes!: Observable<Joke[]>;

  private _jokeCategories!: BehaviorSubject<JokeCategories>;
  public $jokeCategories!: Observable<JokeCategories>;

  constructor() {}

  init() {
    this._state = new BehaviorSubject<APP_STATES_TYPE>(LOADING_STATE);
    this.$state = this._state.asObservable();

    this._jokes = new BehaviorSubject<Joke[]>([]);
    this.$jokes = this._jokes.asObservable();

    this._jokeCategories = new BehaviorSubject<JokeCategories>([]);
    this.$jokeCategories = this._jokeCategories.asObservable();
  }
  setState(newState: APP_STATES_TYPE) {
    this._state.next(newState);
  }
  //
  getJokes() {
    return this._jokes.getValue();
  }
  setJokes(jokes: Joke[]) {
    this._jokes.next(jokes);
  }
  //
  getCategories() {
    return this._jokeCategories.getValue();
  }
  setCategories(categories: JokeCategories) {
    this._jokeCategories.next(categories);
  }
}
