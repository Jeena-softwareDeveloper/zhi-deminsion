'use client';

import React, { useState, useEffect } from 'react';
import { Users, Shield, Plus, Key, Mail, CheckCircle } from 'lucide-react';
import { useAdminHeader } from '@/context/AdminHeaderContext';
import { DataTable, Column } from '@/components/admin/DataTable';

export default function AdminUsersPage() {
  const { setTitle, setActions } = useAdminHeader();

  const [users] = useState([
    {
      id: '1',
      name: 'Super Admin',
      email: 'admin@zhidimension.com',
      role: 'Super Administrator',
      status: 'Active',
      lastLogin: 'Just now',
    },
    {
      id: '2',
      name: 'Sales Desk Executive',
      email: 'sales@zhidimension.com',
      role: 'Sales Manager',
      status: 'Active',
      lastLogin: '2 hours ago',
    },
    {
      id: '3',
      name: 'Plant Supervisor',
      email: 'plant@zhidimension.com',
      role: 'Inventory Operator',
      status: 'Active',
      lastLogin: 'Yesterday',
    },
  ]);

  useEffect(() => {
    setTitle('Users & Access Control');
    setActions(
      <button
        onClick={() => alert('Add user role management feature')}
        className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add Admin User</span>
      </button>
    );
    return () => setActions(null);
  }, []);

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (u) => (
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
            {u.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs">{u.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (u) => (
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
          {u.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (u) => (
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          {u.status}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      header: 'Last Activity',
      render: (u) => <span className="text-xs text-slate-500">{u.lastLogin}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search admin users..."
        pageSize={10}
        emptyTitle="No users found"
      />
    </div>
  );
}
