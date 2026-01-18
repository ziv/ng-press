import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'np-default-404',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<p>Page not found</p>',
})
export class Default404 {
}
