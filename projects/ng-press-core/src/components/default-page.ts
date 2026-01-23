import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgPressContent} from './ng-press-content';

@Component({
  selector: 'ngp-default-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgPressContent
  ],
  template: '<ngp-content />',
})
export class DefaultPage {
}
