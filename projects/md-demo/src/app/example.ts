export default `
---
title: Markdown Feature Showcase
layout: page
---

# Markdown Feature Showcase

This page demonstrates all the major Markdown features supported by NgPress, showcasing the full power of GitHub-flavored Markdown rendering.

## Text Formatting

You can make text **bold** using double asterisks, or make it *italic* using single asterisks. You can also combine them for ***bold and italic*** text.

For ~~strikethrough~~ text, use double tildes.

You can use \`inline code\` by wrapping text in backticks.

## Headings

Markdown supports six levels of headings:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Lists

### Unordered Lists

- First item
- Second item
- Third item
  - Nested item 1
  - Nested item 2
    - Deeply nested item
- Fourth item

You can also use asterisks or plus signs:

* Item A
* Item B
+ Item C

### Ordered Lists

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

### Task Lists

- [x] Complete the code review
- [x] Write comprehensive tests
- [ ] Add documentation
- [ ] Deploy to production

---

## Links and References

Here's a [link to Angular](https://angular.dev) documentation.

You can also use reference-style links: [Angular Documentation][angular-docs]

[angular-docs]: https://angular.dev

Automatic linking for URLs: https://github.com/anthropics/claude-code

---

## Code Blocks

### Inline Code

Use the \`inject()\` function instead of constructor injection in Angular.

### Code Blocks with Syntax Highlighting

#### TypeScript

\`\`\`typescript
import { Component, inject, signal } from '@angular/core';
import { ActivatedNgPress, NgPressContent } from 'ng-press-core';

@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgPressContent],
  template: \`
    <header>
      <h1>{{ title() }}</h1>
    </header>
    <main>
      <ngp-content/>
    </main>
  \`
})
export class ExampleComponent {
  protected readonly press = inject(ActivatedNgPress).state;
  protected readonly title = signal('Welcome to NgPress');
}
\`\`\`

#### JavaScript

\`\`\`javascript
class DataService {
  constructor() {
    this.cache = new Map();
  }

  async fetchData(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const data = await fetch(\`/api/data/\${key}\`).then(r => r.json());
    this.cache.set(key, data);
    return data;
  }
}
\`\`\`

#### HTML

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NgPress Example</title>
</head>
<body>
  <ngp-root></ngp-root>
</body>
</html>
\`\`\`

#### CSS

\`\`\`css
:root {
  --primary-color: #1976d2;
  --accent-color: #ff4081;
  --text-color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #1565c0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
\`\`\`

#### Shell/Bash

\`\`\`bash
# Install Angular CLI globally
npm install -g @angular/cli

# Create a new Angular project
ng new my-project

# Build the NgPress projects
ng build ng-press-core
ng build example
ng build ng-press

# Serve the application
ng serve
\`\`\`

#### JSON

\`\`\`json
{
  "name": "ng-press",
  "version": "1.0.0",
  "description": "Static site generator built with Angular",
  "scripts": {
    "build": "ng build",
    "test": "ng test",
    "serve": "ng serve"
  },
  "dependencies": {
    "@angular/core": "^21.0.0",
    "marked": "^11.0.0",
    "yaml": "^2.3.0"
  }
}
\`\`\`

---

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

You can nest blockquotes:

> This is a first-level quote.
>
> > This is a nested quote.
> >
> > > And this is a third-level quote.

You can also include other Markdown elements in blockquotes:

> **Note:** NgPress uses Angular's built-in SSG capabilities.
>
> - No external static site generators needed
> - Full TypeScript support
> - Component-based architecture

---

## Tables

Tables are a great way to organize data:

| Feature | NgPress | Jekyll | Hugo | Next.js |
|---------|---------|--------|------|---------|
| **Framework** | Angular | Ruby | Go | React |
| **Type Safety** | ✅ Full | ❌ None | ⚠️ Partial | ✅ Full |
| **Components** | ✅ Native | ❌ No | ❌ No | ✅ Native |
| **SSG Support** | ✅ Built-in | ✅ Yes | ✅ Yes | ✅ Yes |
| **Learning Curve** | Low (if you know Angular) | Medium | Medium | Low (if you know React) |

You can align columns:

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Content      | More content   | Even more     |

---

## Horizontal Rules

You can create horizontal rules using three or more hyphens, asterisks, or underscores:

---

***

___

## Images

While we can't show actual images in this example, here's the syntax:

\`\`\`markdown
![Alt text for image](/path/to/image.png)
![Angular Logo](https://angular.dev/assets/images/logos/angular/angular.svg)
\`\`\`

Images with links:

\`\`\`markdown
[![Click me](/image.png)](https://example.com)
\`\`\`

---

## Escaping Characters

You can escape special Markdown characters using backslashes:

\\*This text is not italic\\*

\\# This is not a heading

---

## HTML in Markdown

Since NgPress sanitizes HTML for security, basic HTML elements are supported:

This is <strong>bold</strong> and this is <em>emphasized</em>.

You can use <kbd>Ctrl</kbd> + <kbd>C</kbd> for keyboard shortcuts.

Chemical formulas: H<sub>2</sub>O

Mathematical notation: E = mc<sup>2</sup>

---

## Line Breaks

To create a line break, end a line with two or more spaces, or use a backslash:

This is the first line.
This is the second line.

This is the third line.\\
This is the fourth line.

Or simply use a blank line for a paragraph break.

---

## Special Features

### GitHub-Flavored Markdown

NgPress uses \`marked-gfm-heading-id\` which adds automatic IDs to headings, making it easy to link to specific sections:

\`\`\`markdown
[Jump to Text Formatting](#text-formatting)
\`\`\`

### Emoji Support

Depending on your renderer configuration, you might support emoji:

:rocket: :tada: :sparkles: :fire: :heart:

(Note: Emoji rendering depends on your Markdown parser configuration)

---

## Advanced Examples

### Combining Features

You can combine multiple Markdown features:

> **Pro Tip:** When building Angular applications, always remember:
>
> 1. Use **signals** for state management
> 2. Implement **OnPush** change detection
> 3. Prefer **standalone components**
>
> Example signal usage:
> \`\`\`typescript
> const count = signal(0);
> const doubled = computed(() => count() * 2);
> \`\`\`

### Complex Tables with Code

| Command | Description | Example |
|---------|-------------|---------|
| \`ng generate component\` | Creates a new component | \`ng g c my-component\` |
| \`ng build\` | Builds the application | \`ng build --configuration production\` |
| \`ng test\` | Runs unit tests | \`ng test --watch=false\` |

---

## Conclusion

This document demonstrates the full power of Markdown in NgPress. With GitHub-flavored Markdown support, syntax highlighting, and Angular's rendering capabilities, you can create rich, interactive documentation and content.

**Key Takeaways:**

- ✅ Full Markdown syntax support
- ✅ Syntax highlighting for code blocks
- ✅ Tables, lists, and formatting options
- ✅ Safe HTML rendering
- ✅ GitHub-flavored Markdown extensions

For more information, check out the [NgPress documentation](/) or visit the [About page](/about).


`;
