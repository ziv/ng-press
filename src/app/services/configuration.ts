import {inject, Injectable} from '@angular/core';
import {CONFIG_TOKEN} from './define-config';
import type {NgPressConfig} from '../types';

@Injectable({providedIn: 'root'})
export class Configuration {
  conf = inject<NgPressConfig>(CONFIG_TOKEN);
}
