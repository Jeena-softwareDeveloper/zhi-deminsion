'use client';

import React, { createContext, useContext, useState } from 'react';

interface AdminHeaderContextType {
  title: string;
  setTitle: (title: string) => void;
  badge: React.ReactNode;
  setBadge: (badge: React.ReactNode) => void;
  controls: React.ReactNode;
  setControls: (controls: React.ReactNode) => void;
  actions: React.ReactNode;
  setActions: (actions: React.ReactNode) => void;
}

const AdminHeaderContext = createContext<AdminHeaderContextType>({
  title: 'Dashboard',
  setTitle: () => {},
  badge: null,
  setBadge: () => {},
  controls: null,
  setControls: () => {},
  actions: null,
  setActions: () => {},
});

export function AdminHeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('Dashboard');
  const [badge, setBadge] = useState<React.ReactNode>(null);
  const [controls, setControls] = useState<React.ReactNode>(null);
  const [actions, setActions] = useState<React.ReactNode>(null);

  return (
    <AdminHeaderContext.Provider
      value={{
        title,
        setTitle,
        badge,
        setBadge,
        controls,
        setControls,
        actions,
        setActions,
      }}
    >
      {children}
    </AdminHeaderContext.Provider>
  );
}

export function useAdminHeader() {
  return useContext(AdminHeaderContext);
}
