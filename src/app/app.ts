import {Component, computed, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './components/header';
import {Footer} from './components/footer';
import {Sidebar} from './components/sidebar';
import {CurrentUrl} from './services/current-url';
import {Hero} from './components/hero';

@Component({
  selector: 'np-root',
  imports: [RouterOutlet, Header, Footer, Sidebar, Hero],
  template: `
    <header class="container-fluid">
      <np-header/>
    </header>
    <div class="wrapper">

      <!-- Layout: sidebar -->
      @if (layout() === 'sidebar') {
        <aside>
          <np-sidebar/>
        </aside>
        <main class="container-fluid">
          <router-outlet/>
        </main>
      }

      <!-- Layout: full -->
      @if (layout() === 'hero') {
        <main class="container-fluid">
          <np-hero />
          <router-outlet/>
        </main>
      }

    </div>
    <footer>
      <np-footer/>
    </footer>
  `
})
export class App {
  private readonly url = inject(CurrentUrl);

  /**
   * Currently supports 'sidebar' and 'hero' layouts that infer from the URL.
   *
   * Should be extended to support more layouts and a way to configure them
   * per route using frontmatter.
   *
   * @protected
   */
  protected readonly layout = computed(() => this.url.url() === '/index' ? 'hero' : 'sidebar');
}
