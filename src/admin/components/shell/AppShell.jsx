"use client";
import { Suspense, useEffect, useState } from 'react';
import { Alert, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useNavigate } from '../../navigation.jsx';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';
import { useTemplate } from '../../theme/ThemeProvider.jsx';
import { useWorkspace } from '../../data/WorkspaceProvider.jsx';
import { PageSkeleton } from '../feedback/index.jsx';
import { useSound } from '../../lib/sound/useSound.js';
import { useWorkspaceTools } from '../../lib/useWorkspaceTools.js';
import { useButtonMotion } from '../../lib/motion/index.jsx';
import { NotificationReceiver } from '../feedback/NotificationReceiver.jsx';
export default function AppShell({
  onLogout,
  children
}) {
  useWorkspaceTools();
  useButtonMotion();
  const {
    config,
    storageError
  } = useTemplate();
  const workspace = useWorkspace();
  const [collapsed, setCollapsed] = useState(config.layout.sidebarDefaultCollapsed);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(['/dashboard']);
  const sound = useSound();
  useEffect(() => {
    setTabs(t => t.includes(location.pathname) ? t : [...t, location.pathname].slice(-8));
  }, [location.pathname]);
  useEffect(() => setCollapsed(config.layout.sidebarDefaultCollapsed), [config.layout.sidebarDefaultCollapsed]);
  return <div className={`app-shell ${collapsed ? 'is-collapsed' : ''} ${mobile ? 'nav-open' : ''}`} onClickCapture={e => {
    if (e.target.closest('button,a')) sound('click');
  }}>
      <NotificationReceiver />
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed(s => !s)} onNavigate={() => setMobile(false)} />
      {mobile && <button className="sidebar-backdrop" onClick={() => setMobile(false)} aria-label="Close navigation" />}
      <div className="shell-main">
        <Topbar toggle={() => setMobile(s => !s)} onLogout={onLogout} />
        <div className="page-tabs" aria-label="Open pages">
          {tabs.map(path => <div className={`page-tab ${path === location.pathname ? 'selected' : ''}`} key={path}>
              <NavLink to={path}>
                {path === '/dashboard' ? 'Overview' : path.split('/').pop().replaceAll('-', ' ')}
              </NavLink>
              {tabs.length > 1 && <Button type="text" size="small" aria-label={`Close ${path.split('/').pop()} tab`} icon={<CloseOutlined />} onClick={() => {
            const next = tabs.filter(p => p !== path);
            setTabs(next);
            if (path === location.pathname) navigate(next[next.length - 1]);
          }} />}
            </div>)}
        </div>
        <main className={`main-content ${config.layout.contentWidth === 'boxed' ? 'boxed' : ''}`}>
          {(storageError || workspace.storageError) && <Alert className="mb-4" type="warning" showIcon message="Browser storage is unavailable. Changes will last only for this session." />}
          <Suspense fallback={<PageSkeleton />}>
            {children}
          </Suspense>
          <footer className="page-footer">
            <span>{config.brand.name} workspace</span>
            <span>Demo data · No live financial transactions</span>
          </footer>
        </main>
      </div>
    </div>;
}

