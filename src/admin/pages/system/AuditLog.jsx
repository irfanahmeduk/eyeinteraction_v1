"use client";
import { useMemo } from 'react';
import { PageHeader } from '../../components/shell/PageHeader.jsx';
import { DataTable, StatusBadge } from '../../components/data/DataTable.jsx';
import { useWorkspace } from '../../data/WorkspaceProvider.jsx';
import { MotionSurface } from '../../lib/motion/index.jsx';
export default function AuditLog() {
  const {
    activity
  } = useWorkspace();
  const columns = useMemo(() => [{
    key: 'name',
    dataIndex: 'name',
    title: 'Actor',
    width: 160
  }, {
    key: 'action',
    dataIndex: 'action',
    title: 'Activity',
    width: 340
  }, {
    key: 'module',
    dataIndex: 'module',
    title: 'Module',
    width: 160,
    filters: [...new Set(activity.map(a => a.module))].map(v => ({
      text: v,
      value: v
    })),
    onFilter: (v, r) => r.module === v
  }, {
    key: 'date',
    dataIndex: 'date',
    title: 'Time',
    width: 210,
    sorter: (a, b) => String(a.date).localeCompare(String(b.date)),
    render: v => new Date(v).toLocaleString()
  }, {
    key: 'status',
    dataIndex: 'status',
    title: 'Result',
    width: 120,
    render: v => <StatusBadge status={v} />
  }], [activity]);
  return <MotionSurface page>
      <PageHeader title="Audit log" group="System" description="A traceable record of changes in your demo workspace." />
      <DataTable rows={activity} columns={columns} name="audit-log" />
    </MotionSurface>;
}

