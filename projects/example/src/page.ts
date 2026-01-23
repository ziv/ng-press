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
          <li><strong>{{ press.config.name }}</strong></li>
        </ul>
        <ul>
          <li><a href="/ng-press">Home</a></li>
          <li><a href="/ng-press/about">About</a></li>
        </ul>
      </nav>
    </header>

    <main class="container">
      <aside>
        <ngp-toc [headings]="press.headings()"/>
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
  protected readonly press = inject(ActivatedNgPress);
}
