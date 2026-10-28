import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('====================================================');
console.log('ZeroIndex Phase 3: Three-Pillar Redesign Verification');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// ---------------------------------------------------------
// 1. Check SiteHeader: exactly 3 navigation pillars
// ---------------------------------------------------------
console.log('--- 1. SiteHeader Navigation Structure ---');
const siteHeaderPath = path.join(rootDir, 'src/components/SiteHeader.jsx');
const siteHeaderContent = fs.readFileSync(siteHeaderPath, 'utf8');

assert(
  siteHeaderContent.includes("id: 'workbench'") &&
  siteHeaderContent.includes("id: 'atlas'") &&
  siteHeaderContent.includes("id: 'journal'"),
  'SiteHeader defines items for workbench, atlas, and journal'
);

assert(
  !siteHeaderContent.includes("id: 'bridge'") &&
  !siteHeaderContent.includes("id: 'readout'") &&
  !siteHeaderContent.includes("id: 'folio'"),
  'SiteHeader has no top-level nav items for legacy bridge, readout, or folio'
);

assert(
  siteHeaderContent.includes("The Workbench") &&
  siteHeaderContent.includes("The Atlas") &&
  siteHeaderContent.includes("The Journal"),
  'SiteHeader displays pillar names: The Workbench, The Atlas, The Journal'
);

assert(
  siteHeaderContent.includes("01") &&
  siteHeaderContent.includes("02") &&
  siteHeaderContent.includes("03"),
  'SiteHeader shows numbering indices 01, 02, 03'
);

// ---------------------------------------------------------
// 2. Check SiteFooter: 3 Explore pillars
// ---------------------------------------------------------
console.log('\n--- 2. SiteFooter Navigation Structure ---');
const siteFooterPath = path.join(rootDir, 'src/components/SiteFooter.jsx');
const siteFooterContent = fs.readFileSync(siteFooterPath, 'utf8');

assert(
  siteFooterContent.includes("The Workbench") &&
  siteFooterContent.includes("The Atlas") &&
  siteFooterContent.includes("The Journal"),
  'SiteFooter links to The Workbench, The Atlas, and The Journal'
);

assert(
  !siteFooterContent.includes("The Bridge") &&
  !siteFooterContent.includes("The Readout") &&
  !siteFooterContent.includes("The Folio"),
  'SiteFooter does not link to legacy bridge, readout, or folio as pillars'
);

// ---------------------------------------------------------
// 3. Check MainHome & KnowledgeTreeIllustration
// ---------------------------------------------------------
console.log('\n--- 3. MainHome and Knowledge Tree ---');
const mainHomePath = path.join(rootDir, 'src/components/MainHome.jsx');
const mainHomeContent = fs.readFileSync(mainHomePath, 'utf8');

assert(
  mainHomeContent.includes("Inside ZeroIndex") &&
  mainHomeContent.includes("The Workbench") &&
  mainHomeContent.includes("The Atlas") &&
  mainHomeContent.includes("The Journal"),
  'MainHome shows exactly 3 pillar cards in Inside ZeroIndex'
);

const treePath = path.join(rootDir, 'src/components/KnowledgeTreeIllustration.jsx');
const treeContent = fs.readFileSync(treePath, 'utf8');

assert(
  treeContent.includes("01 WORKBENCH") &&
  treeContent.includes("02 ATLAS") &&
  treeContent.includes("03 JOURNAL"),
  'KnowledgeTreeIllustration SVG contains 3 principal branch labels'
);

assert(
  !treeContent.includes("04 READOUT") &&
  !treeContent.includes("05 FOLIO"),
  'KnowledgeTreeIllustration does not render old 04 READOUT or 05 FOLIO branch heads'
);

// ---------------------------------------------------------
// 4. Check AboutModal
// ---------------------------------------------------------
console.log('\n--- 4. AboutModal Pillar Overview ---');
const aboutModalPath = path.join(rootDir, 'src/components/AboutModal.jsx');
const aboutModalContent = fs.readFileSync(aboutModalPath, 'utf8');

assert(
  aboutModalContent.includes("The Three Pillars") || aboutModalContent.includes("Three Pillars"),
  'AboutModal introduces The Three Pillars'
);

assert(
  aboutModalContent.includes("The Workbench") &&
  aboutModalContent.includes("The Atlas") &&
  aboutModalContent.includes("The Journal"),
  'AboutModal lists The Workbench, The Atlas, and The Journal'
);

// ---------------------------------------------------------
// 5. Check AtlasLanding: START -> TRY -> NEXT & Career Prep
// ---------------------------------------------------------
console.log('\n--- 5. AtlasLanding (Unified Atlas + Bridge) ---');
const atlasPath = path.join(rootDir, 'src/components/AtlasLanding.jsx');
const atlasContent = fs.readFileSync(atlasPath, 'utf8');

assert(
  atlasContent.includes("START") &&
  atlasContent.includes("TRY") &&
  atlasContent.includes("NEXT"),
  'AtlasLanding includes START -> TRY -> NEXT learning path framework'
);

assert(
  atlasContent.includes("Know where to begin") &&
  atlasContent.includes("Practise something useful") &&
  atlasContent.includes("Discover what to learn afterward"),
  'AtlasLanding provides compact, natural START -> TRY -> NEXT principle explanations'
);

assert(
  atlasContent.includes("Learning Paths") &&
  atlasContent.includes("Career Preparation"),
  'AtlasLanding provides tabs for Learning Paths and Career Preparation'
);

assert(
  atlasContent.includes("bridgePlacementDomains") &&
  atlasContent.includes("BRIDGE_DOMAIN_REGISTRY_MAP") &&
  atlasContent.includes("competencyTracks"),
  'AtlasLanding incorporates Bridge career preparation domains'
);

// ---------------------------------------------------------
// 6. Check JournalLanding: Insights & Reflections
// ---------------------------------------------------------
console.log('\n--- 6. JournalLanding (Unified Readout + Folio) ---');
const journalPath = path.join(rootDir, 'src/components/JournalLanding.jsx');
assert(fs.existsSync(journalPath), 'JournalLanding.jsx exists');
const journalContent = fs.readFileSync(journalPath, 'utf8');

assert(
  journalContent.includes("Insights") &&
  journalContent.includes("Reflections"),
  'JournalLanding provides categories for Insights and Reflections'
);

assert(
  journalContent.includes("Nothing published here yet") &&
  journalContent.includes("New insights and reflections will appear whenever there is something meaningful to share"),
  'JournalLanding features an elegant empty state when no published entries exist'
);

assert(
  journalContent.includes("A space for ideas worth exploring, lessons worth remembering, and thoughts worth sharing"),
  'JournalLanding introduces the approved Journal mission quote'
);

// ---------------------------------------------------------
// 7. Check App.jsx Routing & Backward Compatibility
// ---------------------------------------------------------
console.log('\n--- 7. App.jsx Hash Routing & Backward Compatibility ---');
const appPath = path.join(rootDir, 'src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');

assert(
  appContent.includes("lowerHash === 'atlas'") &&
  appContent.includes("lowerHash === 'bridge'") &&
  appContent.includes("lowerHash === 'journal'") &&
  appContent.includes("lowerHash.startsWith('readout')") &&
  appContent.includes("lowerHash.startsWith('folio')"),
  'App.jsx handles atlas, bridge, journal, readout, and folio hash routes'
);

assert(
  appContent.includes("<AtlasLanding") &&
  appContent.includes("<JournalLanding") &&
  appContent.includes("<WorkbenchLanding"),
  'App.jsx renders AtlasLanding, JournalLanding, and WorkbenchLanding'
);

// ---------------------------------------------------------
// 8. Check centralContentRegistry.js Public Routes
// ---------------------------------------------------------
console.log('\n--- 8. Central Content Registry Visibility ---');
const registryPath = path.join(rootDir, 'src/data/centralContentRegistry.js');
const registryModule = await import('../src/data/centralContentRegistry.js');

const { isRoutePubliclyAccessible, isItemPubliclyAccessible, centralContentRegistry } = registryModule;

assert(
  isRoutePubliclyAccessible('atlas'),
  'Route "atlas" is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('atlas/career-prep'),
  'Route "atlas/career-prep" is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('bridge'),
  'Legacy route "bridge" remains accessible'
);

assert(
  isRoutePubliclyAccessible('bridge/quant'),
  'Legacy route "bridge/quant" remains accessible'
);

assert(
  isRoutePubliclyAccessible('journal'),
  'Route "journal" is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('journal/insights'),
  'Route "journal/insights" is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('journal/reflections'),
  'Route "journal/reflections" is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('readout'),
  'Legacy route "readout" remains accessible'
);

assert(
  isRoutePubliclyAccessible('folio'),
  'Legacy route "folio" remains accessible'
);

assert(
  !isRoutePubliclyAccessible('atlas/learning-paths/programming-foundations'),
  'Unpublished roadmap "programming-foundations" via learning-paths subpath remains blocked to public visitors'
);

assert(
  !isRoutePubliclyAccessible('atlas/programming-foundations'),
  'Unpublished roadmap "programming-foundations" direct slug remains blocked to public visitors'
);

assert(
  !isRoutePubliclyAccessible('roadmaps/programming-foundations'),
  'Unpublished roadmap "programming-foundations" legacy alias remains blocked to public visitors'
);

assert(
  isRoutePubliclyAccessible('atlas/career-prep/quantitative-aptitude'),
  'Route "atlas/career-prep/quantitative-aptitude" is publicly accessible'
);

// Verify independent discoverability when pillar-atlas is offline but pillar-bridge is online
const bridgeOnlyOverrides = { 'pillar-atlas': false, 'pillar-bridge': true };
assert(
  isRoutePubliclyAccessible('atlas', bridgeOnlyOverrides),
  'Atlas remains accessible when pillar-atlas is offline but pillar-bridge is online'
);

assert(
  isRoutePubliclyAccessible('atlas/career-prep', bridgeOnlyOverrides),
  'Career prep remains accessible when pillar-atlas is offline but pillar-bridge is online'
);

assert(
  !isRoutePubliclyAccessible('atlas/learning-paths', bridgeOnlyOverrides),
  'Learning paths subpath correctly blocked when pillar-atlas is offline'
);

// Verify DLD Unit 1 and Unit 2 routes
assert(
  isRoutePubliclyAccessible('workspace/units/1.1'),
  'Workbench academic route "workspace/units/1.1" remains publicly accessible'
);

assert(
  isRoutePubliclyAccessible('workspace/units/2.1'),
  'Workbench academic route "workspace/units/2.1" remains publicly accessible'
);

assert(
  isRoutePubliclyAccessible('workspace/solvers'),
  'Workbench interactive solvers route is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('workspace/practice'),
  'Workbench practice questions route is publicly accessible'
);

assert(
  isRoutePubliclyAccessible('workspace/syllabus'),
  'Workbench subject syllabus route is publicly accessible'
);

// ---------------------------------------------------------
// 9. Zero-Dash Standard Check across modified files
// ---------------------------------------------------------
console.log('\n--- 9. Zero-Dash Standard Enforcement ---');
const modifiedFiles = [
  'src/data/centralContentRegistry.js',
  'src/components/SiteHeader.jsx',
  'src/components/SiteFooter.jsx',
  'src/components/AboutModal.jsx',
  'src/components/KnowledgeTreeIllustration.jsx',
  'src/components/MainHome.jsx',
  'src/components/JournalLanding.jsx',
  'src/components/AtlasLanding.jsx',
  'src/App.jsx'
];

let dashViolations = 0;
for (const file of modifiedFiles) {
  const filePath = path.join(rootDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('\u2014') || line.includes('\u2013')) {
      console.error(`Dash violation in ${file}:${idx + 1}: ${line.trim()}`);
      dashViolations++;
    }
  });
}

assert(dashViolations === 0, `Zero em-dashes and zero en-dashes across all modified files (Violations: ${dashViolations})`);

console.log('\n====================================================');
console.log(`Results: ${passCount} Passed, ${failCount} Failed`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
