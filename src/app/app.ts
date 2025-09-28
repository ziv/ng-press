import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'np-root',
  imports: [RouterOutlet],
  template: '<router-outlet/>'
})
export default class App {
}
