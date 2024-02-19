import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInFromBottom = trigger('fadeInFromBottom', [
  transition(':enter', [
    style({ transform: 'translateY(50px)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
]);
export const scaleDown = trigger('scaleDown', [
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1 }),
    animate('500ms ease-out', style({ transform: 'scale(0)', opacity: 0 })),
  ]),
]);
