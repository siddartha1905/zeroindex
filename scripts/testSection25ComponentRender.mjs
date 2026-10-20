import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

console.log('Starting Vite SSR to test Section25View component rendering across all 7 tabs...');

const TABS = [
  'start-here',
  'foundations',
  'grouping-rules',
  'guided-demos',
  'worked-models',
  'cheat-sheet',
  'practice-lab'
];

async function runTest() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    ssr: {
      external: ['react', 'react-dom', 'lucide-react', 'antd']
    }
  });

  try {
    const { Section25View } = await vite.ssrLoadModule('/src/components/Section25View.jsx');
    const { dldUnit2Master } = await vite.ssrLoadModule('/src/data/dldUnit2Master.js');

    for (const tabId of TABS) {
      const html = ReactDOMServer.renderToString(
        React.createElement(Section25View, {
          section: dldUnit2Master.sections[4],
          initialTab: tabId
        })
      );
      if (html.includes('Section 2.5 Rendering Error')) {
        throw new Error(`Tab "${tabId}" triggered SectionErrorBoundary: rendering failed.`);
      }
      console.log(`[PASS] Tab "${tabId}" rendered successfully (${html.length} bytes).`);
    }

    console.log('\nAll 7 tabs rendered cleanly without any errors or white-page crashes!');
    await vite.close();
  } catch (err) {
    console.error('[FAIL] Section25View crashed during tab render test:');
    console.error(err);
    await vite.close();
    process.exit(1);
  }
}

runTest();
