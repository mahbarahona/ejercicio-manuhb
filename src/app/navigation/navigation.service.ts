import { Injectable } from '@angular/core';
import { PAGES } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  goTo(page: PAGES) {
    this.router.navigate([page]);
  }
}
