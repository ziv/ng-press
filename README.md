# NgPress

NgPress is an example application for a static site generator built with Angular.

This is an educational project and not production ready.

## Bring Your Own Components

NgPress allows you to bring your own Angular components to be used in your static site.

## Under the Hood

NgPress uses Angular's server-side pre-rendering (SSG) capabilities to generate static HTML files from Markdown content.

The application produce a static site using configuration that maps the content files into routes.

All routes are point to the same `Rendered` component that loads the Markdown file based on the current route, extracts the frontmatter metadata, and renders the content using the specified layout component.

## Getting Started

### Content

All content is written in Markdown files located in the `projects/ng-press/public` folder.

The content files support frontmatter for metadata and layout selection.

Example:

```markdown
---

title: Get Started
layout: page

---

# Article Header

This is the content of the article.
```

### Configuration

The configuration for NgPress is located in the [`app.config.ts`](./projects/ng-press/src/app/app.config.ts) file.

All content files should be registered in the `content` array of the configuration to be included in the static site.

The components used for rendering the content can be customized by providing your own components in the `components` object of the configuration.

```ts
import {provideNgPress} from 'ng-press-core';
import {Page} from 'example';

export const appConfig = {
  providers: [
    provideNgPress({
      name: 'Site name',
      title: 'Site title',

      // Bring your own components here
      components: {
        page: Page,
      },

      // Register your content files here
      content: [
        {
          title: 'Welcome to NgPress',
          // file path translated to `<base>/index.md`
          link: '',
        },
        {
          title: 'Get Started',
          // file path translated to `<base>/content/get-started.md`
          link: 'content/get-started',
        }
      ]
    }),
  ]
};

```

### Layouts

Layouts are Angular components that define the structure of your content pages.

Minimal implementation for a layout component:

```ts
import {NgPressContent} from 'ng-press-core';

@Component({
  selector: 'minimal-layout',
  imports: [NgPressContent],
  template: '<ngp-content/>',
})
export class MinimalLayout {
}
```

The `<ngp-content/>` component is used to render the content of the Markdown page within the layout.

Set a map of components to be used as layouts in the `components` object of the NgPress configuration.

```ts
{
  components: {
    minimal: MinimalLayout
  }
}

```

Define the layout to be used for a content file in the frontmatter of the Markdown file:

```markdown
---
title: Get Started
layout: minimal
---
```

More complex layout components can get access to the current state using the `ActivatedNgPress` service:

```ts

import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {ActivatedNgPress, NgPressContent} from 'ng-press-core';

@Component({
  selector: 'ngp-page',
  imports: [
    JsonPipe,
    NgPressContent,
  ],
  template: `
    <main>
     <p>Main content:</p>
      <ngp-content/>

      <h3>Inputs)</h3>
      <p>front matter parsed data</p>
      <pre>{{ press().data | json }}</pre>
      
      <h3>Content Heading</h3>
      <p>The heading extracted from the markdown content</p>
      <pre>{{ press().heading | json }}</pre>
      
    </main>
  `,
})
export class Page {
  protected readonly press = inject(ActivatedNgPress).state;
}
```

For more details see the [ActivatedNgPress](./projects/ng-press-core/src/activated-ng-press.ts) implementation.

## Building the Static Site

Build the dependent projects and then the NgPress project:

```shell
ng build ng-press-core
ng build example # or your layout project
ng build ng-press
```

The static site will be generated in the `dist/ng-press/browser` folder. You can then deploy this folder to your web server or hosting service.
