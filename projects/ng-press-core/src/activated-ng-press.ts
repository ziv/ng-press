import {Injectable, signal, type TemplateRef} from '@angular/core';
import type {HeadingData} from 'marked-gfm-heading-id';
import type {NgPressConfig} from './primitives';

export type NgPressState = {
  conf: NgPressConfig;
  template: TemplateRef<unknown> | null;
  data: Record<string, unknown>;
  heading: HeadingData[];
}

/**
 * Service to hold the current state of the activated NgPress content.
 */
@Injectable({providedIn: 'root'})
export class ActivatedNgPress {
  readonly state = signal<NgPressState>({
    conf: {} as NgPressConfig,
    template: null,
    data: {},
    heading: [] as HeadingData[],
  });
}
