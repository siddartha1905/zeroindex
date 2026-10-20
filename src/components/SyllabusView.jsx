import React from 'react';
import { SubjectResourcesView } from './SubjectResourcesView';

/**
 * SyllabusView (Subject Resources Tab)
 * ZeroIndex Engineering Platform - Digital Logic Design
 * Seamlessly renders the comprehensive SubjectResourcesView reference center.
 * Strictly zero em-dashes and zero en-dashes.
 */
export const SyllabusView = ({ onNavigate, initialUnit = 1 }) => {
  return <SubjectResourcesView onNavigate={onNavigate} initialUnit={initialUnit} />;
};

export default SyllabusView;

