// constants
export const LOADING_STATE: APP_STATES_TYPE = 'LOADING';
export const READY_STATE: APP_STATES_TYPE = 'READY';
export const OFFLINE_STATE: APP_STATES_TYPE = 'OFFLINE';
export const ERROR_STATE: APP_STATES_TYPE = 'ERROR';
export const DIALOG_WIDTH = '500px';
// types
export type APP_STATES_TYPE = 'LOADING' | 'READY' | 'ERROR' | 'OFFLINE';
export type JokeCategories = string[];
// enum
export enum PAGES {
  HOME = 'home',
}
export enum DIALOG_JOKE_FORM_MODE {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}
// interfaces
export interface Joke {
  id: string;
  quote: string;
  categories: JokeCategories;
}
export interface DialogJokeData {
  mode: DIALOG_JOKE_FORM_MODE;
  joke?: Joke;
}
export interface BackendJoke {
  icon_url: string;
  id: string;
  url: string;
  value: string;

  categories?: JokeCategories;
  created_at?: string;
  updated_at?: string;
}
export interface HTTPGetSearchResponse {
  total: number;
  result: BackendJoke[];
}
export interface StorageData {
  categories: JokeCategories;
  jokes: Joke[];
}
