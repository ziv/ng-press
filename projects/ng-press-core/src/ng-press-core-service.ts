import {computed, inject, Injectable, resource, signal, Type} from '@angular/core';
import {Router} from '@angular/router';
import {CONTENT_LOADER, ContentLoader} from './ng-press-loader';
import {injectNgPress} from './utils';
import type {NgPressConfig} from './primitives';
import {DefaultPage} from './components/default-page';
import {ParsedContent} from './utils/content-parser';
import {DefaultError} from './components/default-error';

@Injectable({providedIn: 'root'})
export class NgPressCore {
  // Injected content loader service instance (server or client)
  private readonly loader = inject<ContentLoader>(CONTENT_LOADER);
  private readonly config = injectNgPress();

  // Holds the current route path
  private readonly path = signal(inject(Router).url.substring(1));

  // Holds loaded and parsed content
  private readonly parsed = resource<ParsedContent, { path: string; }>({
    params: () => ({path: this.path()}),
    loader: async ({params}) => this.loader.load(params.path),
    defaultValue: {body: '', headings: [], data: {}},
  });

  // public API

  readonly comp = computed<Type<unknown>>(() => {
    if (this.parsed.error()) {
      return DefaultError;
    }

    const data = String(this.data()['layout'] ?? 'page') as keyof NgPressConfig['components'];

    if (data in this.config.components) {
      return this.config.components[data]!;
    }
    return DefaultPage;
  });

  readonly error = computed(() => this.parsed.error());
  readonly html = computed(() => this.parsed.hasValue() ? this.parsed.value().body : '');
  readonly headings = computed(() => this.parsed.hasValue() ? this.parsed.value().headings : []);
  readonly data = computed(() => this.parsed.hasValue() ? this.parsed.value().data : {});
}
