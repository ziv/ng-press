import {Component, inject} from '@angular/core';
import {CONFIG_TOKEN} from '../services/define-config';
import type {NgPressConfig} from '../types';
import {Configuration} from '../services/configuration';
import {Navlist} from './navlist';

@Component({
  selector: 'np-header',
  imports: [
    Navlist
  ],
  template: `
    <nav>
      <ul>
        <li><strong>{{ name }}</strong></li>
      </ul>
      <np-navlist [items]="topbar.items"/>
    </nav>
  `,
})
export class Header {
  protected readonly name = inject<NgPressConfig>(CONFIG_TOKEN).name;
  protected readonly topbar = inject(Configuration).conf.topbar;
}
