'use client';

import React, { useState } from 'react';
import { Users, Shield, Plus, Key, Mail } from 'lucide-react';

export default function AdminUsersPage() {
  const [users] = useState([
    {
      name: 'Super Admin',
      email: 'admin@zhidimension.com',
      role: 'Super Administrator',
      status: 'Active',
      lastLogin: 'Just now',
    },
    {
      name: 'Sales Desk Executive',
      email: 'sales@zhidimension.com',
      role: 'Sales Manager',
      status: 'Active',
      lastLogin: '2 hours ago',
    },
    {
      name: 'Plant Supervisor',
      email: 'plant@zhidimension.com',
      role: 'Inventory Operator',
      status: 'Active',
      lastLogin: 'Yesterday',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                      {u.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                  {u.role}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                  {u.lastLogin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

