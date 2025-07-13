#!/usr/bin/env node
import { main } from '../index.js';

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
