import {inject} from '@angular/core';
import {NG_PRESS_TOKEN, type NgPressConfig} from './primitives';

export function injectNgPress(): NgPressConfig {
  return inject(NG_PRESS_TOKEN);
}
