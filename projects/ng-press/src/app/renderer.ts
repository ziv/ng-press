import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  resource,
  TemplateRef,
  viewChild
} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedNgPress, injectNgPress, type NgPressConfig} from 'ng-press-core';
import {routePath} from './utils/route-path';
import {DefaultPage} from './components/default-page';
import {Default404} from './components/default-404';
import {CONTENT_LOADER, ContentLoader} from './loader/content-loader';
import {contentParser} from './utils/content-parser';

@Component({
  selector: 'ngp-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  template: `
    <ng-container [ngComponentOutlet]="comp()"/>
    <ng-template #contentTemplate>
      @if (parsed.hasValue()) {
        <div [innerHTML]="html()"></div>
      }
    </ng-template>
  `,
})
export class Renderer {
  // Configuration
  private readonly conf = injectNgPress();

  // Service required by this component
  private readonly sanitizer = inject(DomSanitizer);
  private readonly press = inject(ActivatedNgPress);
  private readonly loader = inject<ContentLoader>(CONTENT_LOADER);

  // Template reference for projecting Markdown content
  private readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('contentTemplate');

  // 1. Get the current route path as a signal
  private readonly path = routePath();

  // 2. Use the path signal to load a Markdown file dynamically
  private readonly res = resource({
    params: () => ({path: this.path()}),
    loader: async ({params}) => this.loader.load(params.path ?? ''),
    defaultValue: '',
  });

  // 3. Use the returned resource to parse both front-matter and Markdown content
  protected readonly parsed = resource({
    params: () => ({text: this.res.hasValue() ? this.res.value() : ''}),
    loader: async ({params}) => contentParser(params.text),
    defaultValue: {body: '', headings: [], data: {}},
  });

  // 4. Sanitized HTML content for rendering Markdown content
  protected readonly html = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.parsed.value().body));

  // 5. Dynamic component to render based on front-matter layout attribute
  protected readonly comp = computed(() => {
    if (this.parsed.error()) {
      return Default404;
    }

    if (this.parsed.isLoading()) {
      return null;
    }

    // determine layout from front-matter or default to 'page'
    const layout = String(this.parsed.value().data['layout'] ?? 'page') as keyof NgPressConfig['components'];

    // get the component from configuration or use default one
    if (layout in this.conf.components) {
      return this.conf.components[layout];
    }

    return DefaultPage;
  });

  constructor() {
    // 6. Update State
    effect(() => {
      // any time the parsed changed, update the ng-press state
      // the state is used by NgPressContent component
      // and can be used by other layout components as well
      const parsed = this.parsed.value();
      this.press.state.set({
        conf: this.conf,
        template: this.contentTemplate(),
        data: parsed.data,
        heading: parsed.headings,
      });
    });
  }
}

export default Renderer;
