import {NG_PRESS_TOKEN, type NgPressConfig} from './primitives';
import type {Provider} from '@angular/core';

export function provideNgPress(config: NgPressConfig): Provider {
  return {
    provide: NG_PRESS_TOKEN,
    useValue: config,
  };
}
