import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedNgPress, NgPressContent} from 'ng-press-core';

@Component({
  selector: 'ngp-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgPressContent,
  ],
  template: `
    <header class="container">
      <nav>
        <ul>
          <li><strong>{{ press.config.name }}</strong></li>
        </ul>
        <ul>
          <li><a href="/ng-press/">Home</a></li>
          <li><a href="/ng-press/about/">About</a></li>
        </ul>
      </nav>
    </header>
    <main class="container">
      <ngp-content/>
    </main>
  `,
})
export class Home {
  protected readonly press = inject(ActivatedNgPress);
}
