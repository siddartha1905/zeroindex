/**
 * Test script for Section 2.5 schema and render properties
 * Strict zero em-dash and zero en-dash compliance.
 */

import { dldSection25Data } from '../src/data/dldSection25Data.js';

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    passed++;
    console.log(`[PASS] ${msg}`);
  } else {
    failed++;
    console.error(`[FAIL] ${msg}`);
  }
}

console.log('Testing Section 2.5 Schema & Data Properties...');

// 1. Meta check
assert(dldSection25Data.id === '2.5', 'id is 2.5');
assert(dldSection25Data.number === '2.5', 'number is 2.5');
assert(dldSection25Data.badge === 'Visual Minimization', 'badge is Visual Minimization');
assert(dldSection25Data.introductoryBullets.length === 6, 'Exactly 6 introductory bullets');
assert(dldSection25Data.learningOutcomes.length === 6, 'Exactly 6 learning outcomes');

// 2. Tab 1 check
assert(dldSection25Data.startHere.videoId === 'kmap-intro', 'VideoId is kmap-intro');
assert(dldSection25Data.startHere.algebraVsKMapComparison.mintermIndices.length === 4, 'Comparison minterm indices has 4 minterms');
assert(dldSection25Data.startHere.powerOfTwoElimination.length === 5, '5 power of two elimination cards');
assert(dldSection25Data.startHere.roadmap.length === 6, '6 roadmap steps');

// 3. Tab 2 check
assert(dldSection25Data.foundations.layouts.twoVar.matrix.length === 2, '2-var matrix has 2 rows');
assert(dldSection25Data.foundations.layouts.threeVar.matrix.length === 2, '3-var matrix has 2 rows');
assert(dldSection25Data.foundations.layouts.fourVar.matrix.length === 4, '4-var matrix has 4 rows');
assert(dldSection25Data.foundations.grayCodeExplanation.comparisonTable.length === 4, '4 comparison steps in Gray code');

// 4. Tab 3 check
assert(dldSection25Data.groupingAndTerms.rules.length === 8, 'Exactly 8 grouping rules');
assert(dldSection25Data.groupingAndTerms.visualTopologies.length === 15, '15 visual topologies in gallery (9 valid + 6 invalid)');
assert(dldSection25Data.groupingAndTerms.termExtractionGuide.sopRule.rules.length === 4, '4 SOP rules');
assert(dldSection25Data.groupingAndTerms.termExtractionGuide.posRule.rules.length === 5, '5 POS rules');

// 5. Tab 4 check
assert(dldSection25Data.guidedDemos.length === 6, 'Exactly 6 guided demos');
for (const gd of dldSection25Data.guidedDemos) {
  assert(gd.steps.length >= 3, `Demo ${gd.id} has at least 3 steps`);
}

// 6. Tab 5 check
assert(dldSection25Data.workedModels.length === 34, `Exactly 34 worked models (found ${dldSection25Data.workedModels.length})`);
const categories = new Set(dldSection25Data.workedModels.map(m => m.category));
assert(categories.has('2-Variable K-Map'), 'Has 2-variable category');
assert(categories.has('3-Variable K-Map'), 'Has 3-variable category');
assert(categories.has('4-Variable K-Map'), 'Has 4-variable category');
assert(categories.has('Don\'t-Care Minimization'), 'Has Don\'t-Care category');
assert(categories.has('Special Cases'), 'Has Special Cases category');

const posModels = dldSection25Data.workedModels.filter(m => m.form === 'POS');
assert(posModels.length >= 8, `At least 8 POS models present (found ${posModels.length})`);

// 7. Tab 6 check
assert(dldSection25Data.cheatSheet.examChecklist.length >= 8, 'Cheat sheet has at least 8 checklist points');
assert(dldSection25Data.cheatSheet.groupSizeLadder.length === 5, 'Cheat sheet has 5 group-size ladder steps');
assert(dldSection25Data.cheatSheet.wraparoundReference.length === 3, 'Cheat sheet has 3 wraparound references');

// 8. Tab 7 check
assert(dldSection25Data.practiceLab.interactivePresets.length === 3, 'Exactly 3 interactive presets');
assert(dldSection25Data.practiceLab.problems.length === 36, `Exactly 36 practice problems (found ${dldSection25Data.practiceLab.problems.length})`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
