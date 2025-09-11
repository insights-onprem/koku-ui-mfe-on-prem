import React from 'react';
import { OptimizationsLink } from 'routes/optimizations/optimizationsLink';

import { MfeOptimizationsWrapper } from './mfeOptimizationsWrapper';

export interface OptimizationsBadgeOwnProps {
  cluster?: string | string[];
  linkPath?: string;
  linkState?: any;
  project?: string | string[];
}

type OptimizationsBadgeProps = OptimizationsBadgeOwnProps;

const MfeOptimizationsBadge: React.FC<OptimizationsBadgeProps> = ({
  cluster,
  linkPath,
  linkState,
  project,
}: OptimizationsBadgeOwnProps) => {
  return (
    <MfeOptimizationsWrapper>
      <OptimizationsLink cluster={cluster} project={project} linkState={linkState} linkPath={linkPath} />
    </MfeOptimizationsWrapper>
  );
};

export default MfeOptimizationsBadge;
