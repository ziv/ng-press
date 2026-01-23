import {computed, inject, Injectable} from '@angular/core';
import {NgPressCore} from './ng-press-core-service';
import {injectNgPress} from './utils';

/**
 * Service to hold the current state of the activated NgPress content.
 */
@Injectable({providedIn: 'root'})
export class ActivatedNgPress {
  private readonly core = inject(NgPressCore);

  readonly config = injectNgPress();
  readonly error = computed(() => this.core.error());
  readonly headings = computed(() => this.core.headings());
  readonly frontmatter = computed(() => this.core.data());
}
