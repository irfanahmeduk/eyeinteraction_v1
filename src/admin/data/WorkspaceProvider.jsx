"use client";
import { templateConfig } from '../config/template.config.js';
import { createContext, useContext, useMemo, useState } from 'react';
import { modules, seedModule } from './modules.js';
import { readStored, writeStored } from '../lib/storage.js';
const seed = {
  records: Object.fromEntries(modules.map(m => [m.key, seedModule(m)])),
  activity: Array.from({
    length: 14
  }, (_, i) => ({
    id: `audit-${i}`,
    name: ['Jamie Chen', 'Alex Morgan', 'Taylor Reed'][i % 3],
    action: ['Updated purchase order PO-2026-0101', 'Created a new product', 'Reviewed journal JE-2026-0102', 'Updated workspace appearance'][i % 4],
    module: ['Inventory', 'Inventory', 'Accounting', 'Settings'][i % 4],
    date: new Date(Date.now() - i * 3600000).toISOString(),
    status: 'Success'
  })),
  notices: [{
    id: 'n1',
    title: 'Stock needs attention',
    detail: '3 products are below their reorder point.',
    category: 'inventory',
    read: false,
    date: new Date().toISOString()
  }, {
    id: 'n2',
    title: 'Invoice ready for review',
    detail: 'INV-2026-0104 was sent to your review queue.',
    category: 'finance',
    read: false,
    date: new Date(Date.now() - 3600000).toISOString()
  }, {
    id: 'n3',
    title: 'Welcome to your workspace',
    detail: 'Explore your appearance settings to make it yours.',
    category: 'security',
    read: true,
    date: new Date(Date.now() - 86400000).toISOString()
  }],
  profile: {
    name: 'Alex Morgan',
    email: 'alex@example.com',
    title: 'Workspace administrator'
  },
  org: {
    name: `${templateConfig.brand.name} Operations`,
    email: 'hello@example.com',
    currency: 'USD'
  },
  roles: {
    Admin: ['View', 'Create', 'Edit', 'Delete', 'Export'],
    Manager: ['View', 'Create', 'Edit', 'Export'],
    Member: ['View']
  }
};
const Context = createContext(null);
export const useWorkspace = () => useContext(Context);
export function WorkspaceProvider({
  children
}) {
  const [data, setData] = useState(() => {
    const saved = readStored('eyeinteraction:admin:demo-workspace:v1', null);
    return saved && saved.records && saved.activity && saved.notices && saved.profile && saved.roles && saved.org ? {
      ...seed,
      ...saved,
      records: {
        ...seed.records,
        ...saved.records
      }
    } : seed;
  });
  const [storageError, setStorageError] = useState(false);
  const value = useMemo(() => {
    const update = fn => setData(previous => {
      const next = fn(previous);
      queueMicrotask(() => setStorageError(!writeStored('eyeinteraction:admin:demo-workspace:v1', next)));
      return next;
    });
    const audit = (d, action, module) => [{
      id: crypto.randomUUID(),
      name: d.profile.name,
      action,
      module,
      date: new Date().toISOString(),
      status: 'Success'
    }, ...d.activity];
    return {
      ...data,
      storageError,
      save: (module, row) => update(d => {
        const exists = d.records[module].some(r => r.id === row.id);
        return {
          ...d,
          records: {
            ...d.records,
            [module]: exists ? d.records[module].map(r => r.id === row.id ? row : r) : [row, ...d.records[module]]
          },
          activity: audit(d, `${exists ? 'Updated' : 'Created'} ${row.name}`, module)
        };
      }),
      remove: (module, ids) => update(d => ({
        ...d,
        records: {
          ...d.records,
          [module]: d.records[module].filter(r => !ids.includes(r.id))
        },
        activity: audit(d, `Deleted ${ids.length} record(s)`, module)
      })),
      receiveNotice: notice => update(d => ({
        ...d,
        notices: [{
          ...notice,
          id: crypto.randomUUID(),
          read: false,
          date: new Date().toISOString()
        }, ...d.notices]
      })),
      markRead: id => update(d => ({
        ...d,
        notices: d.notices.map(n => !id || n.id === id ? {
          ...n,
          read: true
        } : n)
      })),
      updateProfile: profile => update(d => ({
        ...d,
        profile,
        activity: audit(d, 'Updated profile', 'Profile')
      })),
      updateOrg: org => update(d => ({
        ...d,
        org,
        activity: audit(d, 'Updated organization', 'Settings')
      })),
      updateRole: (name, permissions) => update(d => ({
        ...d,
        roles: {
          ...d.roles,
          [name]: permissions
        },
        activity: audit(d, `Updated ${name} permissions`, 'Users')
      }))
    };
  }, [data, storageError]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

