import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  SecurityContext,
  TemplateRef,
  viewChild
} from '@angular/core';
import {NgComponentOutlet, PlatformLocation} from '@angular/common';
import {httpResource} from '@angular/common/http';
import {frontMatter} from './utils/front-matter';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {marked} from 'marked';
import {ActivatedNgPress, injectNgPress, type NgPressConfig} from 'ng-press-core';
import {getHeadingList, gfmHeadingId, HeadingData} from 'marked-gfm-heading-id';
import {routePath} from './utils/route-path';
import {DefaultPage} from './components/default-page';
import {Default404} from './components/default-404';
import {markedShiki} from './utils/shiki';
import sanitizeHtml from 'sanitize-html';


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
  protected readonly res = httpResource.text(() => `${this.prefix}${this.path() || 'index'}.md`);

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

    // we use marked-gfm-heading-id to generate heading IDs
    // and then extract the heading list later on
    const html = marked.use(markedShiki(), gfmHeadingId()).parse(markdown) as string;
    const heading = getHeadingList();

    // ensure that the HTML is safe
    // we allow style attributes on pre and span for shiki syntax highlighting
    // we allow id attributes on headings for heading links
    // the Angular sanitizer is not configurable enough for our needs
    const sanitized = sanitizeHtml(html, {
      allowedAttributes: {
        pre: ['style'],
        span: ['style'],
        h1: ['id'],
        h2: ['id'],
        h3: ['id'],
        h4: ['id'],
        h5: ['id'],
        h6: ['id'],
      }
    });

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
