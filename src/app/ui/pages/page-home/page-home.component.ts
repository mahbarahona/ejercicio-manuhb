import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardJokeComponent } from '../../components/card/card-joke/card-joke.component';
import { AppStoreService } from '../../../data/store/app-store.service';
import { JokeReducerService } from '../../../data/reducers/joke-reducer.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogJokeFormComponent } from '../../components/dialog/dialog-joke-form/dialog-joke-form.component';
import { Subscription, filter } from 'rxjs';
import { HomeLoadingComponent } from '../../components/home-loading/home-loading.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { fadeInFromBottom, scaleDown } from '../../animations/animations';
import {
  APP_STATES_TYPE,
  DIALOG_JOKE_FORM_MODE,
  DIALOG_WIDTH,
  ERROR_STATE,
  Joke,
  LOADING_STATE,
  READY_STATE,
} from '../../../models';
import { MatCardModule } from '@angular/material/card';
import { AppManagerService } from '../../../core/app-manager/app-manager.service';
import { TimerService } from '../../../utils/timer/timer.service';
import { sleep } from '../../../utils/utils';
import { NetworkStatusService } from '../../../io/network/network-status/network-status.service';
@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    CardJokeComponent,
    HomeLoadingComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  animations: [scaleDown, fadeInFromBottom],
  providers: [TimerService],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
})
export class PageHomeComponent implements OnInit, OnDestroy {
  localState!: APP_STATES_TYPE;
  online = true;
  LOADING = LOADING_STATE;
  READY = READY_STATE;
  ERROR = ERROR_STATE;

  jokes!: Joke[];
  firstTime = true;
  subs$ = new Subscription();
  loadingDuration = 500;

  //
  debug = false;
  //
  constructor(
    private app: AppManagerService,
    private store: AppStoreService,
    private jokeReducer: JokeReducerService,
    private dialog: MatDialog,
    private network: NetworkStatusService,
    private timer: TimerService
  ) {}
  ngOnDestroy() {
    this.subs$?.unsubscribe();
  }
  ngOnInit() {
    this.app.init();
    this.timer.start();

    const WhenAppStateChange = this.store.$state.subscribe(
      async (state: APP_STATES_TYPE) => {
        switch (state) {
          case LOADING_STATE:
            break;
          case READY_STATE:
            if (this.firstTime) {
              const duration = this.timer.stop();
              if (duration < this.loadingDuration) {
                await sleep(this.loadingDuration - duration);
              }
              this.firstTime = false;
            }
            break;
          case ERROR_STATE:
            break;
        }
        this.localState = state;
      }
    );
    const whenJokesChange = this.store.$jokes.subscribe(
      (jokes) => (this.jokes = jokes)
    );

    this.subs$.add(whenJokesChange);
    this.subs$.add(WhenAppStateChange);
  }
  //
  openCreate() {
    const dialogRef = this.dialog.open(DialogJokeFormComponent, {
      width: DIALOG_WIDTH,
      data: {
        mode: DIALOG_JOKE_FORM_MODE.CREATE,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((joke) => Boolean(joke)))
      .subscribe((joke) => this.jokeReducer.create(joke));
  }

  // debug
  changeState(newstate: any) {
    if (newstate === 'OFFLINE') {
      this.network.toggle();
    } else {
      this.store.setState(newstate);
    }
  }
}
