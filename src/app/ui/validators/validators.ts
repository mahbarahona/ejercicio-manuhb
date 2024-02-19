import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.trim() === '') {
      return { noWhitespace: true };
    }
    return null;
  };
}
