import React from 'react';
import { OptimizationsSummary } from 'routes/optimizations/optimizationsSummary';

import { MfeOptimizationsWrapper } from './mfeOptimizationsWrapper';

export interface OptimizationsSummaryOwnProps {
  linkPath?: string;
  linkState?: any;
}

type OptimizationsSummaryProps = OptimizationsSummaryOwnProps;

const MfeOptimizationsSummary: React.FC<OptimizationsSummaryProps> = ({
  linkPath,
  linkState,
}: OptimizationsSummaryOwnProps) => {
  return (
    <MfeOptimizationsWrapper>
      <OptimizationsSummary linkPath={linkPath} linkState={linkState} />
    </MfeOptimizationsWrapper>
  );
};

export default MfeOptimizationsSummary;
