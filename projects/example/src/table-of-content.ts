import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {HeadingData} from 'marked-gfm-heading-id';

@Component({
  selector: 'ngp-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @for (h of headings();track $index) {
      <div [style.padding-left.px]="(h.level - 1) * 16">
        <a [href]="'#' + h.id">{{ h.text }}</a>
      </div>
    }
  `,
})
export class TableOfContent {
  readonly headings = input.required<HeadingData[]>();
}
