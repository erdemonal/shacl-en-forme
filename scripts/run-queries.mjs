#!/usr/bin/env node
import { createRequire } from 'node:module';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { QueryEngine } = require('@comunica/query-sparql');
const jsonld = require('jsonld');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const statsPath = path.join(root, 'docs/data/stats.jsonld');
const queriesDir = path.join(root, 'queries');

function bindingToObject(binding) {
  const out = {};
  for (const key of binding.keys()) {
    const term = binding.get(key);
    out[key.value] = term.value;
  }
  return out;
}

async function main() {
  const only = process.argv.slice(2);
  const doc = JSON.parse(await readFile(statsPath, 'utf8'));
  const nquads = await jsonld.toRDF(doc, { format: 'application/n-quads' });
  const engine = new QueryEngine();

  let files = (await readdir(queriesDir))
    .filter((name) => name.endsWith('.rq'))
    .sort();
  if (only.length) {
    files = files.filter((name) => only.includes(name) || only.includes(path.basename(name, '.rq')));
  }

  for (const name of files) {
    const query = await readFile(path.join(queriesDir, name), 'utf8');
    process.stdout.write(`\n===== ${name} =====\n`);
    const result = await engine.queryBindings(query, {
      sources: [{ type: 'serialized', value: nquads, mediaType: 'application/n-quads' }],
    });
    const rows = (await result.toArray()).map(bindingToObject);
    if (!rows.length) {
      process.stdout.write('(no results)\n');
      continue;
    }
    const keys = Object.keys(rows[0]);
    process.stdout.write(keys.join('\t') + '\n');
    for (const row of rows) {
      process.stdout.write(keys.map((k) => row[k]).join('\t') + '\n');
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
