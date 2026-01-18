import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgPressContent} from 'ng-press-core';

@Component({
  selector: 'np-default-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgPressContent],
  template: '<ngp-content/>'
})
export class DefaultPage {
}
