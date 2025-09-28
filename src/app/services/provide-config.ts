import {InjectionToken} from '@angular/core';
import type {NgPressConfig} from '../types';

export const CONFIG_TOKEN = new InjectionToken('ng-press-config');

export default function provideConfig(config: Partial<NgPressConfig>) {
  return {
    provide: CONFIG_TOKEN,
    useValue: config,
  };
}
