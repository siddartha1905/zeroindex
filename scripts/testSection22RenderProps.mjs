/**
 * Render Props and Data Schema Validation for Section 2.2
 * Ensures that EVERY property accessed by Section22View.jsx exists in dldSection22Data.js
 * Strictly zero em-dashes and zero en-dashes.
 */

import { dldSection22Data as data } from '../src/data/dldSection22Data.js';

let errors = 0;

function check(val, path) {
  if (val === undefined || val === null) {
    console.error(`[FAIL] Missing required property: ${path}`);
    errors++;
  }
}

console.log("Checking Section 2.2 Data Integrity for Section22View...");

// 1. Root & Header
check(data.number, 'data.number');
check(data.title, 'data.title');
check(data.badge, 'data.badge');
check(data.estimatedReadTime, 'data.estimatedReadTime');
check(data.description, 'data.description');

// 2. Tab 1: Start Here
check(data.startHere, 'data.startHere');
check(data.startHere.whySimplify, 'data.startHere.whySimplify');
check(data.startHere.whySimplify.headline, 'data.startHere.whySimplify.headline');
check(data.startHere.whySimplify.quote, 'data.startHere.whySimplify.quote');
check(data.startHere.whySimplify.benefits, 'data.startHere.whySimplify.benefits');
data.startHere.whySimplify.benefits.forEach((b, i) => {
  check(b.title, `data.startHere.whySimplify.benefits[${i}].title`);
  check(b.desc, `data.startHere.whySimplify.benefits[${i}].desc`);
});
check(data.startHere.whySimplify.engineeringNote, 'data.startHere.whySimplify.engineeringNote');
check(data.startHere.whySimplify.section21Ref, 'data.startHere.whySimplify.section21Ref');

check(data.startHere.objectiveDemo, 'data.startHere.objectiveDemo');
check(data.startHere.objectiveDemo.title, 'data.startHere.objectiveDemo.title');
check(data.startHere.objectiveDemo.expression, 'data.startHere.objectiveDemo.expression');
check(data.startHere.objectiveDemo.result, 'data.startHere.objectiveDemo.result');
check(data.startHere.objectiveDemo.lawApplied, 'data.startHere.objectiveDemo.lawApplied');
check(data.startHere.objectiveDemo.explanation, 'data.startHere.objectiveDemo.explanation');
check(data.startHere.objectiveDemo.comparison, 'data.startHere.objectiveDemo.comparison');
check(data.startHere.objectiveDemo.comparison.before, 'data.startHere.objectiveDemo.comparison.before');
check(data.startHere.objectiveDemo.comparison.after, 'data.startHere.objectiveDemo.comparison.after');

check(data.startHere.sixSteps, 'data.startHere.sixSteps');
check(data.startHere.sixSteps.title, 'data.startHere.sixSteps.title');
check(data.startHere.sixSteps.steps, 'data.startHere.sixSteps.steps');
data.startHere.sixSteps.steps.forEach((s, i) => {
  check(s.step, `data.startHere.sixSteps.steps[${i}].step`);
  check(s.name, `data.startHere.sixSteps.steps[${i}].name`);
  check(s.desc, `data.startHere.sixSteps.steps[${i}].desc`);
});
check(data.startHere.sixSteps.loopNote, 'data.startHere.sixSteps.loopNote');

check(data.startHere.equivVsMinimal, 'data.startHere.equivVsMinimal');
check(data.startHere.equivVsMinimal.title, 'data.startHere.equivVsMinimal.title');
check(data.startHere.equivVsMinimal.definitions, 'data.startHere.equivVsMinimal.definitions');
data.startHere.equivVsMinimal.definitions.forEach((d, i) => {
  check(d.term, `data.startHere.equivVsMinimal.definitions[${i}].term`);
  check(d.meaning, `data.startHere.equivVsMinimal.definitions[${i}].meaning`);
});
check(data.startHere.equivVsMinimal.cautionNote, 'data.startHere.equivVsMinimal.cautionNote');

// 3. Tab 2: Techniques
check(data.techniques, 'data.techniques');
check(data.techniques.fourOrLaws, 'data.techniques.fourOrLaws');
data.techniques.fourOrLaws.forEach((l, i) => {
  check(l.name, `fourOrLaws[${i}].name`);
  check(l.formula, `fourOrLaws[${i}].formula`);
  check(l.explanation, `fourOrLaws[${i}].explanation`);
});
check(data.techniques.fourAndLaws, 'data.techniques.fourAndLaws');
data.techniques.fourAndLaws.forEach((l, i) => {
  check(l.name, `fourAndLaws[${i}].name`);
  check(l.formula, `fourAndLaws[${i}].formula`);
  check(l.explanation, `fourAndLaws[${i}].explanation`);
});
check(data.techniques.dualitySummary, 'data.techniques.dualitySummary');
check(data.techniques.tenTechniques, 'data.techniques.tenTechniques');
data.techniques.tenTechniques.forEach((t, i) => {
  check(t.number, `tenTechniques[${i}].number`);
  check(t.name, `tenTechniques[${i}].name`);
  check(t.pattern, `tenTechniques[${i}].pattern`);
  check(t.formula, `tenTechniques[${i}].formula`);
  check(t.whyItWorks, `tenTechniques[${i}].whyItWorks`);
  check(t.example, `tenTechniques[${i}].example`);
  check(t.whenToApply, `tenTechniques[${i}].whenToApply`);
});
check(data.commonMistakes, 'data.commonMistakes');
data.commonMistakes.forEach((m, i) => {
  check(m.mistake, `commonMistakes[${i}].mistake`);
  check(m.correctMethod, `commonMistakes[${i}].correctMethod`);
  check(m.why, `commonMistakes[${i}].why`);
});

// 4. Tab 3: Worked Models
check(data.workedModels, 'data.workedModels');
if (data.workedModels.length !== 24) {
  console.error(`Expected 24 worked models, found ${data.workedModels.length}`);
  errors++;
}
data.workedModels.forEach((m, i) => {
  check(m.id, `workedModels[${i}].id`);
  check(m.number, `workedModels[${i}].number`);
  check(m.level, `workedModels[${i}].level`);
  check(m.title, `workedModels[${i}].title`);
  check(m.variables, `workedModels[${i}].variables`);
  check(m.techniques, `workedModels[${i}].techniques`);
  check(m.originalExpression, `workedModels[${i}].originalExpression`);
  check(m.finalAnswer, `workedModels[${i}].finalAnswer`);
  check(m.verification, `workedModels[${i}].verification`);
  check(m.steps, `workedModels[${i}].steps`);
  m.steps.forEach((st, sIdx) => {
    check(st.step, `workedModels[${i}].steps[${sIdx}].step`);
    check(st.expr, `workedModels[${i}].steps[${sIdx}].expr`);
    check(st.law, `workedModels[${i}].steps[${sIdx}].law`);
    check(st.reason, `workedModels[${i}].steps[${sIdx}].reason`);
  });
});

// 5. Tab 4: Cheat Sheet
check(data.cheatSheet, 'data.cheatSheet');
check(data.cheatSheet.orLawsTable, 'data.cheatSheet.orLawsTable');
check(data.cheatSheet.andLawsTable, 'data.cheatSheet.andLawsTable');
check(data.cheatSheet.patternRecognition, 'data.cheatSheet.patternRecognition');
check(data.cheatSheet.precedenceHierarchy, 'data.cheatSheet.precedenceHierarchy');
check(data.cheatSheet.factoringShortcuts, 'data.cheatSheet.factoringShortcuts');
check(data.cheatSheet.decisionGuide, 'data.cheatSheet.decisionGuide');
check(data.cheatSheet.simplificationChecklist, 'data.cheatSheet.simplificationChecklist');

// 6. Tab 5: Practice Lab
check(data.practiceLab, 'data.practiceLab');
if (data.practiceLab.length !== 24) {
  console.error(`Expected 24 practice problems, found ${data.practiceLab.length}`);
  errors++;
}
data.practiceLab.forEach((p, i) => {
  check(p.id, `practiceLab[${i}].id`);
  check(p.number, `practiceLab[${i}].number`);
  check(p.difficulty, `practiceLab[${i}].difficulty`);
  check(p.variables, `practiceLab[${i}].variables`);
  check(p.problem, `practiceLab[${i}].problem`);
  check(p.techniques, `practiceLab[${i}].techniques`);
  check(p.hint1, `practiceLab[${i}].hint1`);
  check(p.solutionSteps, `practiceLab[${i}].solutionSteps`);
  check(p.finalAnswer, `practiceLab[${i}].finalAnswer`);
  p.solutionSteps.forEach((st, sIdx) => {
    check(st.step, `practiceLab[${i}].solutionSteps[${sIdx}].step`);
    check(st.expr, `practiceLab[${i}].solutionSteps[${sIdx}].expr`);
    check(st.law, `practiceLab[${i}].solutionSteps[${sIdx}].law`);
    check(st.reason, `practiceLab[${i}].solutionSteps[${sIdx}].reason`);
  });
});

if (errors === 0) {
  console.log("\n[SUCCESS] 100% of data schema properties exist and are valid!");
} else {
  console.error(`\n[FAILURE] ${errors} schema errors detected!`);
  process.exit(1);
}
