import { ToolbarItem } from '@patternfly/react-core';
import { BasicToolbar } from '@koku/components/components';
import React from 'react';

interface OptimizationsToolbarOwnProps {
  actions?: React.ReactNode;
  pagination?: React.ReactNode;
}

type OptimizationsToolbarProps = OptimizationsToolbarOwnProps;

const OptimizationsToolbar: React.FC<OptimizationsToolbarProps> = ({ actions, pagination }) => {
  return (
    <BasicToolbar
      actions={<ToolbarItem>{actions}</ToolbarItem>}
      showFilter={false}
      pagination={pagination}
    />
  );
};

export default OptimizationsToolbar;
