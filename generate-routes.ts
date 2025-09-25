#!/usr/bin/env deno --allow-read
import {walk} from "jsr:@std/fs";

const entries: {'**': string}[] = [];

for await (const entry of walk("./public")) {
  if (!entry.path.endsWith('.md')) {
    continue;
  }
  entries.push({
    '**': entry.path.replace('public/', '').replace('.md', '')
  });
  // const entry = {
  //   '**': entry.path.replace('public/', '').replace('.md', '')
  // }
}
console.log(JSON.stringify(entries, null, 2));
