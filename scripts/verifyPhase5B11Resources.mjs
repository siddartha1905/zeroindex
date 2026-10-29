/**
 * ZeroIndex Engineering Platform - Digital Logic Design (DLD)
 * Automated Verification Suite for Phase 5B.11: Subject Resources Redesign
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('================================================================');
console.log('ZEROINDEX PHASE 5B.11: DLD SUBJECT RESOURCES AUDIT');
console.log('================================================================\n');

// 1. Vite SSR Loader Setup
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  root: rootDir
});

try {
  // SUITE 1: Data Integrity & Central Resource Configuration Audit
  console.log('SUITE 1: Data Integrity and Central Resource Registry Audit');
  const resourcesModule = await vite.ssrLoadModule('/src/data/dldSubjectResourcesData.js');
  const { dldSubjectResourcesData, dldFacultyStudyMaterials } = resourcesModule;
  const syllabusModule = await vite.ssrLoadModule('/src/data/dldSyllabus.js');
  const { dldSyllabus } = syllabusModule;

  // Course Metadata Preservation
  assert(dldSyllabus.courseCode === '1005261102', 'Course code preserved as 1005261102');
  assert(dldSyllabus.courseTitle === 'Digital Logic Design', 'Course title preserved as Digital Logic Design');
  assert(dldSyllabus.yearSem.includes('I Year - I Semester'), 'Year and semester preserved as I Year - I Semester');
  assert(dldSyllabus.ltpc === 'L-T-P-C: 3-0-0-3', 'L-T-P-C scheme preserved as 3-0-0-3');
  assert(dldSyllabus.credits === 3, 'Course credits preserved as 3');
  assert(dldSyllabus.objectives.length === 3, 'Exactly 3 course objectives from syllabus PDF');
  assert(dldSyllabus.outcomes.length === 5, 'Exactly 5 course outcomes (CO1 to CO5) from syllabus PDF');
  assert(dldSyllabus.units.length === 5, 'Exactly 5 units in syllabus');

  // Textbooks Audit (Exactly 2 prescribed, 3 reference - matching syllabus PDF)
  const textbooks = dldSubjectResourcesData.studyMaterials.textbooks;
  assert(Array.isArray(textbooks) && textbooks.length === 2, 'Prescribed textbooks contains exactly 2 approved books (Mano, Roth)');
  const hasLibraryCode = textbooks.some(tb => tb.libraryCallNumber || JSON.stringify(tb).includes('EC-0421') || JSON.stringify(tb).includes('EC 4021'));
  assert(!hasLibraryCode, 'Unverified library identifiers (such as EC-0421) are completely removed from textbooks');

  const refBooks = dldSubjectResourcesData.studyMaterials.referenceBooks;
  assert(Array.isArray(refBooks) && refBooks.length === 3, 'Reference books contains exactly 3 approved books (Mano, Leach/Malvino/Saha, Jain)');
  const hasOldRefs = refBooks.some(rb => rb.id === 'rb-kohavi' || rb.id === 'rb-floyd');
  assert(!hasOldRefs, 'Unlisted reference books (Kohavi, Floyd) are removed from official reference list');

  // Unit-Wise Faculty Study Materials Configuration (Units I to V: Two Categories Per Unit)
  assert(Array.isArray(dldFacultyStudyMaterials) && dldFacultyStudyMaterials.length === 5, 'Faculty study materials contains exactly 5 units (Units I to V)');
  dldFacultyStudyMaterials.forEach((u, idx) => {
    assert(u.unitNumber === idx + 1, `Unit ${idx + 1} has correct unitNumber`);
    assert(Array.isArray(u.pdfMaterials) && u.pdfMaterials.length === 2, `Unit ${u.roman} contains exactly 2 initial entries in pdfMaterials category`);
    assert(Array.isArray(u.pptMaterials) && u.pptMaterials.length === 2, `Unit ${u.roman} contains exactly 2 initial entries in pptMaterials category`);
    assert(Array.isArray(u.resources) && u.resources.length === 4, `Unit ${u.roman} maintains backward-compatible resources array`);

    // Verify PDF Materials Category
    u.pdfMaterials.forEach((file, fIdx) => {
      assert(file.id && typeof file.id === 'string', `Unit ${u.roman} PDF file ${fIdx + 1} has stable ID: ${file.id}`);
      assert(file.title && file.title.startsWith('PDF'), `Unit ${u.roman} PDF file ${fIdx + 1} has title: ${file.title}`);
      assert(file.resourceType === 'PDF' && file.type === 'PDF', `Unit ${u.roman} PDF file ${fIdx + 1} has PDF resourceType`);
      assert(file.url === null || typeof file.url === 'string', `Unit ${u.roman} PDF file ${fIdx + 1} has honest URL`);
      assert(file.status === 'pending' || file.status === 'planned' || file.status === 'available', `Unit ${u.roman} PDF file ${fIdx + 1} has valid status`);
    });

    // Verify PPT Materials Category
    u.pptMaterials.forEach((file, fIdx) => {
      assert(file.id && typeof file.id === 'string', `Unit ${u.roman} PPT file ${fIdx + 1} has stable ID: ${file.id}`);
      assert(file.title && file.title.startsWith('PPT'), `Unit ${u.roman} PPT file ${fIdx + 1} has title: ${file.title}`);
      assert(file.resourceType === 'PPT' && file.type === 'PPT', `Unit ${u.roman} PPT file ${fIdx + 1} has PPT resourceType`);
      assert(file.url === null || typeof file.url === 'string', `Unit ${u.roman} PPT file ${fIdx + 1} has honest URL`);
      assert(file.status === 'pending' || file.status === 'planned' || file.status === 'available', `Unit ${u.roman} PPT file ${fIdx + 1} has valid status`);
    });
  });

  // SUITE 2: Curated External Resources (Channels, Websites, Calculators)
  console.log('\nSUITE 2: Curated External Channels, Websites, and Calculators Audit');
  const { educationalChannels, referenceWebsites, onlineCalculators } = dldSubjectResourcesData;

  // Channels
  assert(educationalChannels.length === 4, 'Educational channels contains exactly 4 curated educators');
  educationalChannels.forEach(c => {
    assert(c.url && c.url.startsWith('https://www.youtube.com/@'), `Channel ${c.name} has verified official YouTube channel link: ${c.url}`);
    assert(!c.url.includes('watch?v='), `Channel ${c.name} does not embed individual video feeds`);
  });

  // Reference Websites
  assert(referenceWebsites.length === 3, 'Academic reference websites contains exactly 3 verified platforms');
  referenceWebsites.forEach(w => {
    assert(w.url && w.url.startsWith('https://'), `Website ${w.name} has secure HTTPS URL: ${w.url}`);
  });

  // Online Calculators
  assert(onlineCalculators.length === 4, 'External online calculators contains exactly 4 verified tools');
  onlineCalculators.forEach(calc => {
    assert(calc.url && calc.url.startsWith('https://'), `Calculator ${calc.name} has secure HTTPS URL: ${calc.url}`);
    assert(calc.disclaimer && calc.disclaimer.length > 10, `Calculator ${calc.name} has explicit academic disclaimer`);
  });

  // SUITE 3: Component SSR and Five-Tab Architecture Audit
  console.log('\nSUITE 3: Component SSR and Five-Tab Architecture Audit');
  const viewModule = await vite.ssrLoadModule('/src/components/SubjectResourcesView.jsx');
  const SubjectResourcesView = viewModule.SubjectResourcesView || viewModule.default;
  assert(typeof SubjectResourcesView === 'function', 'SubjectResourcesView component loaded cleanly via Vite SSR');

  const syllabusViewModule = await vite.ssrLoadModule('/src/components/SyllabusView.jsx');
  const SyllabusView = syllabusViewModule.SyllabusView || syllabusViewModule.default;
  assert(typeof SyllabusView === 'function', 'SyllabusView component loaded cleanly via Vite SSR');

  const html = ReactDOMServer.renderToString(React.createElement(SubjectResourcesView));
  assert(typeof html === 'string' && html.length > 5000, `SubjectResourcesView rendered cleanly via SSR (${html.length} bytes)`);

  // Five Exact Tab Labels in Output
  assert(html.includes('1. Curriculum &amp; Syllabus') || html.includes('1. Curriculum & Syllabus'), 'Navigation contains Tab 1: Curriculum & Syllabus');
  assert(html.includes('2. Textbooks &amp; Study Materials') || html.includes('2. Textbooks & Study Materials'), 'Navigation contains Tab 2: Textbooks & Study Materials');
  assert(html.includes('3. Educational Channels'), 'Navigation contains Tab 3: Educational Channels');
  assert(html.includes('4. Reference Websites'), 'Navigation contains Tab 4: Reference Websites');
  assert(html.includes('5. Online Calculators'), 'Navigation contains Tab 5: Online Calculators');

  // Verify Removal of Old Duplicated Presentation Elements
  assert(!html.includes('Active Course Unit:'), 'Active Course Unit display is removed from Subject Resources');
  assert(!html.includes('VIIT-LIB-EC-0421'), 'Unverified library identifier VIIT-LIB-EC-0421 is absent from output');
  assert(!html.includes('Boolean Laws Cheat Sheet'), 'Formula-sheet modal trigger is absent from Subject Resources');
  assert(!html.includes('Try in Logic Gates Simulator'), 'Repeated Interactive Solver link is absent from Subject Resources');

  // Verify Official Syllabus PDF Link Field & Removal of PO Mapping Placeholder
  assert(html.includes('View Official Syllabus PDF'), 'HTML includes external syllabus PDF link field');
  assert(!html.includes('CO-PO Mapping Matrix'), 'Speculative CO-PO mapping matrix placeholder is removed from student view');
  assert(!html.includes('Programme Outcomes (POs)'), 'Speculative Programme Outcomes placeholder is removed from student view');

  // Verify Academic Course Details
  assert(html.includes('1005261102'), 'HTML includes course code 1005261102');
  assert(html.includes('Digital Logic Design'), 'HTML includes course title Digital Logic Design');

  // SUITE 4: Strict Zero-Dash Compliance Audit
  console.log('\nSUITE 4: Strict Zero-Dash Compliance Audit');
  const auditFiles = [
    'src/data/dldSubjectResourcesData.js',
    'src/data/dldSyllabus.js',
    'src/components/SubjectResourcesView.jsx',
    'src/components/SyllabusView.jsx',
    'scripts/verifyPhase5B11Resources.mjs',
    'scripts/verifyDldResources.mjs'
  ];

  auditFiles.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const emDashes = (content.match(/\u2014/g) || []).length;
    const enDashes = (content.match(/\u2013/g) || []).length;
    assert(emDashes === 0, `${relPath}: Zero em-dashes verified (found: ${emDashes})`);
    assert(enDashes === 0, `${relPath}: Zero en-dashes verified (found: ${enDashes})`);
  });

  console.log('\n================================================================');
  console.log(`VERIFICATION SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed, ${passedChecks + failedChecks} Total Checks`);
  console.log('================================================================\n');

  if (failedChecks > 0) {
    process.exit(1);
  }
} catch (err) {
  console.error('Audit encountered unexpected error:', err);
  process.exit(1);
} finally {
  await vite.close();
}
