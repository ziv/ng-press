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
  styles: `
    main {
      display: flex;
      flex-direction: row;
      gap: 1em;
    }
  `,
  template: `
    <header class="container">
      <nav>
        <ul>
          <li><strong>{{ press().conf.name }}</strong></li>
        </ul>
      </nav>
    </header>

    <main class="container">
      <aside>
        <ngp-toc [headings]="press().heading"/>
      </aside>
      <article>
        <ngp-content/>
      </article>
    </main>


    <footer class="container">
      footer
    </footer>
  `,
})
export class Page {
  protected readonly press = inject(ActivatedNgPress).state;
}
