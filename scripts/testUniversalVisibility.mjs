import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { 
  centralContentRegistry, 
  isItemPubliclyAccessible, 
  isRoutePubliclyAccessible,
  getUnitRegistryId,
  getSectionRegistryId,
  getWorkspaceTabRegistryId,
  ATLAS_ROADMAP_REGISTRY_MAP
} from '../src/data/centralContentRegistry.js';
import { 
  BRIDGE_DOMAIN_REGISTRY_MAP 
} from '../src/data/bridgePlacementConfig.js';

// Parse .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    envVars[match[1]] = value.trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runUniversalVisibilityAudit() {
  console.log('================================================================');
  console.log('ZEROINDEX: UNIVERSAL CHILD-LEVEL PUBLISHING ENFORCEMENT AUDIT');
  console.log('================================================================');
  console.log(`Connecting anonymously to live Supabase: ${supabaseUrl}`);

  const { data: dbRecords, error } = await supabase
    .from('content_registry')
    .select('*');

  if (error) {
    console.error('Failed to query Supabase content_registry:', error.message);
    process.exit(1);
  }

  console.log(`Successfully retrieved ${dbRecords.length} live records from Supabase.`);

  const liveOverrides = {};
  dbRecords.forEach(r => {
    liveOverrides[r.id] = r.is_public;
  });

  let failures = 0;
  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
    } else {
      console.error(`  [FAIL] ${testName}: ${details}`);
      failures++;
    }
  }

  // -----------------------------------------------------------------
  // 1. LIVE SUPABASE STATE VERIFICATION (READ ONLY)
  // -----------------------------------------------------------------
  console.log('\n--- 1. VERIFYING LIVE SUPABASE STATE ---');
  const dldUnit1Public = liveOverrides['dld-unit-1'];
  const dldUnit2Public = liveOverrides['dld-unit-2'];
  const workbenchToolsGroupPublic = liveOverrides['workbench-tools-group'];

  console.log(`  pillar-workbench: ${liveOverrides['pillar-workbench']}`);
  console.log(`  workbench-subject-dld: ${liveOverrides['workbench-subject-dld']}`);
  console.log(`  dld-unit-1: ${dldUnit1Public}`);
  console.log(`  dld-unit-2: ${dldUnit2Public}`);
  console.log(`  workbench-tools-group: ${workbenchToolsGroupPublic}`);

  assert(liveOverrides['pillar-workbench'] === true, 'Pillar Workbench is Public');
  assert(liveOverrides['workbench-subject-dld'] === true, 'Workbench Subject DLD is Public');
  assert(dldUnit1Public === true, 'DLD Unit I is Public');

  // -----------------------------------------------------------------
  // 2. WORKBENCH PILLAR: CHILD-LEVEL ENFORCEMENT
  // -----------------------------------------------------------------
  console.log('\n--- 2. WORKBENCH PILLAR ENFORCEMENT ---');
  
  // Unit I sections (1.1 to 1.7) must always be public
  for (let i = 1; i <= 7; i++) {
    const secId = `1.${i}`;
    const accessible = isRoutePubliclyAccessible(`workspace/units/${secId}`, liveOverrides);
    assert(accessible === true, `Section ${secId} is PUBLIC`, `Expected true, got ${accessible}`);
  }

  // Unit II sections: 2.1 to 2.5 match Unit II access; 2.6 and 2.7 (planned) are always blocked
  const expectedUnit2Access = Boolean(dldUnit2Public);
  for (let i = 1; i <= 5; i++) {
    const secId = `2.${i}`;
    const accessible = isRoutePubliclyAccessible(`workspace/units/${secId}`, liveOverrides);
    assert(accessible === expectedUnit2Access, `Section ${secId} matches Unit II live access (${expectedUnit2Access})`, `Expected ${expectedUnit2Access}, got ${accessible}`);
  }
  for (let i = 6; i <= 7; i++) {
    const secId = `2.${i}`;
    const accessible = isRoutePubliclyAccessible(`workspace/units/${secId}`, liveOverrides);
    assert(accessible === false, `Planned Section ${secId} is BLOCKED`, `Expected false, got ${accessible}`);
  }

  // Direct section shortcuts match section access
  assert(isRoutePubliclyAccessible('2.1', liveOverrides) === expectedUnit2Access, `Direct #2.1 matches live access (${expectedUnit2Access})`);
  assert(isRoutePubliclyAccessible('sec-2.1', liveOverrides) === expectedUnit2Access, `Direct #sec-2.1 matches live access (${expectedUnit2Access})`);
  assert(isRoutePubliclyAccessible('1.1', liveOverrides) === true, 'Direct #1.1 is PUBLIC');

  // Solvers and Practice match workbench-tools-group live access
  const expectedToolsAccess = Boolean(workbenchToolsGroupPublic);
  assert(isRoutePubliclyAccessible('workspace/solvers', liveOverrides) === expectedToolsAccess, `Route #workspace/solvers matches live access (${expectedToolsAccess})`);
  assert(isRoutePubliclyAccessible('workspace/practice', liveOverrides) === expectedToolsAccess, `Route #workspace/practice matches live access (${expectedToolsAccess})`);
  assert(isRoutePubliclyAccessible('workspace/syllabus', liveOverrides) === expectedToolsAccess, `Route #workspace/syllabus matches live access (${expectedToolsAccess})`);

  // -----------------------------------------------------------------
  // 3. ATLAS PILLAR: CHILD-LEVEL ENFORCEMENT
  // -----------------------------------------------------------------
  console.log('\n--- 3. ATLAS PILLAR ENFORCEMENT ---');
  assert(isRoutePubliclyAccessible('atlas', liveOverrides) === true, 'The Atlas catalog route is Public');

  // Check the three roadmaps
  for (const [slug, regId] of Object.entries(ATLAS_ROADMAP_REGISTRY_MAP)) {
    const itemPublic = isItemPubliclyAccessible(regId, liveOverrides);
    const routePublic = isRoutePubliclyAccessible(`atlas/${slug}`, liveOverrides);
    console.log(`  Atlas roadmap '${slug}' (${regId}): is_public=${itemPublic}, route=${routePublic}`);
    assert(routePublic === itemPublic, `Roadmap ${slug} route matches item access`);
  }

  // -----------------------------------------------------------------
  // 4. BRIDGE PILLAR: DOMAIN-LEVEL ENFORCEMENT
  // -----------------------------------------------------------------
  console.log('\n--- 4. BRIDGE PILLAR ENFORCEMENT ---');
  assert(isRoutePubliclyAccessible('bridge', liveOverrides) === true, 'The Bridge pillar route is Public');

  for (const [domainSlug, regId] of Object.entries(BRIDGE_DOMAIN_REGISTRY_MAP)) {
    const itemPublic = isItemPubliclyAccessible(regId, liveOverrides);
    const routePublic = isRoutePubliclyAccessible(`bridge/${domainSlug}`, liveOverrides);
    assert(routePublic === itemPublic, `Bridge domain ${domainSlug} route matches item access (${itemPublic})`);
  }

  // -----------------------------------------------------------------
  // 5. READOUT & FOLIO PILLARS: DRAFT / PUBLISHED ENFORCEMENT
  // -----------------------------------------------------------------
  console.log('\n--- 5. READOUT & FOLIO ENFORCEMENT ---');
  assert(isRoutePubliclyAccessible('readout', liveOverrides) === true, 'The Readout catalog is Public');
  assert(isRoutePubliclyAccessible('readout/relays-to-tensors', liveOverrides) === false, 'Draft article relays-to-tensors is BLOCKED');
  assert(isRoutePubliclyAccessible('readout/unknown-unapproved', liveOverrides) === false, 'Unpublished unknown article is BLOCKED');

  assert(isRoutePubliclyAccessible('folio', liveOverrides) === true, 'The Folio catalog is Public');
  assert(isRoutePubliclyAccessible('folio/teaching-from-index-zero', liveOverrides) === false, 'Draft essay teaching-from-index-zero is BLOCKED');
  assert(isRoutePubliclyAccessible('folio/unknown-unapproved', liveOverrides) === false, 'Unpublished unknown essay is BLOCKED');

  // -----------------------------------------------------------------
  // 6. ISOLATION & SIBLING INDEPENDENCE TEST (SIMULATED SCENARIOS)
  // -----------------------------------------------------------------
  console.log('\n--- 6. SIMULATED SIBLING INDEPENDENCE SCENARIOS ---');
  // Scenario A: Unit 2 is made Public, but Section 2.3 is Hidden
  const scenarioA = {
    ...liveOverrides,
    'dld-unit-2': true,
    'dld-sec-2.1': true,
    'dld-sec-2.2': true,
    'dld-sec-2.3': false,
    'dld-sec-2.4': true
  };
  assert(isRoutePubliclyAccessible('workspace/units/2.1', scenarioA) === true, 'Scenario A: Section 2.1 is accessible');
  assert(isRoutePubliclyAccessible('workspace/units/2.3', scenarioA) === false, 'Scenario A: Section 2.3 is individually BLOCKED');
  assert(isRoutePubliclyAccessible('workspace/units/2.4', scenarioA) === true, 'Scenario A: Sibling Section 2.4 remains accessible');

  // Scenario B: Tools Group is Public, but Solvers is Hidden while Practice is Public
  const scenarioB = {
    ...liveOverrides,
    'workbench-tools-group': true,
    'workbench-tool-solvers': false,
    'workbench-tool-practice': true,
    'workbench-tool-resources': true
  };
  assert(isRoutePubliclyAccessible('workspace/solvers', scenarioB) === false, 'Scenario B: Solvers is individually BLOCKED');
  assert(isRoutePubliclyAccessible('workspace/practice', scenarioB) === true, 'Scenario B: Practice is individually PUBLIC');
  assert(isRoutePubliclyAccessible('workspace/syllabus', scenarioB) === true, 'Scenario B: Resources is individually PUBLIC');

  // Scenario C: Pillar Workbench Hidden -> ALL children inaccessible
  const scenarioC = {
    ...liveOverrides,
    'pillar-workbench': false
  };
  assert(isRoutePubliclyAccessible('workbench', scenarioC) === false, 'Scenario C: Workbench pillar is BLOCKED');
  assert(isRoutePubliclyAccessible('workspace/units/1.1', scenarioC) === false, 'Scenario C: Unit 1.1 blocked because parent pillar is hidden');
  assert(isRoutePubliclyAccessible('workspace/solvers', scenarioC) === false, 'Scenario C: Solvers blocked because parent pillar is hidden');

  // -----------------------------------------------------------------
  // AUDIT SUMMARY
  // -----------------------------------------------------------------
  console.log('\n================================================================');
  if (failures === 0) {
    console.log('AUDIT PASSED: ALL 5 PILLARS COMPLY WITH AUTHORITATIVE VISIBILITY RULES.');
  } else {
    console.error(`AUDIT FAILED: ${failures} assertions failed.`);
    process.exit(1);
  }
  console.log('================================================================');
}

runUniversalVisibilityAudit();
