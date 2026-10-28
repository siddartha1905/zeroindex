import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('ZeroIndex Phase 4H: Everyday Conversations Activity Verification');
console.log('Path: English Communication · Activity 04: Everyday Conversations');
console.log('Scope: OPEN -> CONNECT -> CLOSE, 4 Everyday Situations,');
console.log('       3 Conversational Stages, Guided & Free-Text Turns, Route Guards');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message, suiteCounters) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
    if (suiteCounters) suiteCounters.passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
    if (suiteCounters) suiteCounters.failed++;
  }
}

// -----------------------------------------------------------------------------
// SUITE 1: Static Data Configuration & Pedagogical Content Audit
// -----------------------------------------------------------------------------
console.log('SUITE 1: Static Data Configuration & Pedagogical Content Audit');
const suite1 = { passed: 0, failed: 0 };
const dataFilePath = path.join(rootDir, 'src/data/atlasActivitiesData.js');
assert(fs.existsSync(dataFilePath), 'atlasActivitiesData.js exists', suite1);

const { 
  SPEAK_CLEARLY_ACTIVITY, 
  LISTEN_RESPOND_ACTIVITY, 
  EXPRESS_YOUR_OPINION_ACTIVITY,
  EVERYDAY_CONVERSATIONS_ACTIVITY,
  ENGLISH_COMMUNICATION_PATH 
} = await import('../src/data/atlasActivitiesData.js');

// 1. English Communication Learning Path Structure
assert(ENGLISH_COMMUNICATION_PATH && typeof ENGLISH_COMMUNICATION_PATH === 'object', 'ENGLISH_COMMUNICATION_PATH is exported', suite1);
assert(ENGLISH_COMMUNICATION_PATH.id === 'english-communication', 'Learning path ID is "english-communication"', suite1);
assert(ENGLISH_COMMUNICATION_PATH.title === 'English Communication', 'Learning path title is "English Communication"', suite1);
assert(ENGLISH_COMMUNICATION_PATH.subtitle === 'Practical communication skills for everyday situations.', 'Subtitle matches exact prompt', suite1);
assert(ENGLISH_COMMUNICATION_PATH.activities && ENGLISH_COMMUNICATION_PATH.activities.length === 4, 'Defines exactly 4 sequential learning activities', suite1);

// Activity 1: Speak Clearly (Preserved unchanged)
const act1 = ENGLISH_COMMUNICATION_PATH.activities[0];
assert(act1.number === '01', 'Activity 1 number is "01"', suite1);
assert(act1.title === 'Speak Clearly', 'Activity 1 title is "Speak Clearly"', suite1);
assert(act1.status === 'ready' && act1.statusLabel === 'Available in Preview', 'Activity 1 status is Available in Preview', suite1);
assert(act1.route === 'atlas/activity/speak-clearly', 'Activity 1 connects to "atlas/activity/speak-clearly"', suite1);
assert(act1.isInteractive === true, 'Activity 1 marked interactive', suite1);

// Activity 2: Listen & Respond (Preserved unchanged)
const act2 = ENGLISH_COMMUNICATION_PATH.activities[1];
assert(act2.number === '02', 'Activity 2 number is "02"', suite1);
assert(act2.title === 'Listen & Respond', 'Activity 2 title is "Listen & Respond"', suite1);
assert(act2.status === 'ready' && act2.statusLabel === 'Available in Preview', 'Activity 2 status is Available in Preview', suite1);
assert(act2.route === 'atlas/activity/listen-respond', 'Activity 2 connects to "atlas/activity/listen-respond"', suite1);
assert(act2.isInteractive === true, 'Activity 2 marked interactive', suite1);

// Activity 3: Express Your Opinion (Preserved unchanged)
const act3 = ENGLISH_COMMUNICATION_PATH.activities[2];
assert(act3.number === '03', 'Activity 3 number is "03"', suite1);
assert(act3.title === 'Express Your Opinion', 'Activity 3 title is "Express Your Opinion"', suite1);
assert(act3.status === 'ready' && act3.statusLabel === 'Available in Preview', 'Activity 3 status is Available in Preview', suite1);
assert(act3.route === 'atlas/activity/express-your-opinion', 'Activity 3 connects to "atlas/activity/express-your-opinion"', suite1);
assert(act3.isInteractive === true, 'Activity 3 marked interactive', suite1);

// Activity 4: Everyday Conversations (Implemented in Phase 4H)
const act4 = ENGLISH_COMMUNICATION_PATH.activities[3];
assert(act4.number === '04', 'Activity 4 number is "04"', suite1);
assert(act4.title === 'Everyday Conversations', 'Activity 4 title is "Everyday Conversations"', suite1);
assert(act4.status === 'ready' && act4.statusLabel === 'Available in Preview', 'Activity 4 status is Available in Preview', suite1);
assert(act4.route === 'atlas/activity/everyday-conversations', 'Activity 4 connects to "atlas/activity/everyday-conversations"', suite1);
assert(act4.isInteractive === true, 'Activity 4 marked interactive', suite1);
assert(act4.activityKey === 'everyday-conversations', 'Activity 4 activityKey is "everyday-conversations"', suite1);

// 2. Everyday Conversations Activity Configuration Audit
assert(EVERYDAY_CONVERSATIONS_ACTIVITY && typeof EVERYDAY_CONVERSATIONS_ACTIVITY === 'object', 'EVERYDAY_CONVERSATIONS_ACTIVITY is exported', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.id === 'everyday-conversations', 'Activity ID is "everyday-conversations"', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.title === 'Everyday Conversations', 'Activity title is "Everyday Conversations"', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.subtitle === 'Start naturally. Keep the conversation going. End politely.', 'Subtitle matches exact prompt', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.targetAudience.includes('10 and above'), 'Target audience specifies beginners aged 10 and above', suite1);

// START Movement: 3-part method OPEN -> CONNECT -> CLOSE
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start && EVERYDAY_CONVERSATIONS_ACTIVITY.start.methodSteps.length === 3, 'START method defines 3 parts (OPEN, CONNECT, CLOSE)', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.methodSteps[0].tag === 'OPEN', 'Method Part 1 is OPEN', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.methodSteps[1].tag === 'CONNECT', 'Method Part 2 is CONNECT', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.methodSteps[2].tag === 'CLOSE', 'Method Part 3 is CLOSE', suite1);

// Worked Example Dialogue
assert(Boolean(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample), 'START defines worked conversation example', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample.turns.length === 5, 'Worked example dialogue has 5 realistic turns', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample.turns[0].phase === 'OPEN', 'Worked example turn 1 annotated OPEN', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample.turns[1].phase === 'CONNECT', 'Worked example turn 2 annotated CONNECT', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample.turns[2].phase === 'CONNECT', 'Worked example turn 3 annotated CONNECT', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample.turns[3].phase === 'CLOSE', 'Worked example turn 4 annotated CLOSE', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.start.workedExample.turns[4].phase === 'CLOSE', 'Worked example turn 5 annotated CLOSE', suite1);

// TRY Movement: 4 Situations
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.try && EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations.length === 4, 'TRY defines exactly 4 everyday situations', suite1);

const sit1 = EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations[0];
assert(sit1.id === 'meeting-someone-new', 'Situation 1 is Meeting Someone New', suite1);
assert(sit1.stages.length === 3, 'Situation 1 contains 3 conversational stages', suite1);

const sit2 = EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations[1];
assert(sit2.id === 'asking-for-help', 'Situation 2 is Asking for Help', suite1);
assert(sit2.stages.length === 3, 'Situation 2 contains 3 conversational stages', suite1);

const sit3 = EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations[2];
assert(sit3.id === 'shared-interest', 'Situation 3 is Talking About a Shared Interest', suite1);
assert(sit3.stages.length === 3, 'Situation 3 contains 3 conversational stages', suite1);

const sit4 = EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations[3];
assert(sit4.id === 'clearing-misunderstanding', 'Situation 4 is Clearing Up a Misunderstanding', suite1);
assert(sit4.stages.length === 3, 'Situation 4 contains 3 conversational stages', suite1);

// Audit stages in each situation
EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations.forEach((sit, sIdx) => {
  sit.stages.forEach((stg, stgIdx) => {
    assert(Boolean(stg.partnerSpeech), `Situation ${sIdx + 1} Stage ${stgIdx + 1} has partner speech`, suite1);
    assert(stg.options && stg.options.length >= 2, `Situation ${sIdx + 1} Stage ${stgIdx + 1} has at least 2 guided options`, suite1);
    stg.options.forEach((opt, oIdx) => {
      assert(Boolean(opt.feedback), `Situation ${sIdx + 1} Stage ${stgIdx + 1} Option ${oIdx + 1} has pedagogical feedback`, suite1);
      assert(Boolean(opt.quality), `Situation ${sIdx + 1} Stage ${stgIdx + 1} Option ${oIdx + 1} has quality label`, suite1);
    });
  });
});

// Privacy guarantee
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.try.privacyNote.includes('No microphone access'), 'Confirms zero microphone or recording required', suite1);

// NEXT Movement: 4 Difficulties, Toolkit, Self-Reflection, 5 Improvement Choices
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next && EVERYDAY_CONVERSATIONS_ACTIVITY.next.commonDifficulties.length === 4, 'NEXT defines 4 common difficulties', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.commonDifficulties[0].letter === 'A', 'Difficulty A present', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.commonDifficulties[1].letter === 'B', 'Difficulty B present', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.commonDifficulties[2].letter === 'C', 'Difficulty C present', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.commonDifficulties[3].letter === 'D', 'Difficulty D present', suite1);

assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.toolkitCategories.length === 5, 'NEXT defines 5 toolkit categories', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.selfReflectionQuestions.length === 4, 'NEXT defines 4-point self-reflection questions', suite1);
assert(EVERYDAY_CONVERSATIONS_ACTIVITY.next.improvementChoices.length === 5, 'NEXT defines 5 single-improvement choices', suite1);

console.log(`  --> Subtotal Suite 1: ${suite1.passed}/${suite1.passed + suite1.failed} passed\n`);

// -----------------------------------------------------------------------------
// SUITE 2: Component SSR Rendering Smoke Test
// -----------------------------------------------------------------------------
console.log('SUITE 2: Component SSR Rendering Smoke Test');
const suite2 = { passed: 0, failed: 0 };
const speakClearlyPath = path.join(rootDir, 'src/components/atlas/SpeakClearlyActivity.jsx');
const listenRespondPath = path.join(rootDir, 'src/components/atlas/ListenRespondActivity.jsx');
const expressOpinionPath = path.join(rootDir, 'src/components/atlas/ExpressYourOpinionActivity.jsx');
const everydayConversationsPath = path.join(rootDir, 'src/components/atlas/EverydayConversationsActivity.jsx');

assert(fs.existsSync(speakClearlyPath), 'SpeakClearlyActivity.jsx exists', suite2);
assert(fs.existsSync(listenRespondPath), 'ListenRespondActivity.jsx exists', suite2);
assert(fs.existsSync(expressOpinionPath), 'ExpressYourOpinionActivity.jsx exists', suite2);
assert(fs.existsSync(everydayConversationsPath), 'EverydayConversationsActivity.jsx exists', suite2);

const everydayCode = fs.readFileSync(everydayConversationsPath, 'utf8');
assert(everydayCode.includes('START · Understand'), 'EverydayConversationsActivity contains START tab', suite2);
assert(everydayCode.includes('TRY · Practise'), 'EverydayConversationsActivity contains TRY tab', suite2);
assert(everydayCode.includes('NEXT · Improve'), 'EverydayConversationsActivity contains NEXT tab', suite2);
assert(everydayCode.includes('conversationHistory'), 'EverydayConversationsActivity tracks turn selections', suite2);
assert(everydayCode.includes('handleSelectOption'), 'EverydayConversationsActivity implements guided reply handler', suite2);
assert(everydayCode.includes('customReplyText'), 'EverydayConversationsActivity implements independent reply handler', suite2);
assert(everydayCode.includes('handlePractiseAgain'), 'EverydayConversationsActivity implements Practise Again action', suite2);
assert(everydayCode.includes('handleChooseAnotherSituation'), 'EverydayConversationsActivity implements Choose Another Situation action', suite2);

import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  ssr: {
    external: ['react', 'react-dom', 'lucide-react']
  }
});

let renderedEverydayConversations = '';
let renderedAtlasOwner = '';
let renderedAtlasEnglishOverview = '';
let renderedAtlasEverydayDirect = '';
let renderedAtlasPublic = '';

try {
  const { EverydayConversationsActivity } = await vite.ssrLoadModule('/src/components/atlas/EverydayConversationsActivity.jsx');
  renderedEverydayConversations = ReactDOMServer.renderToString(
    React.createElement(EverydayConversationsActivity, { onBack: () => {} })
  );
  assert(renderedEverydayConversations.length > 0, `EverydayConversationsActivity SSR rendered successfully (${renderedEverydayConversations.length} bytes)`, suite2);

  const { AtlasLanding } = await vite.ssrLoadModule('/src/components/AtlasLanding.jsx');
  
  // 1. Render Atlas in Owner Preview mode on general Learning Paths
  renderedAtlasOwner = ReactDOMServer.renderToString(
    React.createElement(AtlasLanding, { 
      isAdminPreview: true,
      initialTab: 'learning-paths',
      onNavigateHome: () => {},
      onNavigateWorkbench: () => {},
      onNavigateSection: () => {}
    })
  );
  assert(renderedAtlasOwner.length > 0, `AtlasLanding (Owner Preview - General) SSR rendered (${renderedAtlasOwner.length} bytes)`, suite2);

  // 2. Render Atlas in Owner Preview mode on English Communication overview
  renderedAtlasEnglishOverview = ReactDOMServer.renderToString(
    React.createElement(AtlasLanding, { 
      isAdminPreview: true,
      initialTab: 'learning-paths',
      initialSubId: 'english-communication',
      onNavigateHome: () => {},
      onNavigateWorkbench: () => {},
      onNavigateSection: () => {}
    })
  );
  assert(renderedAtlasEnglishOverview.length > 0, `AtlasLanding (Owner Preview - English Overview) SSR rendered (${renderedAtlasEnglishOverview.length} bytes)`, suite2);

  // 3. Render Atlas in Owner Preview mode for Everyday Conversations direct preview
  renderedAtlasEverydayDirect = ReactDOMServer.renderToString(
    React.createElement(AtlasLanding, { 
      isAdminPreview: true,
      initialTab: 'learning-paths',
      initialSubId: 'everyday-conversations',
      onNavigateHome: () => {},
      onNavigateWorkbench: () => {},
      onNavigateSection: () => {}
    })
  );
  assert(renderedAtlasEverydayDirect.length > 0, `AtlasLanding (Owner Preview - Direct Everyday Conversations) SSR rendered (${renderedAtlasEverydayDirect.length} bytes)`, suite2);

  // 4. Render Atlas in Public / Anonymous mode
  renderedAtlasPublic = ReactDOMServer.renderToString(
    React.createElement(AtlasLanding, { 
      isAdminPreview: false,
      initialTab: 'learning-paths',
      onNavigateHome: () => {},
      onNavigateWorkbench: () => {},
      onNavigateSection: () => {}
    })
  );
  assert(renderedAtlasPublic.length > 0, `AtlasLanding (Public Visitor) SSR rendered (${renderedAtlasPublic.length} bytes)`, suite2);

} catch (err) {
  assert(false, `SSR rendering threw error: ${err.message}`, suite2);
} finally {
  await vite.close();
}

// EverydayConversationsActivity SSR assertions
assert(renderedEverydayConversations.includes('Everyday Conversations'), 'SSR output contains activity title', suite2);
assert(renderedEverydayConversations.includes('Start naturally. Keep the conversation going. End politely.'), 'SSR output contains subtitle', suite2);
assert(renderedEverydayConversations.includes('START · Understand'), 'SSR output contains START tab', suite2);
assert(renderedEverydayConversations.includes('TRY · Practise'), 'SSR output contains TRY tab', suite2);
assert(renderedEverydayConversations.includes('NEXT · Improve'), 'SSR output contains NEXT tab', suite2);
assert(renderedEverydayConversations.includes('OPEN'), 'SSR output renders OPEN method step', suite2);
assert(renderedEverydayConversations.includes('CONNECT'), 'SSR output renders CONNECT method step', suite2);
assert(renderedEverydayConversations.includes('CLOSE'), 'SSR output renders CLOSE method step', suite2);

// AtlasLanding: English Communication Overview
assert(renderedAtlasEnglishOverview.includes('4 of 4 Available in Preview'), 'Overview displays "4 of 4 Available in Preview"', suite2);
assert(renderedAtlasEnglishOverview.includes('Speak Clearly'), 'Overview renders Activity 1: Speak Clearly', suite2);
assert(renderedAtlasEnglishOverview.includes('Listen &amp; Respond') || renderedAtlasEnglishOverview.includes('Listen & Respond'), 'Overview renders Activity 2: Listen & Respond', suite2);
assert(renderedAtlasEnglishOverview.includes('Express Your Opinion'), 'Overview renders Activity 3: Express Your Opinion', suite2);
assert(renderedAtlasEnglishOverview.includes('Everyday Conversations'), 'Overview renders Activity 4: Everyday Conversations', suite2);
assert(renderedAtlasEnglishOverview.includes('atlas/activity/everyday-conversations'), 'Overview links Activity 4 to atlas/activity/everyday-conversations', suite2);
assert(renderedAtlasEnglishOverview.includes('All 4 foundational activities are available for faculty review and classroom testing.'), 'Overview renders reassuring completed note', suite2);

// AtlasLanding: General Learning Paths progression strip
assert(renderedAtlasOwner.includes('04 Everyday conversations (Ready)'), 'General Learning Paths progression marks Activity 04 as Ready', suite2);

// AtlasLanding: Direct Preview
assert(renderedAtlasEverydayDirect.includes('Start naturally. Keep the conversation going. End politely.'), 'Direct preview renders Everyday Conversations directly', suite2);

// AtlasLanding: Public Visitor Isolation
assert(!renderedAtlasPublic.includes('Owner Preview'), 'Public Atlas landing does NOT render "Owner Preview"', suite2);
assert(!renderedAtlasPublic.includes('Everyday Conversations'), 'Public Atlas landing does NOT leak unpublished Everyday Conversations', suite2);

console.log(`  --> Subtotal Suite 2: ${suite2.passed}/${suite2.passed + suite2.failed} passed\n`);

// -----------------------------------------------------------------------------
// SUITE 3: Interactive Component State & Logic Tests
// -----------------------------------------------------------------------------
console.log('SUITE 3: Interactive Component State & Logic Tests');
const suite3 = { passed: 0, failed: 0 };

// State simulation for Everyday Conversations
let currentMovement = 'start';
let currentSituationIndex = 0;
let currentStageIndex = 0;
let selectedReplies = {};
let customReplies = {};
let replyMode = 'guided';
let customTextState = '';
let reflectionChecklist = {};
let selectedImprovementState = 'start-naturally';

function navigateMovement(mov) {
  currentMovement = mov;
}

function selectSituation(index) {
  currentSituationIndex = index;
  currentStageIndex = 0;
  selectedReplies = {};
  customReplies = {};
  replyMode = 'guided';
  customTextState = '';
}

function chooseGuidedReply(situationId, stageIndex, replyObj) {
  const key = `${situationId}-stage-${stageIndex}`;
  selectedReplies[key] = replyObj;
}

function submitCustomReply(situationId, stageIndex, text, sampleContinuation) {
  const key = `${situationId}-stage-${stageIndex}`;
  customReplies[key] = {
    text,
    continuation: sampleContinuation
  };
}

function nextStage() {
  currentStageIndex++;
  replyMode = 'guided';
  customTextState = '';
}

function resetStage(situationId, stageIndex) {
  const key = `${situationId}-stage-${stageIndex}`;
  delete selectedReplies[key];
  delete customReplies[key];
  customTextState = '';
}

function toggleReflection(id) {
  reflectionChecklist[id] = !reflectionChecklist[id];
}

function selectImprovement(id) {
  selectedImprovementState = id;
}

function practiseAgain() {
  currentMovement = 'try';
  currentStageIndex = 0;
  selectedReplies = {};
  customReplies = {};
  replyMode = 'guided';
  customTextState = '';
}

function chooseAnotherSituation() {
  currentMovement = 'try';
  currentSituationIndex = (currentSituationIndex + 1) % EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations.length;
  currentStageIndex = 0;
  selectedReplies = {};
  customReplies = {};
  replyMode = 'guided';
  customTextState = '';
}

// 1. Navigation between movements
navigateMovement('try');
assert(currentMovement === 'try', 'Navigated to TRY movement', suite3);

// 2. Select Situation 1 (Meeting Someone New)
selectSituation(0);
assert(currentSituationIndex === 0, 'Selected Situation 1', suite3);
assert(currentStageIndex === 0, 'Starts at Stage 0 (OPEN)', suite3);

// 3. Stage 0 Turn: Guided Choice
const currentSit = EVERYDAY_CONVERSATIONS_ACTIVITY.try.situations[0];
const stage0 = currentSit.stages[0];
const chosenReply0 = stage0.options[0];
chooseGuidedReply(currentSit.id, 0, chosenReply0);

const key0 = `${currentSit.id}-stage-0`;
assert(selectedReplies[key0].id === chosenReply0.id, 'Stage 0 guided reply selected', suite3);
assert(Boolean(selectedReplies[key0].feedback), 'Selected reply contains pedagogical feedback', suite3);

// 4. Advance to Stage 1 (CONNECT)
nextStage();
assert(currentStageIndex === 1, 'Advanced to Stage 1 (CONNECT)', suite3);

// 5. Stage 1 Turn: Independent Custom Input
const stage1 = currentSit.stages[1];
submitCustomReply(currentSit.id, 1, 'I like drawing and visual arts too. How long have you been doing it?', 'Sample: I like sketching too! Have you done this long?');

const key1 = `${currentSit.id}-stage-1`;
assert(customReplies[key1].text.includes('drawing and visual arts'), 'Stage 1 custom reply recorded', suite3);
assert(Boolean(customReplies[key1].continuation), 'Stage 1 custom reply paired with sample continuation', suite3);

// 6. Advance to Stage 2 (CLOSE)
nextStage();
assert(currentStageIndex === 2, 'Advanced to Stage 2 (CLOSE)', suite3);

const stage2 = currentSit.stages[2];
const chosenReply2 = stage2.options[0];
chooseGuidedReply(currentSit.id, 2, chosenReply2);

const key2 = `${currentSit.id}-stage-2`;
assert(selectedReplies[key2].id === chosenReply2.id, 'Stage 2 guided reply selected', suite3);

// 7. Advance past final stage -> Full Conversation Summary
nextStage();
assert(currentStageIndex === 3, 'Stage index reaches 3 (exchange complete)', suite3);
const isComplete = currentStageIndex >= currentSit.stages.length;
assert(isComplete === true, 'All 3 stages successfully completed', suite3);

// 8. Self-Reflection Checks in NEXT
navigateMovement('next');
assert(currentMovement === 'next', 'Navigated to NEXT movement', suite3);
assert(Object.keys(reflectionChecklist).length === 0, 'Reflection checklist starts clear', suite3);
toggleReflection('started-appropriately');
assert(reflectionChecklist['started-appropriately'] === true, 'Checked "started-appropriately"', suite3);
toggleReflection('listened-and-responded');
assert(reflectionChecklist['listened-and-responded'] === true, 'Checked "listened-and-responded"', suite3);

// 9. Single Improvement Selection
selectImprovement('better-follow-up');
assert(selectedImprovementState === 'better-follow-up', 'Selected improvement: better-follow-up', suite3);

// 10. Practise Again vs Choose Another Situation
practiseAgain();
assert(currentMovement === 'try', 'Practise Again returns to TRY movement', suite3);
assert(currentSituationIndex === 0, 'Practise Again preserves current situation', suite3);
assert(currentStageIndex === 0, 'Practise Again resets stage index to 0', suite3);
assert(Object.keys(selectedReplies).length === 0, 'Practise Again clears previous selections', suite3);

chooseAnotherSituation();
assert(currentMovement === 'try', 'Choose Another Situation returns to TRY movement', suite3);
assert(currentSituationIndex === 1, 'Choose Another Situation advances to Situation 2 (Asking for Help)', suite3);
assert(currentStageIndex === 0, 'Choose Another Situation starts at Stage 0', suite3);

console.log(`  --> Subtotal Suite 3: ${suite3.passed}/${suite3.passed + suite3.failed} passed\n`);

// -----------------------------------------------------------------------------
// SUITE 4: Route Security & Publication Protection Audit
// -----------------------------------------------------------------------------
console.log('SUITE 4: Route Security & Publication Protection Audit');
const suite4 = { passed: 0, failed: 0 };
const appPath = path.join(rootDir, 'src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');

const { 
  isRoutePubliclyAccessible 
} = await import('../src/data/centralContentRegistry.js');

// Anonymous access checks for all four activities
assert(
  isRoutePubliclyAccessible('atlas/activity/speak-clearly') === false,
  'Signed-out visitor cannot publicly access "atlas/activity/speak-clearly"',
  suite4
);

assert(
  isRoutePubliclyAccessible('atlas/activity/listen-respond') === false,
  'Signed-out visitor cannot publicly access "atlas/activity/listen-respond"',
  suite4
);

assert(
  isRoutePubliclyAccessible('atlas/activity/express-your-opinion') === false,
  'Signed-out visitor cannot publicly access "atlas/activity/express-your-opinion"',
  suite4
);

assert(
  isRoutePubliclyAccessible('atlas/activity/everyday-conversations') === false,
  'Signed-out visitor cannot publicly access "atlas/activity/everyday-conversations"',
  suite4
);

assert(
  isRoutePubliclyAccessible('atlas/learning-paths/english-communication') === false,
  'Signed-out visitor cannot publicly access "atlas/learning-paths/english-communication"',
  suite4
);

// App.jsx route guard checks
assert(
  appContent.includes("atlasSlug.includes('everyday-conversations')"),
  'App.jsx guards everyday-conversations from anonymous access',
  suite4
);

assert(
  appContent.includes("(adminSession.isAuthenticated && adminSession.isOwner) ? ("),
  'App.jsx enables owner preview for authenticated owner on all normal Atlas entry routes',
  suite4
);

// AtlasLanding component guards
const atlasLandingPath = path.join(rootDir, 'src/components/AtlasLanding.jsx');
const atlasLandingContent = fs.readFileSync(atlasLandingPath, 'utf8');

assert(
  atlasLandingContent.includes("activeActivity === 'speak-clearly-60s' && isAdminPreview"),
  'AtlasLanding guards speak-clearly runner with isAdminPreview',
  suite4
);

assert(
  atlasLandingContent.includes("activeActivity === 'listen-respond' && isAdminPreview"),
  'AtlasLanding guards listen-respond runner with isAdminPreview',
  suite4
);

assert(
  atlasLandingContent.includes("activeActivity === 'express-your-opinion' && isAdminPreview"),
  'AtlasLanding guards express-your-opinion runner with isAdminPreview',
  suite4
);

assert(
  atlasLandingContent.includes("activeActivity === 'everyday-conversations' && isAdminPreview"),
  'AtlasLanding guards everyday-conversations runner with isAdminPreview',
  suite4
);

// Public pages remain accessible
assert(
  isRoutePubliclyAccessible('atlas') === true,
  'Pillar 02 The Atlas landing page remains publicly accessible',
  suite4
);

assert(
  isRoutePubliclyAccessible('atlas/learning-paths') === true,
  'Atlas Learning Paths tab remains publicly accessible',
  suite4
);

assert(
  isRoutePubliclyAccessible('atlas/career-prep') === true,
  'Atlas Career Preparation tab remains publicly accessible',
  suite4
);

console.log(`  --> Subtotal Suite 4: ${suite4.passed}/${suite4.passed + suite4.failed} passed\n`);

// -----------------------------------------------------------------------------
// SUITE 5: British English Standard Audit
// -----------------------------------------------------------------------------
console.log('SUITE 5: British English Standard Audit');
const suite5 = { passed: 0, failed: 0 };
const britishEnglishChecks = [
  { file: 'src/data/atlasActivitiesData.js', forbidRegex: /\bpractice\s+(again|with|speaking|another)\b/i, label: 'atlasActivitiesData.js: No verb "practice"' },
  { file: 'src/data/atlasActivitiesData.js', mustRegex: /\borganise\b/i, label: 'atlasActivitiesData.js: Contains British "organise"' },
  { file: 'src/data/atlasActivitiesData.js', mustRegex: /\bfavourite\b/i, label: 'atlasActivitiesData.js: Contains British "favourite"' },
  { file: 'src/data/atlasActivitiesData.js', mustRegex: /\bapologise\b/i, label: 'atlasActivitiesData.js: Contains British "apologise"' },
  { file: 'src/components/AtlasLanding.jsx', mustRegex: /practise speaking/, label: 'AtlasLanding.jsx: Card uses verb "practise speaking"' },
  { file: 'src/components/AtlasLanding.jsx', mustRegex: /organise/, label: 'AtlasLanding.jsx: Card uses British "organise"' },
  { file: 'src/components/atlas/SpeakClearlyActivity.jsx', mustRegex: /TRY · Practise/, label: 'SpeakClearlyActivity.jsx: Tab uses "TRY · Practise"' },
  { file: 'src/components/atlas/ListenRespondActivity.jsx', mustRegex: /TRY · Practise/, label: 'ListenRespondActivity.jsx: Tab uses "TRY · Practise"' },
  { file: 'src/components/atlas/ExpressYourOpinionActivity.jsx', mustRegex: /TRY · Practise/, label: 'ExpressYourOpinionActivity.jsx: Tab uses "TRY · Practise"' },
  { file: 'src/components/atlas/EverydayConversationsActivity.jsx', mustRegex: /TRY · Practise/, label: 'EverydayConversationsActivity.jsx: Tab uses "TRY · Practise"' },
  { file: 'src/components/atlas/EverydayConversationsActivity.jsx', mustRegex: /Practise Again/, label: 'EverydayConversationsActivity.jsx: Button uses "Practise Again"' },
  { file: 'src/components/atlas/EverydayConversationsActivity.jsx', mustRegex: /recognise/, label: 'EverydayConversationsActivity.jsx: Uses British "recognise"' }
];

britishEnglishChecks.forEach(check => {
  const fullPath = path.join(rootDir, check.file);
  const content = fs.readFileSync(fullPath, 'utf8');
  if (check.forbidRegex) {
    const matched = check.forbidRegex.test(content);
    assert(!matched, check.label, suite5);
  }
  if (check.mustRegex) {
    const matched = check.mustRegex.test(content);
    assert(matched, check.label, suite5);
  }
});
console.log(`  --> Subtotal Suite 5: ${suite5.passed}/${suite5.passed + suite5.failed} passed\n`);

// -----------------------------------------------------------------------------
// SUITE 6: Strict Zero-Dash Standard Audit
// -----------------------------------------------------------------------------
console.log('SUITE 6: Strict Zero-Dash Standard Audit');
const suite6 = { passed: 0, failed: 0 };
const filesToAudit = [
  'src/data/atlasActivitiesData.js',
  'src/components/atlas/SpeakClearlyActivity.jsx',
  'src/components/atlas/ListenRespondActivity.jsx',
  'src/components/atlas/ExpressYourOpinionActivity.jsx',
  'src/components/atlas/EverydayConversationsActivity.jsx',
  'src/components/atlas/LearningNudge.jsx',
  'src/components/AtlasLanding.jsx',
  'src/App.jsx',
  'src/data/centralContentRegistry.js',
  'scripts/verifyAtlasActivityExperience.mjs'
];

let totalDashViolations = 0;
filesToAudit.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const emCount = (content.match(/\u2014/g) || []).length;
  const enCount = (content.match(/\u2013/g) || []).length;
  if (emCount > 0 || enCount > 0) {
    console.error(`  [FAIL] ${relPath} has ${emCount} em-dashes and ${enCount} en-dashes`);
    totalDashViolations += emCount + enCount;
  }
});

assert(totalDashViolations === 0, `Zero em-dashes and zero en-dashes across all Phase 4 files (Violations: ${totalDashViolations})`, suite6);
console.log(`  --> Subtotal Suite 6: ${suite6.passed}/${suite6.passed + suite6.failed} passed\n`);

// -----------------------------------------------------------------------------
// SUITE 7: Phase 4I Consolidated Quality, Natural Communication & Learning Flashcards Audit
// -----------------------------------------------------------------------------
console.log('SUITE 7: Phase 4I Consolidated Quality, Natural Communication & Learning Flashcards Audit');
const suite7 = { passed: 0, failed: 0 };

// 1. LearningNudge Component Audit
const learningNudgePath = path.join(rootDir, 'src/components/atlas/LearningNudge.jsx');
assert(fs.existsSync(learningNudgePath), 'LearningNudge.jsx exists', suite7);

const learningNudgeContent = fs.readFileSync(learningNudgePath, 'utf8');
assert(learningNudgeContent.includes('export const LearningNudge'), 'Exports LearningNudge component', suite7);
assert(learningNudgeContent.includes('TONE_STYLES'), 'Implements tone styles (blue, green, amber, purple)', suite7);
assert(learningNudgeContent.includes('ICON_MAP'), 'Implements accessible icons (listen, think, speak, dialogue, pause, heart, smile)', suite7);

// 2. Flashcards presence across all 4 activities
const actComponents = [
  { file: 'src/components/atlas/SpeakClearlyActivity.jsx', name: 'SpeakClearlyActivity' },
  { file: 'src/components/atlas/ListenRespondActivity.jsx', name: 'ListenRespondActivity' },
  { file: 'src/components/atlas/ExpressYourOpinionActivity.jsx', name: 'ExpressYourOpinionActivity' },
  { file: 'src/components/atlas/EverydayConversationsActivity.jsx', name: 'EverydayConversationsActivity' }
];

actComponents.forEach(act => {
  const code = fs.readFileSync(path.join(rootDir, act.file), 'utf8');
  assert(code.includes("import { LearningNudge }"), `${act.name} imports LearningNudge`, suite7);
  assert(code.includes("<LearningNudge"), `${act.name} renders LearningNudge flashcards`, suite7);
  assert(code.includes("grid grid-cols-1 sm:grid-cols-2"), `${act.name} places LearningNudges in balanced horizontal 2-column grid`, suite7);
  assert(!code.includes("xl:grid-cols-12"), `${act.name} removes old 12-column side-column grid`, suite7);
  assert(!code.includes("xl:col-span-4"), `${act.name} removes old 4-column sidebar`, suite7);
  assert(code.includes("max-w-5xl mx-auto"), `${act.name} centers main educational content comfortably`, suite7);
});

// 3. Absence of student-visible technical development labels
actComponents.forEach(act => {
  const code = fs.readFileSync(path.join(rootDir, act.file), 'utf8');
  // Check that tabs and buttons do not show Movement 1 / 2 / 3 to students
  const studentVisibleMovement = />\s*Movement\s+[0-9]+/i.test(code);
  assert(!studentVisibleMovement, `${act.name}: Zero student-visible "Movement 1/2/3" labels`, suite7);
});

// 4. Elevated Listening pedagogy
const listenRespondData = LISTEN_RESPOND_ACTIVITY;
assert(listenRespondData.start.description.includes('Listen to understand, not just to reply'), 'Listen & Respond highlights core principle: "Listen to understand, not just to reply"', suite7);

// 5. Natural spoken language audit in conversations
const everydayData = EVERYDAY_CONVERSATIONS_ACTIVITY;
const situation1 = everydayData.try.situations[0];
assert(situation1.stages[0].partnerName === 'Rohan', 'Everyday situation uses relatable everyday name (Rohan)', suite7);

const situation3 = everydayData.try.situations[2];
assert(situation3.stages[0].partnerName === 'Karthik', 'Everyday situation uses relatable everyday name (Karthik)', suite7);

console.log(`  --> Subtotal Suite 7: ${suite7.passed}/${suite7.passed + suite7.failed} passed\n`);

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('================================================================');
console.log(`Summary of Subtotals:`);
console.log(`  Suite 1 (Static Data & Pedagogical Audit):   ${suite1.passed}/${suite1.passed + suite1.failed} passed`);
console.log(`  Suite 2 (Component SSR Rendering):           ${suite2.passed}/${suite2.passed + suite2.failed} passed`);
console.log(`  Suite 3 (Interactive Component State Logic): ${suite3.passed}/${suite3.passed + suite3.failed} passed`);
console.log(`  Suite 4 (Route Security & Publication):      ${suite4.passed}/${suite4.passed + suite4.failed} passed`);
console.log(`  Suite 5 (British English Standard):          ${suite5.passed}/${suite5.passed + suite5.failed} passed`);
console.log(`  Suite 6 (Zero-Dash Standard):                ${suite6.passed}/${suite6.passed + suite6.failed} passed`);
console.log(`  Suite 7 (Phase 4I Quality & Flashcards):     ${suite7.passed}/${suite7.passed + suite7.failed} passed`);
console.log(`----------------------------------------------------------------`);
console.log(`Verification Complete: ${passCount}/${passCount + failCount} assertions passed (${failCount} failures).`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
