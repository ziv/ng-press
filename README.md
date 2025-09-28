# NgPress

## Case Study

Generating a static blog site with Angular SSG and Markdown files.

This project is a case study to demonstrate the SSG capabilities of Angular.

## Introduction

**NgPress** is a static site generator built with Angular.
It allows you to create a microblog or documentation site using markdown files as content.
It generates server routes based on the file structure in the `public` folder.
Each route is configured to load a markdown file and render it as HTML page with Angular functionality.
All server routes are pre-rendered at build time resulting in a fast static site.

## Usage

### Content

Put markdown files are stored in the `public` folder.

Run the following command to generate routes from the files structure:

```shell
npm run routes
```

- Run this command after adding or removing markdown files.

### Frontmatter

Each markdown file can have a frontmatter section to define metadata. The following fields are supported:

- `title`: The title of the page.
- `description`: A short description of the page.
- `layout`: The layout to use for the page.

All fields are optional.

### Configuration

Edit `src/ngpress.config.ts` to change the site configuration.

Allow you to configure minimal settings such as:

- Site title
- Top menu links
- Sidebar links
- Footer text

### Files structure and routing

The files structure in the `public` folder determines the routes of the site.

```
public/
├── guides/abc.md       -> /guides/abc
├── guides/def.md       -> /guides/def
├── index.md            -> /index
└── about.md            -> /about
```

The minimal requirement is to have an `index.md` file in the `public` folder.
