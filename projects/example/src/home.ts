import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedNgPress, NgPressContent} from 'ng-press-core';

@Component({
  selector: 'ngp-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgPressContent,
  ],
  template: `
    <main class="container">
      <ngp-content/>
    </main>
  `,
})
export class Home {
  protected readonly press = inject(ActivatedNgPress).state;
}
