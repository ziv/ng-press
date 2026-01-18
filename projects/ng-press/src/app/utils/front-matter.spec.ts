import {frontMatter} from './front-matter';

describe('front-matter', () => {
  describe('empty content', () => {
    it('should return empty data and markdown for empty string', () => {
      const content = '';
      const result = frontMatter(content);
      expect(result).toEqual({data: {}, markdown: ''});
    });
  });

  describe('content without front-matter', () => {
    it('should return content as markdown when no front-matter present', () => {
      const content = '# Hello World\n\nThis is a simple markdown document.';
      const result = frontMatter(content);
      expect(result).toEqual({
        data: {},
        markdown: '# Hello World\n\nThis is a simple markdown document.'
      });
    });

    it('should handle markdown with single dashes', () => {
      const content = 'Some content\n-\nMore content';
      const result = frontMatter(content);
      expect(result).toEqual({
        data: {},
        markdown: 'Some content\n-\nMore content'
      });
    });
  });

  describe('content with valid front-matter', () => {
    it('should parse front-matter with simple string properties', () => {
      const content = `---
title: Test Page
layout: page
---

# Content Here`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Test Page',
        layout: 'page'
      });
      expect(result.markdown).toBe('# Content Here');
    });

    it('should parse front-matter with various data types', () => {
      const content = `---
title: Test Page
count: 42
published: true
score: 3.14
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Test Page',
        count: 42,
        published: true,
        score: 3.14
      });
      expect(result.markdown).toBe('Content');
    });

    it('should parse front-matter with arrays', () => {
      const content = `---
tags:
  - angular
  - typescript
  - web
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        tags: ['angular', 'typescript', 'web']
      });
      expect(result.markdown).toBe('Content');
    });

    it('should parse front-matter with nested objects', () => {
      const content = `---
author:
  name: John Doe
  email: john@example.com
meta:
  created: 2024-01-01
  updated: 2024-01-15
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        author: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        meta: {
          created: '2024-01-01',
          updated: '2024-01-15'
        }
      });
      expect(result.markdown).toBe('Content');
    });

    it('should parse front-matter with multiline markdown content', () => {
      const content = `---
title: Article
---

# Heading 1

Paragraph 1

## Heading 2

Paragraph 2`;

      const result = frontMatter(content);
      expect(result.data).toEqual({title: 'Article'});
      expect(result.markdown).toBe(`# Heading 1

Paragraph 1

## Heading 2

Paragraph 2`);
    });
  });

  describe('edge cases', () => {
    it('should handle front-matter with no content after', () => {
      const content = `---
title: Only Front Matter
---
`;

      const result = frontMatter(content);
      expect(result.data).toEqual({title: 'Only Front Matter'});
      expect(result.markdown).toBe('');
    });

    it('should handle front-matter with Windows line endings (CRLF)', () => {
      const content = `---\r\ntitle: Test\r\nlayout: page\r\n---\r\n\r\nContent`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Test',
        layout: 'page'
      });
      expect(result.markdown).toBe('Content');
    });

    it('should handle front-matter with extra spaces around delimiters', () => {
      const content = `---
title: Test
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({title: 'Test'});
      expect(result.markdown).toBe('Content');
    });

    it('should only parse first front-matter block if multiple dashes exist', () => {
      const content = `---
title: First
---

Content with ---
More dashes --- here
---`;

      const result = frontMatter(content);
      expect(result.data).toEqual({title: 'First'});
      expect(result.markdown).toBe(`Content with ---
More dashes --- here
---`);
    });

    it('should handle empty front-matter block', () => {
      const content = `---

---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({});
      expect(result.markdown).toBe('Content');
    });

    it('should not match incomplete front-matter (missing closing)', () => {
      const content = `---
title: Test

Content without closing delimiter`;

      const result = frontMatter(content);
      expect(result.data).toEqual({});
      expect(result.markdown).toBe(content);
    });

    it('should not match front-matter not at start of content', () => {
      const content = `Some text before
---
title: Test
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({});
      expect(result.markdown).toBe(content);
    });

    it('should handle front-matter with quoted strings containing colons', () => {
      const content = `---
title: "Time: 10:30 AM"
description: 'Key: Value'
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Time: 10:30 AM',
        description: 'Key: Value'
      });
      expect(result.markdown).toBe('Content');
    });

    it('should handle front-matter with null values', () => {
      const content = `---
title: Test
author: null
---

Content`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Test',
        author: null
      });
      expect(result.markdown).toBe('Content');
    });
  });

  describe('real-world examples', () => {
    it('should parse a typical blog post front-matter', () => {
      const content = `---
title: Getting Started with Angular
author: Jane Smith
date: 2024-01-15
tags:
  - angular
  - tutorial
  - beginner
layout: post
published: true
---

# Getting Started with Angular

Angular is a powerful framework for building web applications.

## Installation

To install Angular, run:

\`\`\`bash
npm install -g @angular/cli
\`\`\``;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Getting Started with Angular',
        author: 'Jane Smith',
        date: '2024-01-15',
        tags: ['angular', 'tutorial', 'beginner'],
        layout: 'post',
        published: true
      });
      expect(result.markdown).toContain('# Getting Started with Angular');
      expect(result.markdown).toContain('npm install -g @angular/cli');
    });

    it('should parse NgPress example from README', () => {
      const content = `---
title: Get Started
layout: page
---

# Article Header

This is the content of the article.`;

      const result = frontMatter(content);
      expect(result.data).toEqual({
        title: 'Get Started',
        layout: 'page'
      });
      expect(result.markdown).toBe(`# Article Header

This is the content of the article.`);
    });
  });
});
