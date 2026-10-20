import { execSync } from 'child_process';
import path from 'path';

console.log('Generating Unit 2 Practice Arena Master Question Bank (125 Questions)...');
execSync('python3 scripts/buildUnit2Bank.py', { stdio: 'inherit' });
console.log('Validating generated bank with verification suite...');
execSync('node scripts/verifyUnit2PracticeArena.mjs', { stdio: 'inherit' });
console.log('Unit 2 Question Bank generated and validated successfully.');
