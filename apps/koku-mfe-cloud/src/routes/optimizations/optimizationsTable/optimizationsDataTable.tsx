import '@koku/components/components/dataTable/dataTable.scss';

import { Icon } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import type { Query } from 'api/queries/query';
import type { RecommendationReport } from 'api/ros/recommendations';
import messages from 'locales/messages';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataTable } from '@koku/components/components';
import { styles } from '@koku/components/components/dataTable/dataTable.styles';
import { NoOptimizations } from '@koku/components/components';
import type { ComputedReportItem } from 'routes/utils/computedReport/getComputedReportItems';
import { formatPath } from 'utils/paths';

type RouterComponentProps = any;
type RecommendationsAction = any;

interface OptimizationsDataTableOwnProps extends RouterComponentProps {
  action?: RecommendationsAction;
  filterBy?: any;
  isLoading?: boolean;
  isStandalone?: boolean;
  items?: ComputedReportItem[];
  orderBy?: any;
  query?: Query;
  report?: RecommendationReport;
}

type OptimizationsDataTableProps = OptimizationsDataTableOwnProps;

const OptimizationsDataTable: React.FC<OptimizationsDataTableProps> = ({
  action,
  filterBy,
  isLoading,
  isStandalone,
  items,
  orderBy,
  query,
  report,
}: OptimizationsDataTableOwnProps) => {
  // const [isStandaloneApp, setIsStandaloneApp] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    // setIsStandaloneApp(isStandalone || false);
  }, [isStandalone]);

  const emptyState = (
    <NoOptimizations title={intl.formatMessage(messages.optimizations)} />
  );

  const columns = [
    { name: intl.formatMessage(messages.names, { count: 1 }), orderBy: 'name' },
    { name: 'Score', orderBy: 'score' },
    { name: intl.formatMessage(messages.optimizations), orderBy: 'type' },
    { name: 'Detected', orderBy: 'detected' },
    { name: 'Last' },
  ];

  const getRowCells = (item: ComputedReportItem) => {
    const isTitleWrapped = false;
    const isWarning = (item as any).status?.value === 'warning';
    const scoreIcon = isWarning ? <Icon status="warning"><ExclamationTriangleIcon /></Icon> : undefined;
    const typeKey = (item as any).type?.value || (item as any).type;
    const type = intl.formatMessage((messages as any)[typeKey] || messages.optimizations);

    const [groupBy] = Object.keys(query?.group_by || { account: 'account' });
    const groupByVal = Array.isArray(query?.group_by?.[groupBy]) ? query.group_by[groupBy][0] : query?.group_by?.[groupBy];

    const href = formatPath(`/optimizations/details?group_by=${groupBy}&group_by_value=${groupByVal}`);

    const name = (
      <Link to={href}>
        <div>
          {scoreIcon}
          <span className={isTitleWrapped ? 'text-wrap' : 'text-nowrap'} style={{ marginLeft: scoreIcon ? 8 : 0 }}>
            {item.cluster as any}
          </span>
        </div>
      </Link>
    );
    const detected = (item as any).detected?.value
      ? intl.formatDate((item as any).detected.value, { day: 'numeric', month: 'short', year: 'numeric' })
      : '-';

    return [
      { value: name },
      { style: styles.managedColumn, value: (item as any).score?.value || '-' },
      { value: type },
      { value: detected },
      { style: styles.lastItem, value: (item as any).last?.value || '-' },
    ];
  };

  const rows = items ? items.map(item => ({ item, selected: false, cells: getRowCells(item) })) : [];

  return (
    <DataTable
      emptyState={emptyState}
      filterBy={filterBy}
      isActionsCell={true}
      isLoading={isLoading}
      isSelectable={false}
      columns={columns}
      rows={rows}
      orderBy={orderBy}
      onSelect={undefined}
      onSort={undefined}
    />
  );
};

export default OptimizationsDataTable;
