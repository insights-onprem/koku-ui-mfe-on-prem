import React from 'react';
import { OptimizationsDetails } from 'routes/optimizations/optimizationsDetails';

import { MfeOptimizationsWrapper } from './mfeOptimizationsWrapper';

export interface OptimizationsDetailsOwnProps {
  breadcrumbLabel?: string;
  breadcrumbPath?: string;
  linkPath?: string; // Optimizations breakdown link path
  linkState?: any; // Optimizations breakdown link state
  projectPath?: string; // Project path (i.e., OCP details breakdown path)
}

type OptimizationsDetailsProps = OptimizationsDetailsOwnProps;

const MfeOptimizationsDetails: React.FC<OptimizationsDetailsProps> = ({
  breadcrumbLabel,
  breadcrumbPath,
  linkPath,
  linkState,
  projectPath,
}: OptimizationsDetailsOwnProps) => {
  return (
    <MfeOptimizationsWrapper>
      <OptimizationsDetails
        breadcrumbLabel={breadcrumbLabel}
        breadcrumbPath={breadcrumbPath}
        linkPath={linkPath}
        linkState={linkState}
        projectPath={projectPath}
      />
    </MfeOptimizationsWrapper>
  );
};

export default MfeOptimizationsDetails;
