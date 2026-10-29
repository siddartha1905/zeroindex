/**
 * Digital Logic Design (DLD) - Unit 2: Boolean Algebra & Gate-Level Minimization
 * Comprehensive Master Engineering Preparation Guide
 * Course Code: 1005261102 | VR23 Autonomous Regulations
 * Faculty: J. Siddartha Varma, Assistant Professor, Department of CSE-DS
 * Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
 * Strict formatting: Zero em-dashes and zero en-dashes
 */

import { dldSection21Data } from './dldSection21Data.js';
import { dldSection22Data } from './dldSection22Data.js';
import { dldSection23Data } from './dldSection23Data.js';
import { dldSection24Data } from './dldSection24Data.js';
import { dldSection25Data } from './dldSection25Data.js';
import { dldSection26Data } from './dldSection26Data.js';
import { dldSection27Data } from './dldSection27Data.js';

export const dldUnit2Master = {
  unitId: 2,
  unitRoman: "UNIT-II",
  title: "Boolean Algebra and Gate-Level Minimization",
  courseOutcome: "CO2",
  estimatedTime: "9 Lectures / 3 Weeks",
  publicationStatus: "Available (Sections 2.1 to 2.7 Complete)",
  isLive: true,
  summary: "Axiomatic foundations of switching algebra, Huntington postulates, algebraic theorems, canonical and standard forms, two-, three-, and four-variable Karnaugh Map minimization, prime implicant determination, don't-care conditions, and universal NAND/NOR logic synthesis.",

  officialSyllabusTopics: [
    "Concept of Boolean algebra",
    "Basic Theorems and Properties of Boolean algebra",
    "Boolean Functions",
    "Canonical and Standard Forms",
    "Minterms and Maxterms",
    "Products of Sum Simplification",
    "Sum of Products Simplification",
    "Gate level Minimization Map Method",
    "Three-Variable K-Map",
    "Four Variable K-Maps",
    "Don't-Care Conditions",
    "NAND and NOR Implementation",
    "Exclusive-OR Function implementation using NAND and NOR gates"
  ],

  sections: [
    dldSection21Data,
    dldSection22Data,
    dldSection23Data,
    dldSection24Data,
    dldSection25Data,
    dldSection26Data,
    dldSection27Data
  ]
};

export default dldUnit2Master;
