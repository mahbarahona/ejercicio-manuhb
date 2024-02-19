import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-home-loading',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './home-loading.component.html',
  styleUrl: './home-loading.component.scss',
})
export class HomeLoadingComponent {}
