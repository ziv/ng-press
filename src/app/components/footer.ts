import {Component, inject} from '@angular/core';
import {Configuration} from '../services/configuration';

@Component({
  selector: 'np-footer',
  template: `
    <div class="center">
      @if (copyright) {
        <small class="copyright">{{ copyright }}</small>
      }
    </div>
  `,
  styles: `
    .center {
      text-align: center;
    }
  `
})
export class Footer {
  protected readonly copyright = inject(Configuration).conf.copyright;
}
