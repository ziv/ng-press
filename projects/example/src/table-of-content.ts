import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {HeadingData} from 'marked-gfm-heading-id';
import {routePath} from './route-path';

@Component({
  selector: 'ngp-toc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @for (h of headings();track $index) {
      <div [style.padding-left.px]="(h.level - 1) * 16">
        <a [href]="path() + '#' + h.id">{{ h.text }}</a>
      </div>
    }
  `,
})
export class TableOfContent {
  readonly path = routePath();
  // todo add base href to anchor links
  readonly headings = input.required<HeadingData[]>();
}
