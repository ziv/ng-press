import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedNgPress} from '../activated-ng-press';

@Component({
  selector: 'ngp-default-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <h1>Error</h1>
      @if (press.error()?.message) {
        <p>{{ press.error()?.message }}</p>
      } @else {
        <p>An unknown error occurred.</p>
      }
    </article>
  `,
})
export class DefaultError {
  protected readonly press = inject(ActivatedNgPress);
}
