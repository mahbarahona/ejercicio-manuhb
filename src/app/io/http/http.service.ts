import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError, timeout } from 'rxjs';
import {
  Custom404Error,
  Custom500Error,
  CustomOfflineError,
  CustomUnknownError,
} from '../network/errors/errors';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private timeout = 10 * 1000;
  private retries = 3;

  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(url, { params }).pipe(
      timeout(this.timeout),
      retry(this.retries),
      catchError((error) => this.handleError(error))
    );
  }
  private handleError(error: HttpErrorResponse) {
    const isOffline = error.error instanceof ProgressEvent && !navigator.onLine;
    if (isOffline) {
      return throwError(() => new CustomOfflineError());
    }

    let customHttpError = new CustomUnknownError(error);
    switch (error.status) {
      case 404:
        customHttpError = new Custom404Error();
        break;
      case 500:
        customHttpError = new Custom500Error();
        break;
    }
    return throwError(() => customHttpError);
  }
}
