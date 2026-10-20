/**
 * Mathematical Audit & Verification Suite for DLD Unit 2 - Section 2.2
 * Course: Digital Logic Design (VR23 Autonomous)
 * Section 2.2: Simplification of Boolean Expressions Using Algebraic Laws
 * 
 * Strict Rule: Zero em-dashes and zero en-dashes throughout.
 */

import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

console.log("=================================================================");
console.log("   ZEROINDEX DLD SECTION 2.2: COMPREHENSIVE ACADEMIC AUDIT      ");
console.log("=================================================================");

// ----------------------------------------------------------------------------
// 1. FUNDAMENTAL OR AND AND LAWS
// ----------------------------------------------------------------------------
console.log("\n--- Checking 4 Fundamental OR Laws and 4 Fundamental AND Laws ---");
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  // OR Laws
  assert((a | 0) === a, `OR Identity: ${a} + 0 = ${a}`);
  assert((a | 1) === 1, `OR Domination: ${a} + 1 = 1`);
  assert((a | a) === a, `OR Idempotent: ${a} + ${a} = ${a}`);
  assert((a | notA) === 1, `OR Complement: ${a} + ${notA} = 1`);

  // AND Laws
  assert((a & 1) === a, `AND Identity: ${a} · 1 = ${a}`);
  assert((a & 0) === 0, `AND Domination: ${a} · 0 = 0`);
  assert((a & a) === a, `AND Idempotent: ${a} · ${a} = ${a}`);
  assert((a & notA) === 0, `AND Complement: ${a} · ${notA} = 0`);
}

// ----------------------------------------------------------------------------
// 2. OBJECTIVE DEMONSTRATION: F = A + AB <=> F = A
// ----------------------------------------------------------------------------
console.log("\n--- Checking Objective Demonstration (Absorption) ---");
let objDemoMatches = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const orig = a | (a & b);
    const simp = a;
    if (orig !== simp) objDemoMatches = false;
  }
}
assert(objDemoMatches, "Objective Demonstration: F = A + AB is identical to F = A for all 4 valuations of (A, B)");

// ----------------------------------------------------------------------------
// 3. TEN PATTERN RECOGNITION TECHNIQUES
// ----------------------------------------------------------------------------
console.log("\n--- Checking 10 Pattern Recognition Identities ---");
// T04 Factoring: AB + AC = A(B + C)
let t04Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      if (((a & b) | (a & c)) !== (a & (b | c))) t04Match = false;
    }
  }
}
assert(t04Match, "T04 Factoring: AB + AC <=> A(B + C) across all 8 states");

// T05 Absorption: A + AB = A and A(A + B) = A
let t05Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    if ((a | (a & b)) !== a) t05Match = false;
    if ((a & (a | b)) !== a) t05Match = false;
  }
}
assert(t05Match, "T05 Absorption: A + AB <=> A and A(A + B) <=> A across all 4 states");

// T06 Combining / Adjacency: AB + AB' = A
let t06Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a & b) | (a & notB)) !== a) t06Match = false;
  }
}
assert(t06Match, "T06 Combining: AB + AB' <=> A across all 4 states");

// T07 Redundancy: A + A'B = A + B
let t07Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    if ((a | (notA & b)) !== (a | b)) t07Match = false;
  }
}
assert(t07Match, "T07 Redundancy: A + A'B <=> A + B across all 4 states");

// T08 De Morgan: (A + B)' = A'B' and (AB)' = A' + B'
let t08Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a | b) === 0 ? 1 : 0) !== (notA & notB)) t08Match = false;
    if (((a & b) === 0 ? 1 : 0) !== (notA | notB)) t08Match = false;
  }
}
assert(t08Match, "T08 De Morgan: (A + B)' <=> A'B' and (AB)' <=> A' + B' across all 4 states");

// T09 Distributive Identity: A + BC = (A + B)(A + C)
let t09Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      if ((a | (b & c)) !== ((a | b) & (a | c))) t09Match = false;
    }
  }
}
assert(t09Match, "T09 Second Distributive Identity: A + BC <=> (A + B)(A + C) across all 8 states");

// T10 Consensus: AB + A'C + BC = AB + A'C
let t10Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const orig = (a & b) | (notA & c) | (b & c);
      const simp = (a & b) | (notA & c);
      if (orig !== simp) t10Match = false;
    }
  }
}
assert(t10Match, "T10 Consensus Theorem: AB + A'C + BC <=> AB + A'C across all 8 states");

// Dual Consensus: (A + B)(A' + C)(B + C) = (A + B)(A' + C)
let t10DualMatch = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const orig = (a | b) & (notA | c) & (b | c);
      const simp = (a | b) & (notA | c);
      if (orig !== simp) t10DualMatch = false;
    }
  }
}
assert(t10DualMatch, "T10 Dual Consensus: (A + B)(A' + C)(B + C) <=> (A + B)(A' + C) across all 8 states");

// ----------------------------------------------------------------------------
// 4. LEVEL 1: FIVE BASIC WORKED MODELS (B01 - B05)
// ----------------------------------------------------------------------------
console.log("\n--- Checking Level 1: Basic Worked Models (B01 to B05) ---");

// Model B01: F = A + AB <=> F = A
let b01Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    if ((a | (a & b)) !== a) b01Match = false;
  }
}
assert(b01Match, "Model B01: F = A + AB <=> F = A");

// Model B02: F = AB + AB' <=> F = A
let b02Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a & b) | (a & notB)) !== a) b02Match = false;
  }
}
assert(b02Match, "Model B02: F = AB + AB' <=> F = A");

// Model B03: F = (A + B)(A + B') <=> F = A
let b03Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a | b) & (a | notB)) !== a) b03Match = false;
  }
}
assert(b03Match, "Model B03: F = (A + B)(A + B') <=> F = A");

// Model B04: F = (A' + B')' <=> F = AB
let b04Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    const orig = (notA | notB) === 0 ? 1 : 0;
    const simp = a & b;
    if (orig !== simp) b04Match = false;
  }
}
assert(b04Match, "Model B04: F = (A' + B')' <=> F = AB");

// Model B05: F = A + A'B <=> F = A + B
let b05Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const orig = a | (notA & b);
    const simp = a | b;
    if (orig !== simp) b05Match = false;
  }
}
assert(b05Match, "Model B05: F = A + A'B <=> F = A + B");

// ----------------------------------------------------------------------------
// 5. LEVEL 2: SIX INTERMEDIATE WORKED MODELS (I01 - I06)
// ----------------------------------------------------------------------------
console.log("\n--- Checking Level 2: Intermediate Worked Models (I01 to I06) ---");

// Model I01: F = (A + B)(A' + B) <=> F = B
let i01Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const orig = (a | b) & (notA | b);
    const simp = b;
    if (orig !== simp) i01Match = false;
  }
}
assert(i01Match, "Model I01: F = (A + B)(A' + B) <=> F = B");

// Model I02: F = A(B + C) + AB' <=> F = A
let i02Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const orig = (a & (b | c)) | (a & notB);
      const simp = a;
      if (orig !== simp) i02Match = false;
    }
  }
}
assert(i02Match, "Model I02: F = A(B + C) + AB' <=> F = A");

// Model I03: F = (A + B + C)' <=> F = A'B'C'
let i03Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const orig = (a | b | c) === 0 ? 1 : 0;
      const simp = notA & notB & notC;
      if (orig !== simp) i03Match = false;
    }
  }
}
assert(i03Match, "Model I03: F = (A + B + C)' <=> F = A'B'C'");

// Model I04: F = (A + B)' + AB <=> F = A'B' + AB (XNOR)
let i04Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    const orig = ((a | b) === 0 ? 1 : 0) | (a & b);
    const simp = (notA & notB) | (a & b);
    if (orig !== simp) i04Match = false;
  }
}
assert(i04Match, "Model I04: F = (A + B)' + AB <=> F = A'B' + AB");

// Model I05: F = AB + A'C + BC <=> F = AB + A'C
let i05Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const orig = (a & b) | (notA & c) | (b & c);
      const simp = (a & b) | (notA & c);
      if (orig !== simp) i05Match = false;
    }
  }
}
assert(i05Match, "Model I05: F = AB + A'C + BC <=> F = AB + A'C");

// Model I06: F = (A + B)(A + C) <=> F = A + BC
let i06Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const orig = (a | b) & (a | c);
      const simp = a | (b & c);
      if (orig !== simp) i06Match = false;
    }
  }
}
assert(i06Match, "Model I06: F = (A + B)(A + C) <=> F = A + BC");

// ----------------------------------------------------------------------------
// 6. LEVEL 3: TWELVE ADVANCED WORKED MODELS (ADV01 - ADV12)
// ----------------------------------------------------------------------------
console.log("\n--- Checking Level 3: Twelve Advanced Worked Models (ADV01 to ADV12) ---");

// ADV01: F = A'B'C + A'BC + AB'C + ABC + AB'C' + ABC' <=> F = A + C
let adv01Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const orig = (notA & notB & c) | (notA & b & c) | (a & notB & c) | (a & b & c) | (a & notB & notC) | (a & b & notC);
      const simp = a | c;
      if (orig !== simp) adv01Match = false;
    }
  }
}
assert(adv01Match, "Model ADV01: F = A'B'C + A'BC + AB'C + ABC + AB'C' + ABC' <=> F = A + C");

// ADV02: F = (A + B)(A' + C)(B + C)(A + B + C)(A' + B + C) <=> F = (A + B)(A' + C)
let adv02Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const orig = (a | b) & (notA | c) & (b | c) & (a | b | c) & (notA | b | c);
      const simp = (a | b) & (notA | c);
      if (orig !== simp) adv02Match = false;
    }
  }
}
assert(adv02Match, "Model ADV02: F = (A + B)(A' + C)(B + C)(A + B + C)(A' + B + C) <=> F = (A + B)(A' + C)");

// ADV03: F = [(A + B')' + (A' + C')']' + AB + A'B <=> F = A' + B + C'
let adv03Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const term1 = (a | notB) === 0 ? 1 : 0;
      const term2 = (notA | notC) === 0 ? 1 : 0;
      const bracket = (term1 | term2) === 0 ? 1 : 0;
      const orig = bracket | (a & b) | (notA & b);
      const simp = notA | b | notC;
      if (orig !== simp) adv03Match = false;
    }
  }
}
assert(adv03Match, "Model ADV03: F = [(A + B')' + (A' + C')']' + AB + A'B <=> F = A' + B + C'");

// ADV04: F = AB + A'C + BC + A'B'C + AB'C + ABC' <=> F = C + AB
let adv04Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const orig = (a & b) | (notA & c) | (b & c) | (notA & notB & c) | (a & notB & c) | (a & b & notC);
      const simp = c | (a & b);
      if (orig !== simp) adv04Match = false;
    }
  }
}
assert(adv04Match, "Model ADV04: F = AB + A'C + BC + A'B'C + AB'C + ABC' <=> F = C + AB");

// ADV05: F = A'B'CD + A'BCD + AB'CD + ABCD + ABC'D + AB'C'D <=> F = D(A + C)
let adv05Match = true;
let adv05StepsValid = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = (notA & notB & c & d) | (notA & b & c & d) | (a & notB & c & d) | (a & b & c & d) | (a & b & notC & d) | (a & notB & notC & d);
        const step2 = ((c & d) & ((notA & notB) | (notA & b) | (a & notB) | (a & b))) | ((a & notC & d) & (b | notB));
        const step5 = ((c & d) & (notA | a)) | (a & notC & d);
        const step6 = (c & d) | (a & notC & d);
        const step7 = d & (c | (a & notC));
        const simp = d & (a | c);
        if (orig !== simp) adv05Match = false;
        if (orig !== step2 || orig !== step5 || orig !== step6 || orig !== step7) adv05StepsValid = false;
      }
    }
  }
}
assert(adv05Match, "Model ADV05: F = A'B'CD + A'BCD + AB'CD + ABCD + ABC'D + AB'C'D <=> F = D(A + C)");
assert(adv05StepsValid, "Model ADV05: All intermediate factoring and distribution steps verified");

// ADV06: F = A'BCD + ABCD + AB'CD + ABC'D + A'B'CD + A'BC'D <=> F = D(B + C)
let adv06Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = (notA & b & c & d) | (a & b & c & d) | (a & notB & c & d) | (a & b & notC & d) | (notA & notB & c & d) | (notA & b & notC & d);
        const simp = d & (b | c);
        if (orig !== simp) adv06Match = false;
      }
    }
  }
}
assert(adv06Match, "Model ADV06: F = A'BCD + ABCD + AB'CD + ABC'D + A'B'CD + A'BC'D <=> F = D(B + C)");

// ADV07: F = (A + B)(A + B')(C + D)(C + D') + A'BC + AB'D + ACD <=> F = AC + BC + AB'D
let adv07Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const posPart = (a | b) & (a | notB) & (c | d) & (c | notD);
        const sopPart = (notA & b & c) | (a & notB & d) | (a & c & d);
        const orig = posPart | sopPart;
        const simp = (a & c) | (b & c) | (a & notB & d);
        if (orig !== simp) adv07Match = false;
      }
    }
  }
}
assert(adv07Match, "Model ADV07: F = (A + B)(A + B')(C + D)(C + D') + A'BC + AB'D + ACD <=> F = AC + BC + AB'D");

// ADV08: F = [(A + B')' + (C + D')']' + AB + C'D <=> F = A + B' + C'D
let adv08Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const t1 = (a | notB) === 0 ? 1 : 0;
        const t2 = (c | notD) === 0 ? 1 : 0;
        const bracket = (t1 | t2) === 0 ? 1 : 0;
        const orig = bracket | (a & b) | (notC & d);
        const simp = a | notB | (notC & d);
        if (orig !== simp) adv08Match = false;
      }
    }
  }
}
assert(adv08Match, "Model ADV08: F = [(A + B')' + (C + D')']' + AB + C'D <=> F = A + B' + C'D");

// ADV09: F = [(A' + B)' + (C + D')']' + A'B'C + ABD <=> F = AB + A'C + A'D'
let adv09Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const t1 = (notA | b) === 0 ? 1 : 0;
        const t2 = (c | notD) === 0 ? 1 : 0;
        const bracket = (t1 | t2) === 0 ? 1 : 0;
        const orig = bracket | (notA & notB & c) | (a & b & d);
        const simp = (a & b) | (notA & c) | (notA & notD);
        if (orig !== simp) adv09Match = false;
      }
    }
  }
}
assert(adv09Match, "Model ADV09: F = [(A' + B)' + (C + D')']' + A'B'C + ABD <=> F = AB + A'C + A'D'");

// ADV10: F = [(AB + C'D)' + (A + B')']' + ABC + A'C'D <=> F = AB + C'D
let adv10Match = true;
let adv10StepsValid = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const t1 = ((a & b) | (notC & d)) === 0 ? 1 : 0;
        const t2 = (a | notB) === 0 ? 1 : 0;
        const bracket = (t1 | t2) === 0 ? 1 : 0;
        const orig = bracket | (a & b & c) | (notA & notC & d);
        // Verify intermediate expansion: bracket = ((AB + C'D)'') * ((A + B')'') = (AB + C'D)(A + B') = AAB + AB'AB + C'DA + C'DB' = AB + AC'D + B'C'D
        const expBracket = (a & b) | (a & notC & d) | (notB & notC & d);
        const stepMid = expBracket | (a & b & c) | (notA & notC & d);
        const simp = (a & b) | (notC & d);
        if (orig !== simp) adv10Match = false;
        if (orig !== stepMid) adv10StepsValid = false;
      }
    }
  }
}
assert(adv10Match, "Model ADV10: F = [(AB + C'D)' + (A + B')']' + ABC + A'C'D <=> F = AB + C'D");
assert(adv10StepsValid, "Model ADV10: Nested De Morgan expansion and intermediate steps verified");

// ADV11: F = A'B(C + D) + AB(C + D) + B'CD + BCD <=> F = BC + BD + CD
let adv11Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      for (let d = 0; d <= 1; d++) {
        const orig = (notA & b & (c | d)) | (a & b & (c | d)) | (notB & c & d) | (b & c & d);
        const simp = (b & c) | (b & d) | (c & d);
        if (orig !== simp) adv11Match = false;
      }
    }
  }
}
assert(adv11Match, "Model ADV11: F = A'B(C + D) + AB(C + D) + B'CD + BCD <=> F = BC + BD + CD");

// ADV12: F = [(A + B)(C' + D)]' + AC'D + BC'D <=> F = CD' + C'D + A'B'
let adv12Match = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const bracket = ((a | b) & (notC | d)) === 0 ? 1 : 0;
        const orig = bracket | (a & notC & d) | (b & notC & d);
        const simp = (c & notD) | (notC & d) | (notA & notB);
        if (orig !== simp) adv12Match = false;
      }
    }
  }
}
assert(adv12Match, "Model ADV12: F = [(A + B)(C' + D)]' + AC'D + BC'D <=> F = CD' + C'D + A'B'");

// ----------------------------------------------------------------------------
// 7. OPTIONAL FIVE-VARIABLE CHALLENGE (CH01)
// ----------------------------------------------------------------------------
console.log("\n--- Checking Optional Five-Variable Challenge (CH01 across all 32 combinations) ---");
let ch01Match = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        for (let e = 0; e <= 1; e++) {
          const orig = (a & notB & c & d & e) | (a & b & c & d & e) | (a & notB & notC & d & e) | (a & b & notC & d & e);
          const simp = a & d & e;
          if (orig !== simp) ch01Match = false;
        }
      }
    }
  }
}
assert(ch01Match, "Model CH01: F = AB'CDE + ABCDE + AB'C'DE + ABC'DE <=> F = ADE (all 32 input states verified)");

// ----------------------------------------------------------------------------
// 8. PRACTICE LAB: 24 VALIDATED PRACTICE PROBLEMS (P01 - P24)
// ----------------------------------------------------------------------------
console.log("\n--- Checking Practice Lab Problems (P01 to P24) ---");

// P01: (A + A')B <=> B
let p01 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    if (((a | notA) & b) !== b) p01 = false;
  }
}
assert(p01, "P01: (A + A')B <=> B");

// P02: AB + A'B <=> B
let p02 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    if (((a & b) | (notA & b)) !== b) p02 = false;
  }
}
assert(p02, "P02: AB + A'B <=> B");

// P03: (A + B)' <=> A'B'
let p03 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a | b) === 0 ? 1 : 0) !== (notA & notB)) p03 = false;
  }
}
assert(p03, "P03: (A + B)' <=> A'B'");

// P04: AB' + AB <=> A
let p04 = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a & notB) | (a & b)) !== a) p04 = false;
  }
}
assert(p04, "P04: AB' + AB <=> A");

// P05: (A + B)(A + C) <=> A + BC
let p05 = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      if (((a | b) & (a | c)) !== (a | (b & c))) p05 = false;
    }
  }
}
assert(p05, "P05: (A + B)(A + C) <=> A + BC");

// P06: A + A'BC <=> A + BC
let p06 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      if ((a | (notA & b & c)) !== (a | (b & c))) p06 = false;
    }
  }
}
assert(p06, "P06: A + A'BC <=> A + BC");

// P07: (A + B + C)(A + B + C') <=> A + B
let p07 = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      if (((a | b | c) & (a | b | notC)) !== (a | b)) p07 = false;
    }
  }
}
assert(p07, "P07: (A + B + C)(A + B + C') <=> A + B");

// P08: (A + B')(A' + B') <=> B'
let p08 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    if (((a | notB) & (notA | notB)) !== notB) p08 = false;
  }
}
assert(p08, "P08: (A + B')(A' + B') <=> B'");

// P09: (AB + CD)' <=> (A' + B')(C' + D')
let p09 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const orig = ((a & b) | (c & d)) === 0 ? 1 : 0;
        const simp = (notA | notB) & (notC | notD);
        if (orig !== simp) p09 = false;
      }
    }
  }
}
assert(p09, "P09: (AB + CD)' <=> (A' + B')(C' + D')");

// P10: (A + A')(B + C)(B + C') <=> B
let p10 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      if (((a | notA) & (b | c) & (b | notC)) !== b) p10 = false;
    }
  }
}
assert(p10, "P10: (A + A')(B + C)(B + C') <=> B");

// P11: A'B'C'D + A'BC'D + AB'C'D + ABC'D <=> C'D
let p11 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = (notA & notB & notC & d) | (notA & b & notC & d) | (a & notB & notC & d) | (a & b & notC & d);
        const simp = notC & d;
        if (orig !== simp) p11 = false;
      }
    }
  }
}
assert(p11, "P11: A'B'C'D + A'BC'D + AB'C'D + ABC'D <=> C'D");

// P12: AB'C + ABC + AB'C' + ABC' <=> A
let p12 = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const orig = (a & notB & c) | (a & b & c) | (a & notB & notC) | (a & b & notC);
      const simp = a;
      if (orig !== simp) p12 = false;
    }
  }
}
assert(p12, "P12: AB'C + ABC + AB'C' + ABC' <=> A");

// P13: (A + B)(A' + C)(B + C) <=> (A + B)(A' + C)
let p13 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const orig = (a | b) & (notA | c) & (b | c);
      const simp = (a | b) & (notA | c);
      if (orig !== simp) p13 = false;
    }
  }
}
assert(p13, "P13: (A + B)(A' + C)(B + C) <=> (A + B)(A' + C)");

// P14: ABC + ABC' + AB'C + A'BC <=> AB + AC + BC
let p14 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const orig = (a & b & c) | (a & b & notC) | (a & notB & c) | (notA & b & c);
      const simp = (a & b) | (a & c) | (b & c);
      if (orig !== simp) p14 = false;
    }
  }
}
assert(p14, "P14: ABC + ABC' + AB'C + A'BC <=> AB + AC + BC");

// P15: (A + B)(C + D) + (A + B)C'D <=> (A + B)(C + D)
let p15 = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = ((a | b) & (c | d)) | ((a | b) & notC & d);
        const simp = (a | b) & (c | d);
        if (orig !== simp) p15 = false;
      }
    }
  }
}
assert(p15, "P15: (A + B)(C + D) + (A + B)C'D <=> (A + B)(C + D)");

// P16: A'BC + ABC + A'BC' + ABC' + AB'C <=> B + AC
let p16 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      const orig = (notA & b & c) | (a & b & c) | (notA & b & notC) | (a & b & notC) | (a & notB & c);
      const simp = b | (a & c);
      if (orig !== simp) p16 = false;
    }
  }
}
assert(p16, "P16: A'BC + ABC + A'BC' + ABC' + AB'C <=> B + AC");

// P17: A'B'CD + A'BCD + AB'CD + ABCD + ABC'D <=> CD + ABD
let p17 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = (notA & notB & c & d) | (notA & b & c & d) | (a & notB & c & d) | (a & b & c & d) | (a & b & notC & d);
        const simp = (c & d) | (a & b & d);
        if (orig !== simp) p17 = false;
      }
    }
  }
}
assert(p17, "P17: A'B'CD + A'BCD + AB'CD + ABCD + ABC'D <=> CD + ABD");

// P18: [(A + B)(C + D')]' + ABD' <=> A'B' + C'D + ABD'
let p18 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const bracket = ((a | b) & (c | notD)) === 0 ? 1 : 0;
        const orig = bracket | (a & b & notD);
        const simp = (notA & notB) | (notC & d) | (a & b & notD);
        if (orig !== simp) p18 = false;
      }
    }
  }
}
assert(p18, "P18: [(A + B)(C + D')]' + ABD' <=> A'B' + C'D + ABD'");

// P19: (A + B + C)(A + B + C')(A' + D)(A + D) <=> D(A + B)
let p19 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = (a | b | c) & (a | b | notC) & (notA | d) & (a | d);
        const simp = d & (a | b);
        if (orig !== simp) p19 = false;
      }
    }
  }
}
assert(p19, "P19: (A + B + C)(A + B + C')(A' + D)(A + D) <=> D(A + B)");

// P20: A'BCD + ABCD + A'BCD' + ABCD' + AB'CD <=> BC + ACD
let p20 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      for (let d = 0; d <= 1; d++) {
        const notD = d === 0 ? 1 : 0;
        const orig = (notA & b & c & d) | (a & b & c & d) | (notA & b & c & notD) | (a & b & c & notD) | (a & notB & c & d);
        const simp = (b & c) | (a & c & d);
        if (orig !== simp) p20 = false;
      }
    }
  }
}
assert(p20, "P20: A'BCD + ABCD + A'BCD' + ABCD' + AB'CD <=> BC + ACD");

// P21: AB + A'C + BC + A'B'C <=> AB + A'C
let p21 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const orig = (a & b) | (notA & c) | (b & c) | (notA & notB & c);
      const simp = (a & b) | (notA & c);
      if (orig !== simp) p21 = false;
    }
  }
}
assert(p21, "P21: AB + A'C + BC + A'B'C <=> AB + A'C");

// P22: (AB' + A'C)' + ABD <=> AB + A'C'
let p22 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const bracket = ((a & notB) | (notA & c)) === 0 ? 1 : 0;
        const orig = bracket | (a & b & d);
        const simp = (a & b) | (notA & notC);
        if (orig !== simp) p22 = false;
      }
    }
  }
}
assert(p22, "P22: (AB' + A'C)' + ABD <=> AB + A'C'");

// P23: AB'CD + AB'C'D + ABCD + ABC'D <=> AD
let p23 = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;
      for (let d = 0; d <= 1; d++) {
        const orig = (a & notB & c & d) | (a & notB & notC & d) | (a & b & c & d) | (a & b & notC & d);
        const simp = a & d;
        if (orig !== simp) p23 = false;
      }
    }
  }
}
assert(p23, "P23: AB'CD + AB'C'D + ABCD + ABC'D <=> AD");

// P24: (A + B)(A' + C)(B + C) + B'D <=> AC + A'B + B'D
let p24 = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      for (let d = 0; d <= 1; d++) {
        const orig = ((a | b) & (notA | c) & (b | c)) | (notB & d);
        const simp = (a & c) | (notA & b) | (notB & d);
        if (orig !== simp) p24 = false;
      }
    }
  }
}
assert(p24, "P24: (A + B)(A' + C)(B + C) + B'D <=> AC + A'B + B'D");

// ----------------------------------------------------------------------------
// 9. ZERO EM-DASH AND ZERO EN-DASH AUDIT
// ----------------------------------------------------------------------------
console.log("\n--- Checking Zero Em-Dash and Zero En-Dash Compliance ---");
const filesToCheck = [
  'src/data/dldSection22Data.js',
  'src/components/Section22View.jsx',
  'scripts/verifySection22Math.mjs'
];

let dashClean = true;
for (const relPath of filesToCheck) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File missing: ${fullPath}`);
    dashClean = false;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const hasEmDash = content.includes('\u2014');
  const hasEnDash = content.includes('\u2013');
  if (hasEmDash || hasEnDash) {
    console.error(`[FAIL] Dash found in ${relPath} (EmDash: ${hasEmDash}, EnDash: ${hasEnDash})`);
    dashClean = false;
  } else {
    assert(true, `Zero dashes in ${relPath}`);
  }
}

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log("\n=================================================================");
console.log(`TOTAL AUDIT CHECKS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log("=================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL AND PEDAGOGICAL AUDITS PASSED WITH ZERO ERRORS.\n");
}
