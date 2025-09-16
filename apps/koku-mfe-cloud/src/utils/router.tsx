import React from 'react';
import type { Location } from 'react-router-dom';
import { useHistory, useLocation, useParams } from 'react-router-dom';

export interface RouteComponentProps {
  location: Location;
  navigate: (to: any, options?: any) => void;
  params: any;
}

export interface RouterComponentProps {
  router: RouteComponentProps;
}

// See https://reactrouter.com/en/v6.3.0/faq#what-happened-to-withrouter-i-need-it
// And http://front-end-docs-insights.apps.ocp4.prod.psi.redhat.com/blog/router-v6
export function withRouter<P extends RouterComponentProps>(Component: React.ComponentType<P>) {
  function ComponentWithRouterProp(props: Omit<P, 'router'>) {
    const location = useLocation();
    const history = useHistory();
    const params = useParams();
    const navigate = (to: any) => history.push(to);
    return <Component {...(props as P)} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp as React.FC<Omit<P, 'router'>>;
}
