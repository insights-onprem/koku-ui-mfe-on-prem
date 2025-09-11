import React from 'react';
import { OptimizationsBreakdown } from 'routes/optimizations/optimizationsBreakdown';

import { MfeOptimizationsWrapper } from './mfeOptimizationsWrapper';

export interface OptimizationsBreakdownOwnProps {
  // TBD...
}

type OptimizationsBreakdownProps = OptimizationsBreakdownOwnProps;

const MfeOptimizationsBreakdown: React.FC<OptimizationsBreakdownProps> = () => {
  return (
    <MfeOptimizationsWrapper>
      <OptimizationsBreakdown />
    </MfeOptimizationsWrapper>
  );
};

export default MfeOptimizationsBreakdown;
