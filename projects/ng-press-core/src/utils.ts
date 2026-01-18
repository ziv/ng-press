import {NG_PRESS_TOKEN, NgPressConfig} from './primitives';
import {inject, type Provider} from '@angular/core';

export function injectNgPress(): NgPressConfig {
  return inject(NG_PRESS_TOKEN);
}

export function provideNgPress(config: NgPressConfig): Provider {
  return {
    provide: NG_PRESS_TOKEN,
    useValue: config,
  };
}
