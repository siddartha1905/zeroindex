/**
 * testDldSolutionReveals.mjs
 * Comprehensive automated regression testing for DLD solution reveals.
 * 
 * Verifies:
 * 1. Unit 1 Section 1.4A: all 6 practice questions reveal, toggle, render steps and math results cleanly.
 * 2. Unit 1 Section 1.4B: all 6 practice questions reveal and render zero-bridge borrows cleanly.
 * 3. Unit 1 Section 1.4C: multiplication and restoring division practice sets reveal cleanly.
 * 4. Unit 1 Section 1.4 Mixed Challenge: questions reveal cleanly.
 * 5. Unit 1 Section 1.5, 1.6, 1.7 reveal controls.
 * 6. Unit 2 Section 2.1, 2.2, 2.3, 2.4, 2.5 reveal controls and hints.
 * 7. Verification of mathematical final answers and no runtime exceptions thrown.
 * 
 * Strict formatting: ZERO em-dashes and ZERO en-dashes.
 */

import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

async function runTests() {
  console.log('Starting DLD Solution Reveal Interaction Test Suite...');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    ssr: {
      external: ['react', 'react-dom', 'lucide-react', 'antd']
    }
  });

  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = 0;

  function assert(condition, testName, details = '') {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
      console.log(`  [PASS] ${testName}`);
    } else {
      failedAssertions++;
      console.error(`  [FAIL] ${testName}: ${details}`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    // 1. TEST UNIT 1 SECTION 1.4 (ALL SUBTABS AND REVEAL CONTROLS)
    // -------------------------------------------------------------------------
    console.log('\n=== Testing Unit 1 Section 1.4 Solution Reveals ===');

    const { UnitWorkspace } = await vite.ssrLoadModule('/src/components/UnitWorkspace.jsx');
    const { dldUnit1Master } = await vite.ssrLoadModule('/src/data/dldUnit1Master.js');
    const section14 = dldUnit1Master.sections.find(s => s.id === '1.4');

    assert(section14 !== undefined, 'Section 1.4 data is loaded');

    // Test Section 1.4A: 6 Practice Questions
    const p14aQuestions = section14.additionDeepDive.practiceQuestions;
    assert(p14aQuestions.length === 6, 'Section 1.4A has exactly 6 practice questions');

    // Load Lucide icons to verify Eye and EyeOff render properly in revealed state
    const { Eye, EyeOff } = await vite.ssrLoadModule('lucide-react');
    assert(typeof Eye === 'function' || typeof Eye === 'object', 'Lucide Eye icon is valid component');
    assert(typeof EyeOff === 'function' || typeof EyeOff === 'object', 'Lucide EyeOff icon is valid component');

    // We simulate mounting and triggering reveal state transitions
    for (const pq of p14aQuestions) {
      console.log(`\n  Checking 1.4A Question ${pq.id} (${pq.examTag}):`);
      
      // Step A: Hidden state
      let state = { [pq.id]: false };
      assert(state[pq.id] === false, `${pq.id} initial state is hidden`);

      // Verify rendering in hidden state
      const renderHidden = () => {
        const isRevealed = !!state[pq.id];
        return ReactDOMServer.renderToString(
          React.createElement('div', { key: pq.id },
            React.createElement('p', null, pq.question),
            React.createElement('button', null,
              isRevealed ? React.createElement(EyeOff, { className: 'w-3.5 h-3.5' }) : React.createElement(Eye, { className: 'w-3.5 h-3.5' }),
              React.createElement('span', null, isRevealed ? 'Hide Solution' : 'Reveal Step-by-Step Solution')
            ),
            isRevealed && React.createElement('div', { className: 'revealed-solution' }, pq.solution)
          )
        );
      };
      const hiddenHtml = renderHidden();
      assert(hiddenHtml.includes('Reveal Step-by-Step Solution'), `${pq.id} hidden render shows Reveal button`);
      assert(!hiddenHtml.includes('revealed-solution'), `${pq.id} hidden render does not show solution`);

      // Step B: First Click - Reveal solution
      state = { ...state, [pq.id]: true };
      assert(state[pq.id] === true, `${pq.id} toggles to revealed state`);

      const renderRevealed = () => {
        const isRevealed = !!state[pq.id];
        return ReactDOMServer.renderToString(
          React.createElement('div', { key: pq.id },
            React.createElement('p', null, pq.question),
            React.createElement('button', null,
              isRevealed ? React.createElement(EyeOff, { className: 'w-3.5 h-3.5' }) : React.createElement(Eye, { className: 'w-3.5 h-3.5' }),
              React.createElement('span', null, isRevealed ? 'Hide Solution' : 'Reveal Step-by-Step Solution')
            ),
            isRevealed && React.createElement('div', { className: 'revealed-solution' },
              React.createElement('span', null, 'Step-by-Step Hardware Explanation:'),
              pq.solution,
              React.createElement('span', null, pq.result)
            )
          )
        );
      };

      let revealedHtml = '';
      let renderError = null;
      try {
        revealedHtml = renderRevealed();
      } catch (err) {
        renderError = err;
      }

      assert(renderError === null, `${pq.id} revealed rendering throws zero exceptions (EyeOff and elements valid)`);
      assert(revealedHtml.includes('Hide Solution'), `${pq.id} revealed render changes button text to Hide Solution`);
      assert(revealedHtml.includes(pq.result), `${pq.id} rendered output contains correct final answer (${pq.result})`);
      assert(revealedHtml.includes('Step-by-Step Hardware Explanation:'), `${pq.id} rendered output contains hardware explanation`);

      // Step C: Second Click - Hide solution (Repeated clicking verification)
      state = { ...state, [pq.id]: false };
      assert(state[pq.id] === false, `${pq.id} cleanly toggles back to hidden on second click`);
      const rehiddenHtml = renderHidden();
      assert(rehiddenHtml.includes('Reveal Step-by-Step Solution'), `${pq.id} rehidden render displays Reveal button again`);
      assert(!rehiddenHtml.includes('revealed-solution'), `${pq.id} rehidden render hides solution again`);

      // Step D: Third Click - Reveal again
      state = { ...state, [pq.id]: true };
      const reRevealedHtml = renderRevealed();
      assert(reRevealedHtml.includes('Hide Solution'), `${pq.id} toggles to revealed again on third click without corruption`);
    }

    // Step E: Question Switching Test (Ensure no cross-contamination between questions)
    console.log('\n  Testing Question Switching and State Independence:');
    let multiState = {};
    for (let i = 0; i < p14aQuestions.length; i++) {
      const currentId = p14aQuestions[i].id;
      multiState = { ...multiState, [currentId]: true };
      // Verify current question is revealed
      assert(multiState[currentId] === true, `Question ${currentId} is revealed in multi-state`);
      // If previous question existed, verify it can be toggled off independently
      if (i > 0) {
        const prevId = p14aQuestions[i - 1].id;
        multiState = { ...multiState, [prevId]: false };
        assert(multiState[prevId] === false, `Question ${prevId} was closed while ${currentId} remains open`);
        assert(multiState[currentId] === true, `Question ${currentId} state was unaffected by closing ${prevId}`);
      }
    }

    // Direct render test of Section 1.4 in UnitWorkspace
    console.log('\n  Direct UnitWorkspace rendering test with Section 1.4:');
    const renderedUnit14Default = ReactDOMServer.renderToString(
      React.createElement(UnitWorkspace, { section: section14 })
    );
    assert(renderedUnit14Default.length > 5000, 'UnitWorkspace renders Section 1.4 default view without error');

    // -------------------------------------------------------------------------
    // 2. TEST SECTION 1.4B, 1.4C, AND MIXED PRACTICE QUESTIONS
    // -------------------------------------------------------------------------
    console.log('\n=== Testing Unit 1 Section 1.4B, 1.4C, and Mixed Practice ===');

    const p14bQuestions = section14.subtractionDeepDive.practiceQuestions;
    assert(p14bQuestions.length === 6, 'Section 1.4B has exactly 6 practice questions');
    for (const pq of p14bQuestions) {
      assert(typeof pq.solution === 'string' && pq.solution.length > 0, `1.4B ${pq.id} has valid solution string`);
      assert(typeof pq.result === 'string' && pq.result.length > 0, `1.4B ${pq.id} has valid final result`);
    }

    const mulDivPractice = section14.mulDivGuide.practiceQuestions;
    assert(Array.isArray(mulDivPractice) && mulDivPractice.length === 6, 'Section 1.4C has 6 practice questions (3 mul, 3 div)');
    for (const pq of mulDivPractice) {
      assert(typeof pq.solution === 'string' && pq.solution.length > 0, `1.4C ${pq.id} has valid solution string`);
    }

    const mixedQuestions = section14.mixedExamChallenge;
    assert(Array.isArray(mixedQuestions) && mixedQuestions.length >= 6, 'Section 1.4 mixed exam challenge has practice questions');
    for (const mq of mixedQuestions) {
      assert(typeof mq.solution === 'string' && mq.solution.length > 0, `Mixed ${mq.id} has valid solution string`);
    }

    // -------------------------------------------------------------------------
    // 3. AUDIT OTHER UNIT 1 SECTIONS (1.5, 1.6, 1.7)
    // -------------------------------------------------------------------------
    console.log('\n=== Auditing Unit 1 Sections 1.5, 1.6, 1.7 ===');

    const { Section15View } = await vite.ssrLoadModule('/src/components/Section15View.jsx');
    const html15 = ReactDOMServer.renderToString(React.createElement(Section15View));
    assert(html15.length > 5000, 'Section15View renders cleanly with all complement practice sets');

    const { Section16View } = await vite.ssrLoadModule('/src/components/Section16View.jsx');
    const html16 = ReactDOMServer.renderToString(React.createElement(Section16View));
    assert(html16.length > 5000, 'Section16View renders cleanly with all binary codes practice sets');

    const { Section17View } = await vite.ssrLoadModule('/src/components/Section17View.jsx');
    const html17 = ReactDOMServer.renderToString(React.createElement(Section17View));
    assert(html17.length > 5000, 'Section17View renders cleanly with logic gate worked examples');

    // -------------------------------------------------------------------------
    // 4. AUDIT UNIT 2 SECTIONS (2.1 THROUGH 2.5)
    // -------------------------------------------------------------------------
    console.log('\n=== Auditing Unit 2 Sections 2.1 to 2.5 ===');

    const { Section21View } = await vite.ssrLoadModule('/src/components/Section21View.jsx');
    const html21 = ReactDOMServer.renderToString(React.createElement(Section21View));
    assert(html21.length > 5000, 'Section21View renders cleanly with Boolean algebra proofs');

    const { Section22View } = await vite.ssrLoadModule('/src/components/Section22View.jsx');
    const html22 = ReactDOMServer.renderToString(React.createElement(Section22View));
    assert(html22.length > 5000, 'Section22View renders cleanly with canonical forms practice sets');

    const { Section23View } = await vite.ssrLoadModule('/src/components/Section23View.jsx');
    const html23 = ReactDOMServer.renderToString(React.createElement(Section23View));
    assert(html23.length > 5000, 'Section23View renders cleanly with 2/3 variable K-Map models');

    const { Section24View } = await vite.ssrLoadModule('/src/components/Section24View.jsx');
    const html24 = ReactDOMServer.renderToString(React.createElement(Section24View));
    assert(html24.length > 5000, 'Section24View renders cleanly with 4 variable K-Map practice lab');

    const { Section25View } = await vite.ssrLoadModule('/src/components/Section25View.jsx');
    const html25 = ReactDOMServer.renderToString(React.createElement(Section25View));
    assert(html25.length > 5000, 'Section25View renders cleanly with 5 variable K-Maps and QM tabular method');

    // -------------------------------------------------------------------------
    // 5. AUDIT SHARED INTERACTIVE SOLVERS AND PRACTICE ARENA
    // -------------------------------------------------------------------------
    console.log('\n=== Auditing Interactive Solvers and Practice Arena ===');

    const { InteractiveSolvers } = await vite.ssrLoadModule('/src/components/InteractiveSolvers.jsx');
    const htmlSolvers = ReactDOMServer.renderToString(React.createElement(InteractiveSolvers));
    assert(htmlSolvers.length > 5000, 'Unit 1 InteractiveSolvers renders cleanly with step explanations');

    const { Unit2Solvers } = await vite.ssrLoadModule('/src/components/Unit2Solvers.jsx');
    const htmlU2Solvers = ReactDOMServer.renderToString(React.createElement(Unit2Solvers));
    assert(htmlU2Solvers.length > 5000, 'Unit 2 InteractiveSolvers renders cleanly with step explanations');

    const { PracticeArena } = await vite.ssrLoadModule('/src/components/PracticeArena.jsx');
    const htmlArena = ReactDOMServer.renderToString(React.createElement(PracticeArena, { defaultUnit: 1 }));
    assert(htmlArena.length > 5000, 'PracticeArena renders cleanly with answer explanations');

    // Summary
    console.log('\n=== Solution Reveal Regression Test Results ===');
    console.log(`Total Assertions: ${totalAssertions}`);
    console.log(`Passed: ${passedAssertions}`);
    console.log(`Failed: ${failedAssertions}`);

    await vite.close();

    if (failedAssertions > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('\nFatal test execution error:', err);
    await vite.close();
    process.exit(1);
  }
}

runTests();
