import React from 'react';
import { SubjectResourcesView } from './SubjectResourcesView';

/**
 * SyllabusView (Subject Resources Tab)
 * ZeroIndex Engineering Platform - Digital Logic Design
 * Seamlessly renders the comprehensive SubjectResourcesView reference center.
 * Strictly zero em-dashes and zero en-dashes.
 */
export const SyllabusView = ({ onNavigate, initialUnit = 1, isUnit2Accessible = true }) => {
  return (
    <SubjectResourcesView 
      onNavigate={onNavigate} 
      initialUnit={initialUnit} 
      isUnit2Accessible={isUnit2Accessible} 
    />
  );
};

export default SyllabusView;

