import React from 'react';

/**
 * ConnectedCircuitViewer
 * Standard ANSI/IEEE Connected Circuit Diagram Renderer
 * Strict Zero-Dash Standard: strictly zero em-dashes and zero en-dashes throughout.
 * Renders physically connected logic networks with inputs, wires, junction dots,
 * gate symbols, inversion bubbles, intermediate node equations, and final output F.
 */
export const ConnectedCircuitViewer = ({
  circuit,
  activeStageIndex = null,
  compact = false,
  className = ''
}) => {
  if (!circuit) return null;

  const width = circuit.width || 460;
  const height = circuit.height || 140;
  const inputs = circuit.inputs || [];
  const gates = circuit.gates || [];
  const wires = circuit.wires || [];
  const junctions = circuit.junctions || [];
  const labels = circuit.labels || [];
  const output = circuit.output || null;

  // Calculate dynamic SVG width with guaranteed safe margins to prevent output clipping
  let maxX = width;
  wires.forEach(w => {
    if (w.d) {
      const matches = [...w.d.matchAll(/([ML])\s*([\d.]+)\s+([\d.]+)/g)];
      matches.forEach(m => {
        const x = parseFloat(m[2]);
        if (!isNaN(x)) maxX = Math.max(maxX, x);
      });
    }
  });
  gates.forEach(g => {
    maxX = Math.max(maxX, g.x + 55);
  });
  if (output && output.x) {
    maxX = Math.max(maxX, output.x + 25);
  }

  // Provide at least 35px of right-side breathing room beyond the furthest element
  const safeSvgWidth = Math.max(width, Math.ceil(maxX + 35));
  const safeSvgHeight = height;

  // Extract Boolean equation for dedicated display below the schematic
  const rawLabel = output?.label || '';
  const finalEquation = output?.equation || 
    (rawLabel.includes('=') ? rawLabel : (rawLabel && rawLabel !== 'F' ? `F = ${rawLabel}` : ''));

  // Determine element stage status
  const getStageStatus = (stage) => {
    if (activeStageIndex === null || stage === undefined) {
      return 'active';
    }
    const currentStageNum = activeStageIndex + 1;
    if (stage === currentStageNum) {
      return 'highlighted';
    }
    if (stage < currentStageNum) {
      return 'completed';
    }
    return 'future';
  };

  const getStrokeColor = (stage) => {
    const status = getStageStatus(stage);
    if (status === 'highlighted') return '#059669'; // Emerald-600
    if (status === 'completed') return '#285C49';   // Forest Slate
    if (status === 'future') return '#CBD5E1';      // Slate-300
    return '#285C49';                               // Default Forest
  };

  const getGateFill = (stage) => {
    const status = getStageStatus(stage);
    if (status === 'highlighted') return '#ECFDF5'; // Light Emerald
    if (status === 'future') return '#F8FAFC';      // Muted Slate
    return '#FAF8F5';                               // Default Warm Ivory
  };

  const getOpacity = (stage) => {
    const status = getStageStatus(stage);
    if (status === 'future') return 0.25;
    return 1;
  };

  const getStrokeWidth = (stage) => {
    const status = getStageStatus(stage);
    if (status === 'highlighted') return 2.5;
    return 2;
  };

  return (
    <div className={`w-full flex flex-col items-center py-2 ${className}`}>
      {/* Scrollable SVG Canvas with Safe ViewBox */}
      <div className="w-full overflow-x-auto flex justify-center pb-1">
        <svg
          viewBox={`0 0 ${safeSvgWidth} ${safeSvgHeight}`}
          className="w-full h-auto min-w-[260px]"
          style={{ maxWidth: `${safeSvgWidth}px` }}
        >
          {/* Background Grid Pattern or Subtle Canvas */}
          <rect width={safeSvgWidth} height={safeSvgHeight} fill="#FFFFFF" rx="8" />

          {/* 1. Connection Wires */}
          {wires.map((w, wIdx) => {
            const status = getStageStatus(w.stage);
            const stroke = getStrokeColor(w.stage);
            const strokeWidth = getStrokeWidth(w.stage);
            const opacity = getOpacity(w.stage);
            const isDashed = status === 'future';

            return (
              <path
                key={w.id || `wire-${wIdx}`}
                d={w.d}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={isDashed ? '4,4' : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={opacity}
              />
            );
          })}

          {/* 2. Junction Dots (Branching and Tied-Input Nodes) */}
          {junctions.map((j, jIdx) => {
            const fill = getStrokeColor(j.stage);
            const opacity = getOpacity(j.stage);
            return (
              <circle
                key={`j-${jIdx}`}
                cx={j.x}
                cy={j.y}
                r={j.r || 3.5}
                fill={fill}
                opacity={opacity}
              />
            );
          })}

          {/* 3. Logic Gate Symbols */}
          {gates.map((g, gIdx) => {
            const gx = g.x;
            const gy = g.y;
            const stroke = getStrokeColor(g.stage);
            const fill = getGateFill(g.stage);
            const strokeWidth = getStrokeWidth(g.stage);
            const opacity = getOpacity(g.stage);

            return (
              <g key={g.id || `gate-${gIdx}`} opacity={opacity}>
                {/* Gate Shapes */}
                {(g.type === 'AND' || g.type === 'NAND') && (
                  <path
                    d={`M ${gx},${gy} L ${gx + 24},${gy} A 15,15 0 0 1 ${gx + 24},${gy + 30} L ${gx},${gy + 30} Z`}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                  />
                )}

                {(g.type === 'OR' || g.type === 'NOR') && (
                  <path
                    d={`M ${gx},${gy} Q ${gx + 12},${gy + 15} ${gx},${gy + 30} Q ${gx + 25},${gy + 30} ${gx + 36},${gy + 15} Q ${gx + 25},${gy} ${gx},${gy} Z`}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                  />
                )}

                {g.type === 'NOT' && (
                  <polygon
                    points={`${gx},${gy} ${gx + 26},${gy + 15} ${gx},${gy + 30}`}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                  />
                )}

                {(g.type === 'XOR' || g.type === 'XNOR') && (
                  <>
                    <path
                      d={`M ${gx - 4},${gy} Q ${gx + 8},${gy + 15} ${gx - 4},${gy + 30}`}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                    />
                    <path
                      d={`M ${gx + 2},${gy} Q ${gx + 14},${gy + 15} ${gx + 2},${gy + 30} Q ${gx + 26},${gy + 30} ${gx + 38},${gy + 15} Q ${gx + 26},${gy} ${gx + 2},${gy} Z`}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                    />
                  </>
                )}

                {/* Inversion Bubbles */}
                {(g.type === 'NAND' || g.type === 'NOR' || g.type === 'NOT' || g.type === 'XNOR') && (
                  <circle
                    cx={
                      g.type === 'NOT'
                        ? gx + 30
                        : g.type === 'NOR'
                        ? gx + 40
                        : g.type === 'XNOR'
                        ? gx + 42
                        : gx + 43
                    }
                    cy={gy + 15}
                    r="3.5"
                    fill="#FFFFFF"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                  />
                )}

                {/* Gate Identifier Label */}
                <text
                  x={
                    g.type === 'NOT'
                      ? gx + 12
                      : g.type === 'NOR' || g.type === 'OR'
                      ? gx + 17
                      : gx + 16
                  }
                  y={gy + 18}
                  textAnchor="middle"
                  fontSize={compact ? '8' : '9'}
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={stroke}
                >
                  {g.label || g.id}
                </text>
              </g>
            );
          })}

          {/* 4. Primary Input Markers */}
          {inputs.map((inp, iIdx) => (
            <g key={`inp-${iIdx}`}>
              <text
                x={inp.x - 4}
                y={inp.y + 4}
                textAnchor="end"
                fontSize={compact ? '10' : '11'}
                fontFamily="monospace"
                fontWeight="bold"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinejoin="round"
                fill="none"
              >
                {inp.label || inp.id}
              </text>
              <text
                x={inp.x - 4}
                y={inp.y + 4}
                textAnchor="end"
                fontSize={compact ? '10' : '11'}
                fontFamily="monospace"
                fontWeight="bold"
                fill="#1E293B"
              >
                {inp.label || inp.id}
              </text>
            </g>
          ))}

          {/* 5. Intermediate Net Labels with Anti-Collision White Halo */}
          {labels.map((lbl, lIdx) => {
            const opacity = getOpacity(lbl.stage);
            const color = getStrokeColor(lbl.stage);
            return (
              <g key={`lbl-${lIdx}`} opacity={opacity}>
                <text
                  x={lbl.x}
                  y={lbl.y}
                  fontSize={compact ? '8.5' : '9.5'}
                  fontFamily="monospace"
                  fontWeight="bold"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                >
                  {lbl.text}
                </text>
                <text
                  x={lbl.x}
                  y={lbl.y}
                  fontSize={compact ? '8.5' : '9.5'}
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={color}
                >
                  {lbl.text}
                </text>
              </g>
            );
          })}

          {/* 6. Connected Final Output Terminal Pin F with Safe Halo */}
          {output && (
            <g opacity={getOpacity(output.stage)}>
              <text
                x={output.x + 2}
                y={output.y + 4}
                textAnchor="start"
                fontSize={compact ? '11' : '12'}
                fontFamily="monospace"
                fontWeight="bold"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinejoin="round"
                fill="none"
              >
                F
              </text>
              <text
                x={output.x + 2}
                y={output.y + 4}
                textAnchor="start"
                fontSize={compact ? '11' : '12'}
                fontFamily="monospace"
                fontWeight="bold"
                fill="#166534"
              >
                F
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* 7. Dedicated Final Boolean Expression Area Below Schematic */}
      {finalEquation && !compact && (
        <div className="mt-2.5 w-full max-w-xl px-4 py-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-2xs">
          <span className="font-mono text-[11px] font-bold text-[#166534] uppercase tracking-wider">
            Final Output Function:
          </span>
          <span className="font-mono text-xs sm:text-sm font-bold text-[#166534]">
            {finalEquation}
          </span>
        </div>
      )}
      {finalEquation && compact && (
        <div className="mt-1.5 px-3 py-1 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-xs font-mono font-bold text-[#166534] text-center">
          {finalEquation}
        </div>
      )}
    </div>
  );
};

export default ConnectedCircuitViewer;
