import {computed, inject, Injectable} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

/**
 * Used instead of ActivatedRoute to get the current URL as a signal.
 * This is because we do not have routes definition, we use '**' to catch all routes.
 * So ActivatedRoute will not work as expected.
 */
@Injectable({providedIn: 'root'})
export class CurrentUrl {
  /**
   * Signal that emits the current URL after each navigation ends.
   * @private
   */
  private readonly end = toSignal(inject(Router).events.pipe(filter(e => e instanceof NavigationEnd)));

  /**
   * The current URL as a signal.
   */
  readonly url = computed(() => {
    const e = this.end();
    if (!e) {
      return '/';
    }
    return (e as NavigationEnd).url;
  })
}
