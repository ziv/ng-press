---
title: About NgPress
layout: home
---

# About NgPress

## The Static Site Generator That Speaks Angular

NgPress isn't just another static site generator—it's a paradigm shift for Angular developers who refuse to compromise between the simplicity of Markdown and the power of component-driven architecture.

### Built by Angular Developers, for Angular Developers

Tired of juggling multiple frameworks? NgPress harnesses Angular's cutting-edge server-side rendering capabilities to transform your Markdown content into blazingly fast, SEO-friendly static sites. No context switching. No new build tools. Just pure Angular.

### The Power of "Bring Your Own Components"

Here's where NgPress truly shines: **your layouts are just Angular components**. That's right—no proprietary templating language, no plugin ecosystem to navigate, no learning curve. Use the same components, services, and patterns you already know and love.

Want a custom blog layout? Create an Angular component. Need a documentation template? Build it with Angular. Require interactive widgets in your content? Inject them seamlessly using familiar Angular patterns.

```typescript
// Your layout is just a component
@Component({
  selector: 'my-layout',
  template: `
    <header>{{ press().conf.name }}</header>
    <main>
      <ngp-content/>  <!-- Your Markdown renders here -->
    </main>
  `
})
export class MyLayout {
  protected readonly press = inject(ActivatedNgPress).state;
}
```

### Modern Architecture, Zero Compromises

NgPress leverages Angular's most powerful modern features:

- **Signals for reactive state management** - Content metadata updates propagate instantly
- **Standalone components** - Zero NgModule configuration required
- **Built-in SSG/SSR** - Pre-rendered static HTML with Angular's native capabilities
- **Type-safe configuration** - Your IDE knows your content structure
- **Dynamic component loading** - Different layouts for different content types

### How It Works: Elegantly Simple

1. **Write** your content in Markdown with YAML frontmatter
2. **Design** your layouts as Angular components
3. **Configure** your content routes in one place
4. **Build** - Angular's SSG does the rest

NgPress reads your Markdown files, parses frontmatter metadata, renders content through your chosen layout component, and outputs production-ready static HTML. All powered by the same Angular you use for your apps.

### The Perfect Fit For

- **Documentation sites** that need custom interactive examples
- **Technical blogs** where code demonstrations matter
- **Product marketing pages** that require brand-specific components
- **Educational content** with interactive learning widgets
- **Developer portfolios** that showcase your Angular expertise

### Under the Hood: Technical Excellence

NgPress demonstrates production-grade Angular patterns:

- Leverages `httpResource` for optimized content loading
- Uses `computed()` signals for derived state management
- Implements secure HTML sanitization for Markdown rendering
- Employs dependency injection for clean architecture
- Supports GitHub-flavored Markdown with heading IDs
- Enables view transitions for smooth navigation

### Educational & Open Source

NgPress is an **educational project** designed to showcase modern Angular best practices. It's not production-ready, but it's a powerful learning tool and starting point for developers who want to understand:

- How Angular SSG/SSR really works
- Dynamic component instantiation patterns
- Signal-based state management
- Type-safe application configuration
- Real-world Angular architecture

### The Developer Experience You Deserve

Why context-switch between your application code and your documentation? Why learn another templating language when you already master Angular? Why settle for rigid themes when you can craft pixel-perfect custom layouts?

**NgPress eliminates these compromises.**

Your content workflow becomes an extension of your development workflow. Your components are reusable across your site and your applications. Your skills compound instead of fragment.

### Get Started

Ready to build static sites the Angular way?

1. Clone the repository
2. Create your Markdown content
3. Design your layout components
4. Build and deploy

It's that straightforward. Because great tools should amplify your expertise, not replace it.

---

**NgPress**: Where Angular components meet Markdown simplicity. Static sites, reimagined.

