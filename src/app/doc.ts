import {Component, computed, effect, inject, viewChild} from '@angular/core';
import {CurrentPath} from './services/current-path';
import {Markdown} from '@xprng/markdown';
import {ErrorState} from '@xprng/common';
import {Title} from '@angular/platform-browser';
import type {NgPressConfig} from './types';
import {CONFIG_TOKEN} from './services/provide-config';
import {Navlist} from './components/navlist';
import {PlatformLocation} from '@angular/common';


@Component({
  selector: 'np-doc',
  imports: [
    Markdown,
    ErrorState,
    Navlist
  ],
  template: `
    <!-- header -->
    <header class="container-fluid">
      <nav>
        <ul>
          <li><strong>{{ conf.name }}</strong></li>
        </ul>
        <np-navlist [items]="conf.topbar.items"/>
      </nav>
    </header>

    <!-- main content -->
    <div class="wrapper">

      @if (showSidebar()) {
        <aside>
          <np-navlist [items]="conf.sidebar.items"/>
        </aside>
      }

      <main class="container-fluid">
        <xpr-markdown [src]="src()" [theme]="conf.shiki.theme">
          <xpr-error-state>
            <p>404 - Page not found</p>
          </xpr-error-state>
        </xpr-markdown>
        <pre>{{ src() }}</pre>
      </main>
    </div>

    <!-- footer -->
    <footer>
      @if (conf.footerText) {
        <small>{{ conf.footerText }}</small>
      }
    </footer>
  `
})
export default class Doc {
  protected readonly baseHref = inject(PlatformLocation).getBaseHrefFromDOM();
  protected readonly md = viewChild(Markdown);
  protected readonly path = inject(CurrentPath);
  protected readonly conf = inject<NgPressConfig>(CONFIG_TOKEN);


  protected showSidebar() {
    return this.layout() !== 'hero';
  }

  /**
   * Path to the markdown file
   */
  protected readonly src = computed(() => {
    const path = this.path.path() || 'index';
    return `https://ziv.github.io/ng-press/${path}.md`
  });

  /**
   * Frontmatter of the current markdown file
   */
  protected readonly frontmatter = computed(() => this.md()?.frontmatter() ?? {});

  /**
   * Layout of the current document (from frontmatter, defaults to 'default')
   */
  protected readonly layout = computed(() => this.frontmatter()['layout'] ?? 'default');

  constructor() {
    const title = inject(Title);
    effect(() => {
      const fm = this.frontmatter();
      if (fm['title']) {
        title.setTitle(fm['title']);
      }
    });
  }
}
