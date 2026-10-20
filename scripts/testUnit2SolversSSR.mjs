import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

console.log('Testing Unit2Solvers SSR rendering across all tabs...');

async function runSSRTest() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    ssr: {
      external: ['react', 'react-dom', 'lucide-react', 'antd']
    }
  });

  try {
    const { Unit2Solvers } = await vite.ssrLoadModule('/src/components/Unit2Solvers.jsx');
    const html = ReactDOMServer.renderToString(React.createElement(Unit2Solvers));
    console.log(`[PASS] Unit2Solvers rendered successfully! HTML size: ${html.length} bytes.`);
    await vite.close();
  } catch (err) {
    console.error('[FAIL] Unit2Solvers SSR failed:');
    console.error(err);
    await vite.close();
    process.exit(1);
  }
}

runSSRTest();
