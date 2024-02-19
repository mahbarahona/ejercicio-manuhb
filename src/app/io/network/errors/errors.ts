import { HttpErrorResponse } from '@angular/common/http';

export class Custom404Error extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = 'Custom404Error';
    Object.setPrototypeOf(this, Custom404Error.prototype);
  }
}

export class Custom500Error extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.name = 'Custom500Error';
    Object.setPrototypeOf(this, Custom500Error.prototype);
  }
}

export class CustomOfflineError extends Error {
  constructor(message = 'No internet connection') {
    super('No internet connection');
    this.name = 'CustomOfflineError';
    Object.setPrototypeOf(this, CustomOfflineError.prototype);
  }
}

export class CustomUnknownError extends Error {
  constructor(error: HttpErrorResponse, message = 'An unknown error occurred') {
    super(message);
    this.name = 'CustomUnknownError';
    Object.setPrototypeOf(this, CustomUnknownError.prototype);
  }
}
