import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {ActivatedNgPress} from './activated-ng-press';

@Component({
  selector: 'ngp-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: '<ng-container *ngTemplateOutlet="press.state().template" />'
})
export class NgPressContent {
  protected readonly press = inject(ActivatedNgPress);
}
