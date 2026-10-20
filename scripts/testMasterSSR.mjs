import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

console.log('Testing ZeroIndex Portal Master Components SSR Rendering...');

async function runMasterSSR() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    ssr: {
      external: ['react', 'react-dom', 'lucide-react', 'antd']
    }
  });

  try {
    // 1. PracticeArena with Unit 1 (including gates track)
    const { PracticeArena } = await vite.ssrLoadModule('/src/components/PracticeArena.jsx');
    const htmlArenaU1 = ReactDOMServer.renderToString(React.createElement(PracticeArena, { defaultUnit: 1, initialTrack: 'gates' }));
    console.log(`[PASS] PracticeArena (Unit 1, gates track) rendered successfully (${htmlArenaU1.length} bytes).`);

    const htmlArenaU2 = ReactDOMServer.renderToString(React.createElement(PracticeArena, { defaultUnit: 2, initialTrack: 'sec25' }));
    console.log(`[PASS] PracticeArena (Unit 2, sec25 track) rendered successfully (${htmlArenaU2.length} bytes).`);

    // 2. SubjectResourcesView
    const { SubjectResourcesView } = await vite.ssrLoadModule('/src/components/SubjectResourcesView.jsx');
    const htmlResourcesU1 = ReactDOMServer.renderToString(React.createElement(SubjectResourcesView, { defaultUnit: 1 }));
    console.log(`[PASS] SubjectResourcesView (Unit 1) rendered successfully (${htmlResourcesU1.length} bytes).`);

    const htmlResourcesU2 = ReactDOMServer.renderToString(React.createElement(SubjectResourcesView, { defaultUnit: 2 }));
    console.log(`[PASS] SubjectResourcesView (Unit 2) rendered successfully (${htmlResourcesU2.length} bytes).`);

    // 3. InteractiveSolvers (Unit 1)
    const { InteractiveSolvers } = await vite.ssrLoadModule('/src/components/InteractiveSolvers.jsx');
    const htmlU1Solvers = ReactDOMServer.renderToString(React.createElement(InteractiveSolvers, { initialSolverTab: 'gates' }));
    console.log(`[PASS] InteractiveSolvers (Unit 1, gates tab) rendered successfully (${htmlU1Solvers.length} bytes).`);

    // 4. UnitWorkspace (Unit 1)
    const { UnitWorkspace } = await vite.ssrLoadModule('/src/components/UnitWorkspace.jsx');
    const { dldUnit1Master } = await vite.ssrLoadModule('/src/data/dldUnit1Master.js');
    const htmlUnit1 = ReactDOMServer.renderToString(React.createElement(UnitWorkspace, { section: dldUnit1Master.sections[0] }));
    console.log(`[PASS] UnitWorkspace (Unit 1, section 1.1) rendered successfully (${htmlUnit1.length} bytes).`);

    // 5. Section 1.7 View
    const { Section17View } = await vite.ssrLoadModule('/src/components/Section17View.jsx');
    const htmlSec17 = ReactDOMServer.renderToString(React.createElement(Section17View));
    console.log(`[PASS] Section17View rendered successfully (${htmlSec17.length} bytes).`);

    // 6. DldWorkspace master portal
    const { DldWorkspace } = await vite.ssrLoadModule('/src/components/DldWorkspace.jsx');
    const htmlPortal = ReactDOMServer.renderToString(React.createElement(DldWorkspace));
    console.log(`[PASS] DldWorkspace master portal rendered successfully (${htmlPortal.length} bytes).`);

    console.log('\nALL ZEROINDEX CORE COMPONENTS RENDERED CLEANLY VIA SSR WITH ZERO RUNTIME EXCEPTIONS!\n');
    await vite.close();
  } catch (err) {
    console.error('[FAIL] Master SSR test failed:', err);
    await vite.close();
    process.exit(1);
  }
}

runMasterSSR();
