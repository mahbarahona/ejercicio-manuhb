import { Injectable } from '@angular/core';
import { AppStoreService } from '../store/app-store.service';
import { SnackbarService } from '../../ui/services/snackbar/snackbar.service';
import { Joke } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class JokeReducerService {
  constructor(
    private store: AppStoreService,
    private snackbar: SnackbarService
  ) {}
  create(joke: Joke) {
    const jokes = this.store.getJokes();
    jokes.unshift(joke);
    this.store.setJokes(jokes);
    this.snackbar.open('Joke successfully created.');
  }
  update(joke: Joke) {
    const jokes = this.store.getJokes();
    const jokeIndex = jokes.findIndex((j) => j.id === joke.id);
    jokes[jokeIndex] = joke;
    this.store.setJokes(jokes);
    this.snackbar.open('Joke Saved.');
  }
  remove(id: string) {
    const jokes = this.store.getJokes();
    const newJokes = jokes.filter((j) => j.id !== id);
    this.store.setJokes(newJokes);
    this.snackbar.open('Joke deleted.');
  }
}
