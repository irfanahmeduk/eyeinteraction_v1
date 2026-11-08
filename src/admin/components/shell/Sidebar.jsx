"use client";
import { AppstoreOutlined, BankOutlined, DashboardOutlined, FileProtectOutlined, FileSearchOutlined, GlobalOutlined, LayoutOutlined, LeftOutlined, RightOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Segmented, Tooltip } from 'antd';
import { NavLink, useLocation, useNavigate } from '../../navigation.jsx';
import { useTemplate } from '../../theme/ThemeProvider.jsx';
import { modules } from '../../data/modules.js';
import { MotionSurface } from '../../lib/motion/index.jsx';

export function Brand({ collapsed }) {
  const { config } = useTemplate();
  return <div className="brand"><span className="brand-mark">{config.brand.logoUrl ? <img src={config.brand.logoUrl} alt="" /> : '✳'}</span>{!collapsed && <span className="brand-text"><span className="brand-name">{config.brand.name}</span><span className="brand-edition">workspace</span></span>}</div>;
}

export function Sidebar({ collapsed, toggle, onNavigate }) {
  const { pathname } = useLocation(); const navigate = useNavigate();
  const area = pathname.startsWith('/website') ? 'website' : 'operations';
  const link = (path, label, icon) => <Tooltip key={path} title={collapsed ? label : undefined} placement="right"><NavLink to={path} onClick={onNavigate} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span className="nav-icon">{icon}</span>{!collapsed && <span className="nav-label">{label}</span>}</NavLink></Tooltip>;
  return <MotionSurface className={`sidebar ${collapsed ? 'collapsed' : ''}`}><div className="sidebar-head"><Brand collapsed={collapsed} /></div>
    {!collapsed && <div className="admin-area-switch"><Segmented block value={area} options={[{ label: 'Website', value: 'website' }, { label: 'Operations', value: 'operations' }]} onChange={value => navigate(value === 'website' ? '/website/manage' : '/dashboard')} /></div>}
    <nav aria-label="Main navigation">{area === 'website' ? <><div className="nav-section">Website</div>{link('/website/manage', 'Overview & home', <GlobalOutlined />)}{link('/website/pages', 'Pages', <LayoutOutlined />)}{link('/website/shared', 'Header & footer', <AppstoreOutlined />)}{link('/website/stories', 'Success stories', <TeamOutlined />)}{link('/website/legal', 'Legal pages', <FileProtectOutlined />)}{link('/website/appearance', 'Appearance', <SettingOutlined />)}</> : <><div className="nav-section">Operations</div>{link('/dashboard', 'Overview', <DashboardOutlined />)}{['Inventory', 'Accounting'].map(group => <div key={group}><div className="nav-section">{group}</div>{modules.filter(module => module.group === group).map(module => link(`/${group.toLowerCase()}/${module.key}`, module.title, group === 'Inventory' ? <AppstoreOutlined /> : <BankOutlined />))}</div>)}<div className="nav-section">Organization</div>{link('/system/users', 'Team & access', <TeamOutlined />)}{link('/system/audit-log', 'Audit log', <FileSearchOutlined />)}{link('/settings', 'Settings', <SettingOutlined />)}</>}</nav>
    <div className="sidebar-footer">{!collapsed && <span>{area === 'website' ? <><GlobalOutlined /> Website CMS</> : 'Operations'}</span>}<Button type="text" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} icon={collapsed ? <RightOutlined /> : <LeftOutlined />} onClick={toggle} /></div>
  </MotionSurface>;
}
