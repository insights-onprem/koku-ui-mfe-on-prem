import React from 'react';
import { OptimizationsBadge } from 'routes/optimizations/optimizationsBadge';

import { MfeOptimizationsWrapper } from './mfeOptimizationsWrapper';

export interface OptimizationsBadgeOwnProps {
  cluster?: string | string[];
  project?: string | string[];
}

type OptimizationsBadgeProps = OptimizationsBadgeOwnProps;

const MfeOptimizationsBadge: React.FC<OptimizationsBadgeProps> = ({ cluster, project }: OptimizationsBadgeOwnProps) => {
  return (
    <MfeOptimizationsWrapper>
      <OptimizationsBadge cluster={cluster} project={project} />
    </MfeOptimizationsWrapper>
  );
};

export default MfeOptimizationsBadge;
