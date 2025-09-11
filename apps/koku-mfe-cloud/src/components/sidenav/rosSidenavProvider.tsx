import React from 'react';

export interface RosSidenavProviderProps {
  children?: React.ReactNode;
}

export const RosSidenavProvider: React.FC<RosSidenavProviderProps> = ({ children }) => {
  return <>{children}</>;
};
