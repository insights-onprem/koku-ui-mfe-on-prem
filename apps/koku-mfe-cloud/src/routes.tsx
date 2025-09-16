import { Bullseye, Spinner } from '@patternfly/react-core';
import { userAccess } from 'components/userAccess';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '@koku/components/components/page/notFound'));
const OptimizationsBadgeStaging = lazy(
  () => import(/* webpackChunkName: "recommendations" */ 'routes/staging/optimizations/optimizationsBadgeStaging')
);
const OptimizationsBreakdownStaging = lazy(
  () => import(/* webpackChunkName: "recommendations" */ 'routes/staging/optimizations/optimizationsBreakdownStaging')
);
const OptimizationsDetailsStaging = lazy(
  () => import(/* webpackChunkName: "recommendations" */ 'routes/staging/optimizations/optimizationsDetailsStaging')
);
const OptimizationsLinkStaging = lazy(
  () => import(/* webpackChunkName: "recommendations" */ 'routes/staging/optimizations/optimizationsLinkStaging')
);
const OptimizationsSummaryStaging = lazy(
  () => import(/* webpackChunkName: "recommendations" */ 'routes/staging/optimizations/optimizationsSummaryStaging')
);
const OptimizationsTableStaging = lazy(
  () => import(/* webpackChunkName: "recommendations" */ 'routes/staging/optimizations/optimizationsTableStaging')
);
const Welcome = lazy(() => import(/* webpackChunkName: "ocpDetails" */ '@koku/components/components/page/welcome/welcome'));

const routes = {
  ocmOverview: {
    element: userAccess(Welcome),
    path: '/ocm/overview',
  },
  optimizationsBadge: {
    element: userAccess(OptimizationsBadgeStaging),
    path: '/ros/optimizations/badge',
  },
  optimizationsBreakdown: {
    element: userAccess(OptimizationsBreakdownStaging),
    path: '/ros/optimizations/breakdown',
  },
  optimizationsDetails: {
    element: userAccess(OptimizationsDetailsStaging),
    path: '/ros/optimizations/details',
  },
  optimizationsLink: {
    element: userAccess(OptimizationsLinkStaging),
    path: '/ros/optimizations/link',
  },
  optimizationsSummary: {
    element: userAccess(OptimizationsSummaryStaging),
    path: '/ros/optimizations/summary',
  },
  optimizationsTable: {
    element: userAccess(OptimizationsTableStaging),
    path: '/ros/optimizations/table',
  },
  welcome: {
    element: userAccess(Welcome),
    path: '/',
  },
};

const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner size="lg" />
      </Bullseye>
    }
  >
    <Switch>
      {Object.keys(routes).map(key => {
        const route = routes[key];
        return <Route key={route.path} path={route.path} component={route.element} />;
      })}
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export { routes, Routes };
