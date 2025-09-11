// styles moved into components lib

import type { AxiosError } from 'axios';
import React from 'react';
import { useIntl } from 'react-intl';

import type { Query } from 'api/queries/query';
import type { RecommendationReport } from 'api/ros/recommendations';
import messages from 'locales/messages';
import { Loading, NotAvailable } from '@koku/components/components';

import { styles } from '@koku/components/components/dataTable/dataTable.styles';
import OptimizationsDataTable from './optimizationsDataTable';

interface OptimizationsTableOwnProps {
  error?: AxiosError;
  filterBy?: any;
  isLoading?: boolean;
  isStandalone?: boolean;
  items?: any[];
  onClose?: () => void;
  onSelect?: (item: any) => void;
  onSort?: (sortType: string, isSortAscending: boolean) => void;
  orderBy?: any;
  query?: Query;
  report?: RecommendationReport;
}

type OptimizationsTableProps = OptimizationsTableOwnProps;

const OptimizationsTable: React.FC<OptimizationsTableProps> = ({
  error,
  filterBy,
  isLoading,
  isStandalone,
  items,
  onClose,
  onSelect,
  onSort,
  orderBy,
  query,
  report,
}: OptimizationsTableOwnProps) => {
  const intl = useIntl();

  const getEmptyState = () => {
    return (
      <div style={styles.emptyState}>
        <NotAvailable title={intl.formatMessage(messages.tableEmptyState)} />
      </div>
    );
  };

  return (
    <div className="optimizationsTableOverride">
      {!isLoading && items?.length === 0 && getEmptyState()}
      {isLoading && (
        <div style={styles.emptyState}>
          <Loading body={intl.formatMessage(messages.loadingStateDesc)} heading={intl.formatMessage(messages.loadingStateTitle)} />
        </div>
      )}
      {items?.length > 0 && (
        <OptimizationsDataTable
          filterBy={filterBy}
          isLoading={isLoading}
          isStandalone={isStandalone}
          items={items}
          orderBy={orderBy}
          query={query}
          report={report}
        />
      )}
    </div>
  );
};

export default OptimizationsTable;
