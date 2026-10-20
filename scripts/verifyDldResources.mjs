/**
 * ZeroIndex Engineering Platform - Digital Logic Design
 * Automated Verification Suite for Phase 3: Subject Resources and Connected Learning
 * Strictly zero em-dashes and zero en-dashes.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dldSubjectResourcesData } from '../src/data/dldSubjectResourcesData.js';
import { dldSyllabus } from '../src/data/dldSyllabus.js';
import { quizTracks as unit1Tracks } from '../src/data/unit1QuizBank.js';
import { unit2QuizTracks } from '../src/data/unit2QuizBank.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`[PASS] ${message}`);
  } else {
    failed++;
    console.error(`[FAIL] ${message}`);
  }
}

console.log('=================================================================');
console.log('ZEROINDEX PHASE 3: SUBJECT RESOURCES & CONNECTED LEARNING AUDIT');
console.log('=================================================================\n');

// ----------------------------------------------------------------------------
// 1. DATA INTEGRITY: UNITS METADATA & STUDY MATERIALS
// ----------------------------------------------------------------------------
console.log('--- 1. Testing Units Metadata and Prescribed Literature ---');

const { unitsMetadata, studyMaterials, formulaSheets, educationalChannels, referenceWebsites, onlineCalculators, contextualLearningMap } = dldSubjectResourcesData;

assert(Array.isArray(unitsMetadata) && unitsMetadata.length === 5, 'Units metadata contains exactly 5 curriculum units');
assert(unitsMetadata[0].unitNumber === 1 && unitsMetadata[0].badge === 'Completed & Verified', 'Unit I is marked Completed & Verified');
assert(unitsMetadata[1].unitNumber === 2 && unitsMetadata[1].badge === 'Completed & Verified', 'Unit II is marked Completed & Verified');
assert(unitsMetadata[2].badge === 'Planned Curriculum', 'Unit III is marked Planned Curriculum');

// Prescribed Textbooks (Morris Mano, Roth, Malvino)
assert(Array.isArray(studyMaterials.textbooks) && studyMaterials.textbooks.length === 3, 'Prescribed textbooks list contains exactly 3 approved books');
const manoBook = studyMaterials.textbooks.find(b => b.id === 'tb-mano');
assert(manoBook && manoBook.authors.includes('Morris Mano') && manoBook.edition === '5th Edition', 'M. Morris Mano 5th Edition is accurately documented');
assert(manoBook.driveLink === null && manoBook.statusText.includes('soon'), 'Preserves honest Drive status without fabricated URLs for Mano');

const rothBook = studyMaterials.textbooks.find(b => b.id === 'tb-roth');
assert(rothBook && rothBook.authors.includes('Charles H. Roth') && rothBook.edition === '5th Edition', 'Charles H. Roth 5th Edition is accurately documented');

const malvinoBook = studyMaterials.textbooks.find(b => b.id === 'tb-malvino');
assert(malvinoBook && malvinoBook.authors.includes('Malvino') && malvinoBook.edition === '8th Edition', 'Leach, Malvino & Saha 8th Edition is accurately documented');

// Reference Books (Kohavi, Floyd, Jain)
assert(Array.isArray(studyMaterials.referenceBooks) && studyMaterials.referenceBooks.length === 3, 'Supplementary reference books list contains exactly 3 approved books');
const kohaviRef = studyMaterials.referenceBooks.find(b => b.id === 'rb-kohavi');
assert(kohaviRef && kohaviRef.authors.includes('Kohavi'), 'Kohavi & Jha reference book is accurately recorded');

const floydRef = studyMaterials.referenceBooks.find(b => b.id === 'rb-floyd');
assert(floydRef && floydRef.authors.includes('Floyd'), 'Floyd reference book is accurately recorded');

const jainRef = studyMaterials.referenceBooks.find(b => b.id === 'rb-jain');
assert(jainRef && jainRef.authors.includes('Jain'), 'R.P. Jain reference book is accurately recorded');

// Google Drive Placeholder Integrity
assert(studyMaterials.driveConfig.driveUrl === null, 'Google Drive URL is null (honest placeholder)');
assert(studyMaterials.driveConfig.statusText === 'Material link will be added soon.', 'Google Drive status text is honest placeholder');

// ----------------------------------------------------------------------------
// 2. FORMULA SHEETS & QUICK REVISION INTEGRITY (UNITS I & II)
// ----------------------------------------------------------------------------
console.log('\n--- 2. Testing Formula Sheets & Quick Revision Integrity ---');

assert(Array.isArray(formulaSheets.unit1) && formulaSheets.unit1.length === 7, 'Unit 1 has exactly 7 section revision sheets (1.1 to 1.7)');
const u1Sections = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7'];
u1Sections.forEach(secId => {
  const sheet = formulaSheets.unit1.find(s => s.sectionId === secId);
  assert(sheet !== undefined, `Unit 1 contains revision sheet for Section ${secId}`);
  assert(sheet.bullets && sheet.bullets.length >= 3, `Section ${secId} has at least 3 structured bullet points`);
  assert(sheet.keyRules && sheet.keyRules.length >= 2, `Section ${secId} has at least 2 essential rules/formulas`);
});

assert(Array.isArray(formulaSheets.unit2) && formulaSheets.unit2.length === 5, 'Unit 2 has exactly 5 section revision sheets (2.1 to 2.5)');
const u2Sections = ['2.1', '2.2', '2.3', '2.4', '2.5'];
u2Sections.forEach(secId => {
  const sheet = formulaSheets.unit2.find(s => s.sectionId === secId);
  assert(sheet !== undefined, `Unit 2 contains revision sheet for Section ${secId}`);
  assert(sheet.bullets && sheet.bullets.length >= 3, `Section ${secId} has at least 3 structured bullet points`);
  assert(sheet.keyRules && sheet.keyRules.length >= 2, `Section ${secId} has at least 2 essential rules/formulas`);
});

// Mathematical Symbols Verification in Formula Sheets
const sec23Sheet = formulaSheets.unit2.find(s => s.sectionId === '2.3');
assert(sec23Sheet.bullets.some(b => b.includes('\u03A3m') && b.includes('\u03A0M')), 'Section 2.3 formula sheet uses Unicode Sigma (\u03A3m) and Pi (\u03A0M)');

const sec25Sheet = formulaSheets.unit2.find(s => s.sectionId === '2.5');
assert(sec25Sheet.keyRules.some(r => r.detail.includes('00, 01, 11, 10')), 'Section 2.5 formula sheet includes Gray code ordering 00, 01, 11, 10');

// ----------------------------------------------------------------------------
// 3. CURATED EXTERNAL EDUCATORS, WEBSITES & CALCULATORS
// ----------------------------------------------------------------------------
console.log('\n--- 3. Testing Curated Channels, Reference Websites & Calculators ---');

// Recommended Educational Channels (exactly 4)
assert(Array.isArray(educationalChannels) && educationalChannels.length === 4, 'Educational channels contains exactly 4 curated educators');
const channelNames = educationalChannels.map(c => c.name);
assert(channelNames.includes('Neso Academy'), 'Curated channels include Neso Academy');
assert(channelNames.includes('ALL ABOUT ELECTRONICS'), 'Curated channels include ALL ABOUT ELECTRONICS');
assert(channelNames.includes('Gate Smashers'), 'Curated channels include Gate Smashers');
assert(channelNames.includes('Ben Eater'), 'Curated channels include Ben Eater');

educationalChannels.forEach(c => {
  assert(c.specialty && c.reason && c.searchQuery, `Channel ${c.name} has complete specialty, reason, and search query`);
  assert(!c.url || !c.url.includes('youtube.com/watch'), `Channel ${c.name} does not embed video feeds or private video URLs`);
});

// Trusted Academic Reference Websites (exactly 3)
assert(Array.isArray(referenceWebsites) && referenceWebsites.length === 3, 'Academic reference websites contains exactly 3 curated platforms');
referenceWebsites.forEach(site => {
  assert(site.name && site.url.startsWith('https://'), `Website ${site.name} has valid secure HTTPS URL: ${site.url}`);
  assert(site.displayUrl && site.description, `Website ${site.name} has valid display URL and description`);
});

// External Online Calculators (exactly 4)
assert(Array.isArray(onlineCalculators) && onlineCalculators.length === 4, 'External online calculators contains exactly 4 curated tools');
const calcCategories = new Set(onlineCalculators.map(c => c.categoryKey));
assert(calcCategories.has('boolean') && calcCategories.has('kmap') && calcCategories.has('number'), 'Calculators cover boolean, kmap, and number categories');

onlineCalculators.forEach(calc => {
  assert(calc.name && calc.url.startsWith('https://'), `Calculator ${calc.name} has valid secure HTTPS URL: ${calc.url}`);
  assert(calc.syntaxNote && calc.syntaxNote.length > 10, `Calculator ${calc.name} has actionable syntax note`);
  assert(calc.disclaimer && calc.disclaimer.length > 10, `Calculator ${calc.name} has explicit disclaimer`);
});

// ----------------------------------------------------------------------------
// 4. CONTEXTUAL LEARNING CONNECTIONS MAP (LEARN -> EXPERIMENT -> PRACTISE -> REVISE)
// ----------------------------------------------------------------------------
console.log('\n--- 4. Testing Contextual Learning Connections Map ---');

const allExpectedSections = [...u1Sections, ...u2Sections];
assert(Object.keys(contextualLearningMap).length === 12, 'contextualLearningMap contains exactly 12 sections (7 in Unit I, 5 in Unit II)');

const validUnit1TrackIds = unit1Tracks.map(t => t.id);
const validUnit2TrackIds = unit2QuizTracks.map(t => t.id);

allExpectedSections.forEach(secId => {
  const mapping = contextualLearningMap[secId];
  assert(mapping !== undefined, `Mapping exists for section ${secId}`);
  assert(mapping.lessonId === secId, `Mapping lessonId matches section ${secId}`);
  
  // Solver Target Validation
  assert(mapping.solverTarget && mapping.solverTarget.tab === 'solvers', `Section ${secId} solverTarget navigates to solvers tab`);
  assert(typeof mapping.solverTarget.solverTab === 'string', `Section ${secId} has valid solverTab: ${mapping.solverTarget.solverTab}`);
  assert(typeof mapping.solverTarget.label === 'string' && mapping.solverTarget.label.length > 5, `Section ${secId} has actionable solver label`);

  // Practice Target Validation
  assert(mapping.practiceTarget && mapping.practiceTarget.tab === 'practice', `Section ${secId} practiceTarget navigates to practice tab`);
  assert(typeof mapping.practiceTarget.label === 'string' && mapping.practiceTarget.label.length > 5, `Section ${secId} has actionable practice label`);
  
  if (mapping.unit === 1) {
    assert(validUnit1TrackIds.includes(mapping.practiceTarget.trackId), `Unit 1 Section ${secId} trackId "${mapping.practiceTarget.trackId}" exists in unit1QuizBank`);
  } else {
    assert(validUnit2TrackIds.includes(mapping.practiceTarget.trackId), `Unit 2 Section ${secId} trackId "${mapping.practiceTarget.trackId}" exists in unit2QuizTracks`);
  }

  // Resource Target Validation
  assert(mapping.resourceTarget && mapping.resourceTarget.tab === 'syllabus', `Section ${secId} resourceTarget navigates to syllabus tab`);
  assert(typeof mapping.resourceTarget.sheetId === 'string', `Section ${secId} has valid sheetId: ${mapping.resourceTarget.sheetId}`);
});

// ----------------------------------------------------------------------------
// 5. COMPONENT INTEGRATION AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 5. Testing Component Integration and Wiring ---');

const dldWorkspaceSrc = fs.readFileSync(path.join(rootDir, 'src/components/DldWorkspace.jsx'), 'utf-8');
assert(dldWorkspaceSrc.includes('handleContextNavigation'), 'DldWorkspace defines handleContextNavigation');
assert(dldWorkspaceSrc.includes('onNavigate={handleContextNavigation}'), 'DldWorkspace passes handleContextNavigation to components');
assert(dldWorkspaceSrc.includes('initialSolverTab={initialSolverTab}'), 'DldWorkspace passes initialSolverTab to Solvers suites');
assert(dldWorkspaceSrc.includes('initialTrack={initialQuizTrack}'), 'DldWorkspace passes initialTrack to PracticeArena');

const syllabusViewSrc = fs.readFileSync(path.join(rootDir, 'src/components/SyllabusView.jsx'), 'utf-8');
assert(syllabusViewSrc.includes('SubjectResourcesView'), 'SyllabusView imports and renders SubjectResourcesView');

const contextStripSrc = fs.readFileSync(path.join(rootDir, 'src/components/ContextualLearningStrip.jsx'), 'utf-8');
assert(contextStripSrc.includes('dldSubjectResourcesData.contextualLearningMap[sectionId]'), 'ContextualLearningStrip connects to contextualLearningMap');

const unitWorkspaceSrc = fs.readFileSync(path.join(rootDir, 'src/components/UnitWorkspace.jsx'), 'utf-8');
assert(unitWorkspaceSrc.includes('ContextualLearningStrip'), 'UnitWorkspace imports and renders ContextualLearningStrip');

const sec21Src = fs.readFileSync(path.join(rootDir, 'src/components/Section21View.jsx'), 'utf-8');
assert(sec21Src.includes('ContextualLearningStrip') && sec21Src.includes('sectionId="2.1"'), 'Section21View renders ContextualLearningStrip for 2.1');

const sec22Src = fs.readFileSync(path.join(rootDir, 'src/components/Section22View.jsx'), 'utf-8');
assert(sec22Src.includes('ContextualLearningStrip') && sec22Src.includes('sectionId="2.2"'), 'Section22View renders ContextualLearningStrip for 2.2');

const sec23Src = fs.readFileSync(path.join(rootDir, 'src/components/Section23View.jsx'), 'utf-8');
assert(sec23Src.includes('ContextualLearningStrip') && sec23Src.includes('sectionId="2.3"'), 'Section23View renders ContextualLearningStrip for 2.3');

const sec24Src = fs.readFileSync(path.join(rootDir, 'src/components/Section24View.jsx'), 'utf-8');
assert(sec24Src.includes('ContextualLearningStrip') && sec24Src.includes('sectionId="2.4"'), 'Section24View renders ContextualLearningStrip for 2.4');

const sec25Src = fs.readFileSync(path.join(rootDir, 'src/components/Section25View.jsx'), 'utf-8');
assert(sec25Src.includes('ContextualLearningStrip') && sec25Src.includes('sectionId="2.5"'), 'Section25View renders ContextualLearningStrip for 2.5');

// ----------------------------------------------------------------------------
// 6. ZERO-DASH COMPLIANCE AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 6. Testing Zero-Dash Compliance across Phase 3 Files ---');

const phase3Files = [
  'src/data/dldSubjectResourcesData.js',
  'src/components/SubjectResourcesView.jsx',
  'src/components/ContextualLearningStrip.jsx',
  'src/components/SyllabusView.jsx',
  'src/components/DldWorkspace.jsx',
  'src/components/PracticeArena.jsx',
  'src/components/Unit2Solvers.jsx',
  'src/components/InteractiveSolvers.jsx'
];

phase3Files.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const hasEmDash = content.includes('\u2014');
  const hasEnDash = content.includes('\u2013');
  assert(!hasEmDash, `${relPath} contains 0 em-dashes (\\u2014)`);
  assert(!hasEnDash, `${relPath} contains 0 en-dashes (\\u2013)`);
});

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log(`PHASE 3 VERIFICATION COMPLETE: ${passed} passed, ${failed} failed`);
console.log('=================================================================');

if (failed > 0) {
  process.exit(1);
}
