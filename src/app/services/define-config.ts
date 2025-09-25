import {InjectionToken} from '@angular/core';
import type {NgPressConfig} from '../types';

export const CONFIG_TOKEN = new InjectionToken('ng-press-config');

export function provideConfig(config: Partial<NgPressConfig>) {
  return {
    provide: CONFIG_TOKEN,
    useValue: defineConfig(config)
  };
}

/**
 * Define the configuration for the application.
 * @param config
 */
export default function defineConfig(config: Partial<NgPressConfig>): NgPressConfig {
  return {
    name: config.name ?? 'NgPress',
    title: config.title ?? 'NgPress',
    copyright: config.copyright ?? '',

    sidebar: config.sidebar ?? {
      items: [],
    },
    topbar: config.topbar ?? {
      items: [],
    },

    shiki: config.shiki ?? {
      langs: [],
      theme: 'nord',
    }
  };
}
