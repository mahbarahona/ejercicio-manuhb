import { Injectable } from '@angular/core';
import { StorageService } from '../../io/storage/storage.service';
import { AppStoreService } from '../../data/store/app-store.service';
import { JokeLoaderService } from '../../data/loaders/joke-loader/joke-loader.service';
import { NavigationService } from '../../navigation/navigation.service';
import { ERROR_STATE, PAGES, READY_STATE } from '../../models';
import {
  Custom404Error,
  Custom500Error,
  CustomOfflineError,
  CustomUnknownError,
} from '../../io/network/errors/errors';

@Injectable({
  providedIn: 'root',
})
export class AppManagerService {
  constructor(
    private storage: StorageService,
    private store: AppStoreService,
    private jokeLoader: JokeLoaderService,
    private nav: NavigationService
  ) {}

  async init() {
    this.store.init();
    try {
      const { jokes, categories } = await this.localFirst();
      //
      this.store.setJokes(jokes);
      this.store.setCategories(categories);
      this.store.setState(READY_STATE);
    } catch (error: unknown) {
      if (error instanceof CustomOfflineError) {
        console.log('CustomOfflineError');
        this.store.setState(READY_STATE);
      } else if (error instanceof Custom404Error) {
        console.log('Custom404Error');
        this.store.setState(ERROR_STATE);
      } else if (error instanceof Custom500Error) {
        console.log('Custom500Error');
        this.store.setState(ERROR_STATE);
      } else if (error instanceof CustomUnknownError) {
        console.log('CustomUnknownError');
        this.store.setState(ERROR_STATE);
      }
    }
  }

  async localFirst() {
    const localData = this.storage.load();
    if (localData) {
      console.log('local data', localData);
      return localData;
    }

    const jokes = await this.jokeLoader.getJokes();
    const categories = await this.jokeLoader.getCategories();
    const data = {
      jokes,
      categories,
    };
    this.storage.save(data);
    console.log('API data', data);
    return data;
  }
}
