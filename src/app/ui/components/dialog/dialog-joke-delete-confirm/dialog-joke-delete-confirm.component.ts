import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogJokeData } from '../../../../models';

@Component({
  selector: 'app-dialog-joke-delete-confirm',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './dialog-joke-delete-confirm.component.html',
  styleUrl: './dialog-joke-delete-confirm.component.scss',
})
export class DialogJokeDeleteConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogJokeDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogJokeData
  ) {}

  cancel() {
    this.dialogRef.close();
  }
}
