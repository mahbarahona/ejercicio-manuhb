import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { createTempId } from '../../../../utils/utils';
import { MatSelectModule } from '@angular/material/select';
import { AppStoreService } from '../../../../data/store/app-store.service';
import {
  DIALOG_JOKE_FORM_MODE,
  DialogJokeData,
  Joke,
  JokeCategories,
} from '../../../../models';
import { noWhitespaceValidator } from '../../../validators/validators';

@Component({
  selector: 'app-dialog-joke-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-joke-form.component.html',
  styleUrl: './dialog-joke-form.component.scss',
})
export class DialogJokeFormComponent implements OnInit {
  form!: FormGroup;
  titleText!: 'New Joke' | 'Edit Joke';
  actionText!: string;
  mode!: DIALOG_JOKE_FORM_MODE;
  categories!: JokeCategories;

  constructor(
    private store: AppStoreService,
    private dialogRef: MatDialogRef<DialogJokeFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: DialogJokeData
  ) {}

  ngOnInit() {
    this.mode = this.data.mode;
    this.categories = this.store.getCategories();
    this.form = this.createForm();
    this.titleText = this.isCreate() ? 'New Joke' : 'Edit Joke';
    this.actionText = this.isCreate() ? 'Create Joke' : 'Save';
  }
  private isCreate() {
    return this.mode === DIALOG_JOKE_FORM_MODE.CREATE;
  }
  private getDefaultFormData() {
    if (this.data.joke) return this.data.joke;
    const joke: Partial<Joke> = {
      quote: '',
      categories: [],
    };

    return joke;
  }
  private createForm() {
    const joke = this.getDefaultFormData();
    return this.fb.group({
      quote: [joke.quote, [Validators.required, noWhitespaceValidator()]],
      categories: [joke.categories],
    });
  }

  get quote() {
    return this.form.get('quote');
  }
  submit() {
    if (this.form.invalid) {
      console.warn('invalid form');
      return;
    }

    if (this.isCreate()) {
      const joke = {
        id: createTempId(),
        ...this.form.value,
      };
      this.dialogRef.close(joke);
    } else {
      const joke = {
        id: this.data.joke!.id,
        ...this.form.value,
      };
      this.dialogRef.close(joke);
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
