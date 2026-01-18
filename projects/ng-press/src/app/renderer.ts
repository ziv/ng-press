import {ChangeDetectionStrategy, Component, computed, effect, inject, TemplateRef, viewChild} from '@angular/core';
import {NgComponentOutlet, PlatformLocation} from '@angular/common';
import {httpResource} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ActivatedNgPress, injectNgPress, type NgPressConfig} from 'ng-press-core';
import {HeadingData} from 'marked-gfm-heading-id';
import {frontMatter} from './utils/front-matter';
import {routePath} from './utils/route-path';
import {parseMarkdown} from './utils/markdown';
import {DefaultPage} from './components/default-page';
import {Default404} from './components/default-404';

export type ParsedFile = {
  body: SafeHtml;
  data: Record<string, unknown>;
  heading: HeadingData[];
  error: boolean;
  loading: boolean;
}

@Component({
  selector: 'ngp-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  template: `
    @if (comp()) {
      <ng-container [ngComponentOutlet]="comp()"/>
    }
    <ng-template #contentTemplate>
      <div [innerHTML]="parsed().body"></div>
    </ng-template>
  `,
})
export class Renderer {
  // Configuration
  protected readonly conf = injectNgPress();
  protected readonly prefix = inject(PlatformLocation).getBaseHrefFromDOM();

  // Service required by this component
  protected readonly sanitizer = inject(DomSanitizer);
  protected readonly press = inject(ActivatedNgPress);

  // Template reference for projecting Markdown content
  private readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('contentTemplate');

  // 1. Get the current route path as a signal
  readonly path = routePath();

  // 2. Use the path signal to load a Markdown file dynamically
  protected readonly res = httpResource.text(() => `${this.path() || 'index'}.md`);

  // 3. Use the returned resource to parse both front-matter and Markdown content
  protected parsed = computed<ParsedFile>(() => {
    if (this.res.error()) {
      return {body: '', data: {}, heading: [], error: true, loading: false};
    }

    if (this.res.isLoading()) {
      return {body: '', data: {}, heading: [], error: false, loading: true};
    }

    if (!this.res.hasValue()) {
      return {body: '', data: {}, heading: [], error: false, loading: false};
    }

    // parse front-matter
    const {data, markdown} = frontMatter(this.res.value());

    // ensure that the HTML is safe and get headings
    const {sanitized, heading} = parseMarkdown(markdown);

    // allow Angular to trust the HTML content
    const body = this.sanitizer.bypassSecurityTrustHtml(sanitized);

    return {body, data, heading, error: false, loading: false};
  });

  // 4. Dynamic component to render based on front-matter layout attribute
  protected readonly comp = computed(() => {
    const parsed = this.parsed();

    // render nothing
    if (parsed.loading) {
      return null;
    }

    // render 404 component
    if (parsed.error) {
      return Default404;
    }

    // determine layout from front-matter or default to 'page'
    const layout = String(parsed.data['layout'] ?? 'page') as keyof NgPressConfig['components'];

    // get the component from configuration or use default one
    return (layout in this.conf.components) ? this.conf.components[layout] : DefaultPage;

  });

  constructor() {
    // 5. Update State
    effect(() => {
      // any time the parsed changed, update the ng-press state
      // the state is used by NgPressContent component
      // and can be used by other layout components as well
      const parsed = this.parsed();
      this.press.state.set({
        conf: this.conf,
        template: this.contentTemplate(),
        data: parsed.data,
        heading: parsed.heading,
      });
    });
  }
}

export default Renderer;
