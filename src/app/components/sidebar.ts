import {Component, inject} from '@angular/core';
import {Navlist} from './navlist';
import {Configuration} from '../services/configuration';

@Component({
  selector: 'np-sidebar',
  imports: [Navlist],
  template: `
    <nav>
      <np-navlist [items]="sidebar.items"></np-navlist>
    </nav>
  `,
})
export class Sidebar {
  protected readonly sidebar = inject(Configuration).conf.sidebar;
}
