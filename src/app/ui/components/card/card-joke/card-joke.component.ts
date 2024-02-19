import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DIALOG_JOKE_FORM_MODE, DIALOG_WIDTH, Joke } from '../../../../models';
import { DialogJokeFormComponent } from '../../dialog/dialog-joke-form/dialog-joke-form.component';
import { DialogJokeDeleteConfirmComponent } from '../../dialog/dialog-joke-delete-confirm/dialog-joke-delete-confirm.component';
import { JokeReducerService } from '../../../../data/reducers/joke-reducer.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-card-joke',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
  ],
  templateUrl: './card-joke.component.html',
  styleUrl: './card-joke.component.scss',
})
export class CardJokeComponent {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  @Input({ required: true }) joke!: Joke;

  constructor(
    private jokeService: JokeReducerService,
    public dialog: MatDialog
  ) {}

  openEdit() {
    const dialogRef = this.dialog.open(DialogJokeFormComponent, {
      width: DIALOG_WIDTH,
      data: {
        mode: DIALOG_JOKE_FORM_MODE.EDIT,
        joke: this.joke,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((joke: Joke) => Boolean(joke)))
      .subscribe((joke: Joke) => this.jokeService.update(joke));
  }
  confirmDelete() {
    const dialogRef = this.dialog.open(DialogJokeDeleteConfirmComponent, {
      data: { joke: this.joke },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result: boolean) => Boolean(result)))
      .subscribe((result: boolean) => this.jokeService.remove(this.joke.id));
  }
}
