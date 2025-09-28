import {Component, inject, input} from '@angular/core';
import type {MenuItem} from '../types';
import {RouterLink} from '@angular/router';
import {CurrentPath} from '../services/current-path';

@Component({
  selector: 'np-navlist',
  imports: [
    RouterLink
  ],
  host: {
    '[class]': '"np-depth-"+depth()',
  },
  styles: `
  `,
  template: `
    @for (inner of items(); track $index) {
      <ul>
        @for (item of inner; track item.text) {
          <li [class]="itemClass(item.link)">
            @if (item.link) {
              <a [routerLink]="item.link"
                 [class]="linkClass(item.link)">{{ item.text }}</a>
            }
            @if (item.items) {
              <span class="category">{{ item.text }}</span>
              <np-navlist [items]="[item.items]"
                          [depth]="depth() + 1"></np-navlist>
            }
          </li>
        }
      </ul>
    }
  `,
})
export class Navlist {
  private readonly url = inject(CurrentPath);

  /**
   * Depth of the current navlist, used for indentation
   */
  readonly depth = input<number>(0);

  /**
   * Menu items to display
   */
  readonly items = input.required<MenuItem[][]>();

  // style helpers

  linkClass(url: string) {
    return url === this.url.path() ? 'active' : '';
  }

  itemClass(url: string | undefined) {
    return (url ?? '').startsWith(this.url.path()) ? 'includes' : ''
  }
}
