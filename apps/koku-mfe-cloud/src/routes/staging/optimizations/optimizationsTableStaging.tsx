import { PageSection } from '@patternfly/react-core';
import React from 'react';
import { OptimizationsTable } from 'routes/optimizations/optimizationsTable';

const OptimizationsDetailsStaging: React.FC = () => (
  <PageSection>
    <OptimizationsTable />
  </PageSection>
);

export default OptimizationsDetailsStaging;
