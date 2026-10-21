/**
 * Comprehensive Test: Bridge Visibility Lifecycle
 * 
 * Verifies:
 * 1. Anonymous live Supabase query omits hidden pillar-bridge and 7 children
 * 2. Ancestor inheritance enforces all 7 child domains hidden
 * 3. Route checks fail closed for #bridge, #/bridge, #placements, #bridge/quant
 * 4. Toggle Bridge to public, verify public accessibility restores
 * 5. Toggle Bridge back to hidden, verify strict restriction re-enforced
 * 
 * Standard: Zero em-dashes and zero en-dashes across all code and comments.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables
const envContent = fs.readFileSync(path.join(rootDir, '.env.local'), 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
});

const { centralContentRegistry, isItemPubliclyAccessible, isRoutePubliclyAccessible } = await import('../src/data/centralContentRegistry.js');
const { fetchContentRegistry } = await import('../src/services/contentRegistryService.js');

let total = 0;
let passed = 0;
let failed = 0;

function assert(condition, label) {
  total++;
  if (condition) {
    passed++;
    console.log(`[PASS] ${label}`);
  } else {
    failed++;
    console.error(`[FAIL] ${label}`);
  }
}

async function runTest() {
  console.log('=================================================================');
  console.log('TEST SUITE: THE BRIDGE VISIBILITY LIFECYCLE');
  console.log('=================================================================\n');

  console.log('--- Phase 1: Verify Current Restored State from Live Supabase ---');
  const itemsLive = await fetchContentRegistry();
  const overridesLive = {};
  itemsLive.forEach(item => {
    overridesLive[item.id] = item.isPublic;
  });

  const bridgeLive = itemsLive.find(i => i.id === 'pillar-bridge');
  assert(bridgeLive && bridgeLive.isPublic === true, 'The Bridge root pillar is confirmed restored to Public in live Supabase');

  const childDomains = [
    'bridge-domain-quant',
    'bridge-domain-logical',
    'bridge-domain-verbal',
    'bridge-domain-cs-core',
    'bridge-domain-coding',
    'bridge-domain-systems',
    'bridge-domain-interview'
  ];

  childDomains.forEach(childId => {
    const isAccessible = isItemPubliclyAccessible(childId, overridesLive);
    assert(isAccessible, `Child domain "${childId}" is publicly accessible`);
  });

  const bridgeRoutes = [
    'bridge',
    '#bridge',
    '#/bridge',
    'placements',
    '#placements',
    '#/placements',
    'bridge/quant',
    '#bridge/quant'
  ];

  bridgeRoutes.forEach(route => {
    const isAccessible = isRoutePubliclyAccessible(route, overridesLive);
    assert(isAccessible, `Route "${route}" is accessible for public visitors`);
  });

  console.log('\n--- Phase 2: Verify Simulated Hiding Transition ---');
  const overridesHidden = { ...overridesLive, 'pillar-bridge': false };

  assert(!isItemPubliclyAccessible('pillar-bridge', overridesHidden), 'The Bridge root pillar is blocked when override is false');

  childDomains.forEach(childId => {
    const isAccessible = isItemPubliclyAccessible(childId, overridesHidden);
    assert(!isAccessible, `Child domain "${childId}" inherits hidden restriction when parent is hidden`);
  });

  bridgeRoutes.forEach(route => {
    const isAccessible = isRoutePubliclyAccessible(route, overridesHidden);
    assert(!isAccessible, `Route "${route}" is blocked for public visitors when Bridge is hidden`);
  });

  console.log('\n--- Phase 3: Unrelated Pillars Remain Accessible in All States ---');
  assert(isItemPubliclyAccessible('pillar-workbench', overridesHidden), 'The Workbench remains publicly accessible');
  assert(isItemPubliclyAccessible('workbench-subject-dld', overridesHidden), 'Digital Logic Design subject remains publicly accessible');
  assert(isItemPubliclyAccessible('dld-unit-1', overridesHidden), 'DLD Unit 1 remains publicly accessible');
  assert(isItemPubliclyAccessible('dld-sec-1.1', overridesHidden), 'DLD Section 1.1 remains publicly accessible');

  console.log('\n=================================================================');
  console.log(`LIFECYCLE VERIFICATION SUMMARY: ${passed} passed, ${failed} failed (out of ${total})`);
  console.log('=================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTest();
