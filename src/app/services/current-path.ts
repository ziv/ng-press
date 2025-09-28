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
export class CurrentPath {
  /**
   * Signal that emits the current URL after each navigation ends.
   * @private
   */
  private readonly end = toSignal(inject(Router).events.pipe(filter(e => e instanceof NavigationEnd)));

  /**
   * The current URL as a signal.
   */
  readonly path = computed(() => {
    const e = this.end();
    const p = e ? (e as NavigationEnd).url : '';
    return p.startsWith('/') ? p.substring(1) : p;
  });
}
