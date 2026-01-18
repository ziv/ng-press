import {InjectionToken, type Type} from '@angular/core';

export const NG_PRESS_TOKEN = new InjectionToken<NgPressConfig>('ng-press-token');

export type ContentItem = {
  title: string;
  link: string;
  tags?: string[];
}

export type NgPressConfig = {
  title: string;
  name: string;

  /**
   * Components used to render different content types (layouts)
   */
  components: Record<string, Type<unknown>>;

  /**
   * Content items to be included in the site
   */
  content: ContentItem[];
};


