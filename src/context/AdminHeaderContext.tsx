'use client';

import React, { createContext, useContext, useState } from 'react';

interface AdminHeaderContextType {
  title: string;
  setTitle: (title: string) => void;
  actions: React.ReactNode;
  setActions: (actions: React.ReactNode) => void;
}

const AdminHeaderContext = createContext<AdminHeaderContextType>({
  title: 'Dashboard',
  setTitle: () => {},
  actions: null,
  setActions: () => {},
});

export function AdminHeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('Dashboard');
  const [actions, setActions] = useState<React.ReactNode>(null);

  return (
    <AdminHeaderContext.Provider value={{ title, setTitle, actions, setActions }}>
      {children}
    </AdminHeaderContext.Provider>
  );
}

export function useAdminHeader() {
  return useContext(AdminHeaderContext);
}

