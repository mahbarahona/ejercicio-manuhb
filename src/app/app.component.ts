import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NetworkStatusService } from './io/network/network-status/network-status.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Ejercicio Manuhb';
  online = true;

  constructor(private network: NetworkStatusService) {}
  ngOnInit() {
    this.network.$online.subscribe((status) => (this.online = status));
  }
}
