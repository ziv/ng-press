#!/usr/bin/env tsx
import {globSync} from 'glob';

/**
 * Generates a list of route entries based on markdown files in the public directory.
 * Each entry is an object with a '**' key pointing to the route path derived from the file path.
 * The output is a JSON array printed to the console.
 * Example output:
 * [
 *   { "**": "docs/getting-started" },
 *   { "**": "blog/welcome" }
 * ]
 */
const entries: { '**': string }[] = globSync('./public/**/*.md').map(e => ({
  '**': e.replace('public/', '').replace('.md', '')
}));

console.log(JSON.stringify(entries, null, 2));
