import {toSignal} from '@angular/core/rxjs-interop';
import {computed, effect, inject, Injectable, resource, signal, Type} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs';
import {CONTENT_LOADER, ContentLoader} from './ng-press-loader';
import {contentParser, ParsedContent} from './utils/content-parser';
import {DefaultError} from './components/default-error';
import {injectNgPress} from './utils';
import type {NgPressConfig} from './primitives';
import {DefaultPage} from './components/default-page';

@Injectable({providedIn: 'root'})
export class NgPressCore {
  // Injected content loader service instance (server or client)
  private readonly loader = inject<ContentLoader>(CONTENT_LOADER);
  private readonly router = inject(Router);
  private readonly config = injectNgPress();

  // Holds the current route path
  private readonly path = signal(inject(Router).url.substring(1));

  // Holds raw loaded text content
  private readonly text = resource<string, { path: string; }>({
    params: () => ({path: this.path()}),
    loader: async ({params}) => this.loader.load(params.path),
    defaultValue: '',
  });

  // Holds parsed structured data
  protected readonly parsed = resource<ParsedContent, { text: string; }>({
    params: () => ({text: this.text.hasValue() ? this.text.value() : ''}),
    loader: async ({params}) => contentParser(params.text),
    defaultValue: {body: '', headings: [], data: {}},
  });

  // public API

  readonly comp = computed<Type<unknown>>(() => {
    if (this.text.error() || this.parsed.error()) {
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


  constructor() {
    const r = inject(Router);
    effect(() => {
      console.log('path:', this.path());
      console.log('cn:', r.url);
    })
  }
}
