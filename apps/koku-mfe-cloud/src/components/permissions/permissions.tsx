import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
// import Cookies from 'universal-cookie';
import { Loading, NotAuthorized, NotAvailable } from '@koku/components/components';

import { RosSidenavProvider } from '../sidenav/rosSidenavProvider';
import { rox } from '../unleash';
import { hasAllPermissions } from './hasAllPermissions';

export interface PermissionsProps {
  children?: ReactNode;
}

const Permissions: React.FC<PermissionsProps> = ({ children }: PermissionsProps) => {
  // const cookies = new Cookies();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAvailable] = useState(true);

  useEffect(() => {
    const fetchIsAuthorized = async () => {
      const result = await hasAllPermissions();
      setIsAuthorized(result);
      setIsLoaded(true);
    };
    fetchIsAuthorized();
  }, []);

  const getNotAvailable = () => {
    return (
      <NotAvailable
        title={
          rox.isEnabled('ros.nonExcludablePermission')
            ? 'The Cost Management is temporarily unavailable'
            : 'The Cost Management service is temporarily unavailable'
        }
      />
    );
  };

  const getNotAuthorized = () => {
    return <NotAuthorized />;
  };

  return (
    <RosSidenavProvider>
      {isLoaded ? (isAvailable ? (isAuthorized ? children : getNotAuthorized()) : getNotAvailable()) : <Loading />}
    </RosSidenavProvider>
  );
};

export default Permissions;
