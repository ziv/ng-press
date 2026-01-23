import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgPressCore} from '../ng-press-core-service';

@Component({
  selector: 'ngp-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<div [innerHTML]="inner()"></div>'
})
export class NgPressContent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly core = inject(NgPressCore);

  protected inner = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.core.html()));
}
