import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedNgPress, NgPressContent} from 'ng-press-core';
import {TableOfContent} from './table-of-content';

@Component({
  selector: 'ngp-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgPressContent,
    TableOfContent,
  ],
  template: `
    <header class="container">
      <nav>
        <ul>
          <li><strong>{{ press().conf.name }}</strong></li>
        </ul>
      </nav>
    </header>

    <main class="container">
<!--      <ngp-toc [headings]="press().heading" />-->
      <ngp-content/>
    </main>


    <footer class="container">
      footer
    </footer>
  `,
})
export class Page {
  protected readonly press = inject(ActivatedNgPress).state;
}
