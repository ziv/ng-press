import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {NgPressCore} from 'ng-press-core';

@Component({
  selector: 'ngp-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  template: `
    <ng-container [ngComponentOutlet]="core.comp()"/>
  `,
})
export class Renderer {
  protected readonly core = inject(NgPressCore);
}

export default Renderer;
