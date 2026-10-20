import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

console.log('Testing Unit2Solvers SSR rendering across all individual solvers...');

async function runSSRTest() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    ssr: {
      external: ['react', 'react-dom', 'lucide-react', 'antd']
    }
  });

  try {
    const mod = await vite.ssrLoadModule('/src/components/Unit2Solvers.jsx');
    const { 
      Unit2Solvers, 
      SolverA_Simplifier, 
      SolverB_TruthTable, 
      SolverC_MintermMaxterm, 
      SolverD_SopPos, 
      SolverE_KMap, 
      SolverF_NandNor 
    } = mod;

    // 1. Master Component
    const htmlMaster = ReactDOMServer.renderToString(React.createElement(Unit2Solvers));
    console.log(`[PASS] Unit2Solvers master rendered successfully (${htmlMaster.length} bytes).`);

    // 2. Solver A: Simplifier
    const htmlA = ReactDOMServer.renderToString(React.createElement(SolverA_Simplifier));
    console.log(`[PASS] Solver A (Simplifier) rendered successfully (${htmlA.length} bytes).`);

    // 3. Solver B: Truth Table & Equivalence
    const htmlB = ReactDOMServer.renderToString(React.createElement(SolverB_TruthTable));
    console.log(`[PASS] Solver B (Truth Table) rendered successfully (${htmlB.length} bytes).`);

    // 4. Solver C: Minterm/Maxterm Explorer
    const htmlC = ReactDOMServer.renderToString(React.createElement(SolverC_MintermMaxterm));
    console.log(`[PASS] Solver C (Minterms/Maxterms) rendered successfully (${htmlC.length} bytes).`);

    // 5. Solver D: SOP/POS Conversion Studio
    const htmlD = ReactDOMServer.renderToString(React.createElement(SolverD_SopPos));
    console.log(`[PASS] Solver D (SOP/POS Conversion) rendered successfully (${htmlD.length} bytes).`);

    // 6. Solver E: Interactive K-Map Solver (Flagship)
    const htmlE = ReactDOMServer.renderToString(React.createElement(SolverE_KMap));
    console.log(`[PASS] Solver E (K-Map Solver) rendered successfully (${htmlE.length} bytes).`);

    // 7. Solver F: Universal Gate Synthesis
    const htmlF = ReactDOMServer.renderToString(React.createElement(SolverF_NandNor, { onBack: () => {} }));
    console.log(`[PASS] Solver F (NAND/NOR Synthesizer) rendered successfully (${htmlF.length} bytes).`);

    console.log('\nALL 6 INDIVIDUAL SOLVERS + MASTER CONTAINER RENDERED CLEANLY VIA SSR.\n');
    await vite.close();
  } catch (err) {
    console.error('[FAIL] Unit2Solvers SSR failed:');
    console.error(err);
    await vite.close();
    process.exit(1);
  }
}

runSSRTest();
