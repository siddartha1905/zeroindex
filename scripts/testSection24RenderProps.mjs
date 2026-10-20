/**
 * Render Props and Data Schema Validation for Section 2.4
 * Ensures that EVERY property accessed by Section24View.jsx exists in dldSection24Data.js
 * Strictly zero em-dashes and zero en-dashes.
 */

import { dldSection24Data as data } from '../src/data/dldSection24Data.js';

let errors = 0;

function check(val, path) {
  if (val === undefined || val === null) {
    console.error(`[FAIL] Missing required property: ${path}`);
    errors++;
  }
}

console.log("Checking Section 2.4 Data Integrity for Section24View...");

// 1. Root & Header
check(data.number, 'data.number');
check(data.title, 'data.title');
check(data.badge, 'data.badge');
check(data.estimatedReadTime, 'data.estimatedReadTime');
check(data.overview, 'data.overview');
check(data.dataScienceConnection, 'data.dataScienceConnection');
check(data.learningOutcomes, 'data.learningOutcomes');

// 2. Tab 1: Start Here
check(data.startHere, 'data.startHere');
check(data.startHere.title, 'data.startHere.title');
check(data.startHere.centralQuestion, 'data.startHere.centralQuestion');
check(data.startHere.whyReasons, 'data.startHere.whyReasons');
data.startHere.whyReasons.forEach((r, i) => {
  check(r.keyword, `data.startHere.whyReasons[${i}].keyword`);
  check(r.detail, `data.startHere.whyReasons[${i}].detail`);
});
check(data.startHere.hardwareQualification, 'data.startHere.hardwareQualification');
check(data.startHere.hardwareQualification.title, 'data.startHere.hardwareQualification.title');
check(data.startHere.hardwareQualification.points, 'data.startHere.hardwareQualification.points');

check(data.startHere.primaryDemonstration, 'data.startHere.primaryDemonstration');
check(data.startHere.primaryDemonstration.title, 'data.startHere.primaryDemonstration.title');
check(data.startHere.primaryDemonstration.functionSOP, 'data.startHere.primaryDemonstration.functionSOP');
check(data.startHere.primaryDemonstration.functionPOS, 'data.startHere.primaryDemonstration.functionPOS');
check(data.startHere.primaryDemonstration.algebraicProof, 'data.startHere.primaryDemonstration.algebraicProof');
data.startHere.primaryDemonstration.algebraicProof.forEach((p, i) => {
  check(p.step, `data.startHere.primaryDemonstration.algebraicProof[${i}].step`);
  check(p.expr, `data.startHere.primaryDemonstration.algebraicProof[${i}].expr`);
  check(p.note, `data.startHere.primaryDemonstration.algebraicProof[${i}].note`);
});
check(data.startHere.primaryDemonstration.truthTable, 'data.startHere.primaryDemonstration.truthTable');
check(data.startHere.twoLevelTopologies, 'data.startHere.twoLevelTopologies');
check(data.startHere.twoLevelTopologies.sop, 'data.startHere.twoLevelTopologies.sop');
check(data.startHere.twoLevelTopologies.pos, 'data.startHere.twoLevelTopologies.pos');
check(data.startHere.problemSolvingRoadmap, 'data.startHere.problemSolvingRoadmap');
data.startHere.problemSolvingRoadmap.forEach((s, i) => {
  check(s.stage, `data.startHere.problemSolvingRoadmap[${i}].stage`);
  check(s.action, `data.startHere.problemSolvingRoadmap[${i}].action`);
  check(s.detail, `data.startHere.problemSolvingRoadmap[${i}].detail`);
});

// 3. Tab 2: Conversion Methods
check(data.conversionMethods, 'data.conversionMethods');
data.conversionMethods.forEach((m, i) => {
  check(m.id, `data.conversionMethods[${i}].id`);
  check(m.name, `data.conversionMethods[${i}].name`);
  check(m.whenRequired, `data.conversionMethods[${i}].whenRequired`);
  check(m.startForm, `data.conversionMethods[${i}].startForm`);
  check(m.targetForm, `data.conversionMethods[${i}].targetForm`);
  check(m.mainRule, `data.conversionMethods[${i}].mainRule`);
  check(m.procedure, `data.conversionMethods[${i}].procedure`);
  check(m.example, `data.conversionMethods[${i}].example`);
  check(m.example.title, `data.conversionMethods[${i}].example.title`);
  check(m.example.steps, `data.conversionMethods[${i}].example.steps`);
  check(m.example.result, `data.conversionMethods[${i}].example.result`);
  check(m.commonMistake, `data.conversionMethods[${i}].commonMistake`);
  check(m.shortcut, `data.conversionMethods[${i}].shortcut`);
});
check(data.conversionVsComplementation, 'data.conversionVsComplementation');
check(data.conversionVsComplementation.title, 'data.conversionVsComplementation.title');
check(data.conversionVsComplementation.warning, 'data.conversionVsComplementation.warning');
check(data.conversionVsComplementation.principles, 'data.conversionVsComplementation.principles');
check(data.conversionVsComplementation.concreteExample, 'data.conversionVsComplementation.concreteExample');

// 4. Tab 3: Guided Demonstrations
check(data.guidedDemos, 'data.guidedDemos');
data.guidedDemos.forEach((d, i) => {
  check(d.id, `data.guidedDemos[${i}].id`);
  check(d.title, `data.guidedDemos[${i}].title`);
  check(d.target, `data.guidedDemos[${i}].target`);
  check(d.objective, `data.guidedDemos[${i}].objective`);
  check(d.steps, `data.guidedDemos[${i}].steps`);
  d.steps.forEach((st, j) => {
    check(st.phase, `data.guidedDemos[${i}].steps[${j}].phase`);
    check(st.expression, `data.guidedDemos[${i}].steps[${j}].expression`);
    check(st.explanation, `data.guidedDemos[${i}].steps[${j}].explanation`);
  });
  check(d.finalForm, `data.guidedDemos[${i}].finalForm`);
  check(d.verification, `data.guidedDemos[${i}].verification`);
});

// 5. Tab 4: Worked Models (18)
check(data.workedModels, 'data.workedModels');
data.workedModels.forEach((m, i) => {
  check(m.id, `data.workedModels[${i}].id`);
  check(m.difficulty, `data.workedModels[${i}].difficulty`);
  check(m.title, `data.workedModels[${i}].title`);
  check(m.problemStatement, `data.workedModels[${i}].problemStatement`);
  check(m.declaredVariables, `data.workedModels[${i}].declaredVariables`);
  check(m.variableOrder, `data.workedModels[${i}].variableOrder`);
  check(m.methodSelected, `data.workedModels[${i}].methodSelected`);
  check(m.methodRationale, `data.workedModels[${i}].methodRationale`);
  check(m.solutionSteps, `data.workedModels[${i}].solutionSteps`);
  m.solutionSteps.forEach((st, j) => {
    check(st.step, `data.workedModels[${i}].solutionSteps[${j}].step`);
    check(st.expr, `data.workedModels[${i}].solutionSteps[${j}].expr`);
    check(st.law, `data.workedModels[${i}].solutionSteps[${j}].law`);
    check(st.reason, `data.workedModels[${i}].solutionSteps[${j}].reason`);
  });
  check(m.finalAnswer, `data.workedModels[${i}].finalAnswer`);
  check(m.verificationNote, `data.workedModels[${i}].verificationNote`);
});

// 6. Tab 5: Cheat Sheet
check(data.cheatSheet, 'data.cheatSheet');
check(data.cheatSheet.title, 'data.cheatSheet.title');
check(data.cheatSheet.formulaPanel, 'data.cheatSheet.formulaPanel');
check(data.cheatSheet.decisionTable, 'data.cheatSheet.decisionTable');
check(data.cheatSheet.coreIdentities, 'data.cheatSheet.coreIdentities');
check(data.cheatSheet.commonMistakes, 'data.cheatSheet.commonMistakes');
data.cheatSheet.commonMistakes.forEach((cm, i) => {
  check(cm.mistake, `data.cheatSheet.commonMistakes[${i}].mistake`);
  check(cm.correct, `data.cheatSheet.commonMistakes[${i}].correct`);
  check(cm.why, `data.cheatSheet.commonMistakes[${i}].why`);
});

// 7. Tab 6: Practice Lab (28)
check(data.practiceLab, 'data.practiceLab');
data.practiceLab.forEach((p, i) => {
  check(p.id, `data.practiceLab[${i}].id`);
  check(p.difficulty, `data.practiceLab[${i}].difficulty`);
  check(p.problemStatement, `data.practiceLab[${i}].problemStatement`);
  check(p.declaredVariables, `data.practiceLab[${i}].declaredVariables`);
  check(p.target, `data.practiceLab[${i}].target`);
  check(p.hint, `data.practiceLab[${i}].hint`);
  check(p.steps, `data.practiceLab[${i}].steps`);
  p.steps.forEach((st, j) => {
    check(st.step, `data.practiceLab[${i}].steps[${j}].step`);
    check(st.expr, `data.practiceLab[${i}].steps[${j}].expr`);
    check(st.law, `data.practiceLab[${i}].steps[${j}].law`);
    check(st.reason, `data.practiceLab[${i}].steps[${j}].reason`);
  });
  check(p.finalAnswer, `data.practiceLab[${i}].finalAnswer`);
  check(p.takeaway, `data.practiceLab[${i}].takeaway`);
});

if (errors === 0) {
  console.log("ALL DATA PROPERTIES CHECKED: 100% VALID SCHEMA!");
} else {
  console.error(`FAILED: ${errors} errors detected.`);
  process.exit(1);
}
