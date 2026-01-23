import {Component} from '@angular/core';
import {Markdown} from './markdown';

@Component({
  selector: 'md-root',
  imports: [Markdown],
  template: `
    <md-markdown />
  `,
})
export class App {
}
