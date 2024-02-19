import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '../../../io/http/http.service';
import {
  BackendJoke,
  HTTPGetSearchResponse,
  Joke,
  JokeCategories,
} from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class JokeLoaderService {
  private defaultCriteria = 'code';
  constructor(private http: HttpService) {}

  private jokeMapper(item: BackendJoke) {
    const joke: Joke = {
      id: item.id,
      quote: item.value,
      categories: item.categories || [],
    };
    return joke;
  }
  async getRandom() {
    const baseURL = environment.api.baseURL;
    const resource = environment.api.resource.jokes.random;
    const uri = `${baseURL}${resource}`;
    const response = await lastValueFrom(this.http.get<BackendJoke>(uri));
    const clean_random = this.jokeMapper(response);
    return clean_random;
  }
  async getJokes(criteria: string = this.defaultCriteria) {
    const params = new HttpParams().set('query', criteria);
    const baseURL = environment.api.baseURL;
    const resource = environment.api.resource.jokes.search;
    const uri = `${baseURL}${resource}`;
    //
    const response = await lastValueFrom(
      this.http.get<HTTPGetSearchResponse>(uri, params)
    );
    const result = response.result;
    const noneExplicitJokes = result.filter((j) =>
      j.categories?.every((c) => c !== 'explicit')
    );
    const cleanJokes: Joke[] = noneExplicitJokes.map((beJoke: BackendJoke) =>
      this.jokeMapper(beJoke)
    );
    return cleanJokes;
  }
  async getCategories() {
    const baseURL = environment.api.baseURL;
    const resource = environment.api.resource.jokes.categories;
    const uri = `${baseURL}${resource}`;
    const response = await lastValueFrom(this.http.get<JokeCategories>(uri));
    return response;
  }
}
