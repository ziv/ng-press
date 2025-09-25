import {Component, computed, effect, inject, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {CurrentUrl} from './services/current-url';
import {Vendor} from './services/vendor';

@Component({
  selector: 'np-doc',
  template: `
    <div [innerHTML]="inner()"></div>
  `
})
export default class Doc {
  // services
  sanitize = inject(DomSanitizer);
  url = inject(CurrentUrl);

  // resources
  marked = inject(Vendor).marked;

  /**
   * Path to the markdown file
   * @protected
   */
  protected readonly path = computed(() => {
    const url = this.url.url();
    if (!url) {
      return undefined;
    }
    // do not allow URL injection
    if (url.startsWith('http')) {
      return undefined;
    }
    return `${url}.md`;
  })

  /**
   * Sanitized HTML content
   * @protected
   */
  protected readonly inner = signal<SafeHtml>(this.sanitize.bypassSecurityTrustHtml(''));

  /**
   * Raw markdown content loaded from the server
   * @protected
   */
  protected readonly content = httpResource.text<string>(() => this.path(), {defaultValue: ''});

  constructor() {
    effect(async () => {
      const parsed = await this.marked!.parse(this.content.value());
      this.inner.set(this.sanitize.bypassSecurityTrustHtml(parsed));
    });
  }
}
