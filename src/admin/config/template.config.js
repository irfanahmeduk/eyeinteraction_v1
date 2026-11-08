/** The only file a project needs to edit to reskin the starter. */

export const templateConfig = {
  brand: {
    name: 'EyeInteraction',
    logoUrl: '/logo.png',
    tagline: 'Your administration, in focus.'
  },
  theme: {
    mode: 'light',
    primaryColor: '#6155d9',
    accentColor: '#149b8b',
    borderRadius: 12,
    algorithm: 'default'
  },
  typography: {
    fontFamily: 'Inter',
    baseFontSize: 'md'
  },
  layout: {
    density: 'comfortable',
    sidebarDefaultCollapsed: false,
    contentWidth: 'full'
  },
  motion: {
    enabled: true,
    respectReducedMotion: true,
    speed: 'normal'
  },
  sound: {
    enabled: false,
    volume: 0.18,
    categories: {
      click: true,
      success: true,
      warning: true,
      notification: true
    }
  },
  table: {
    defaultPageSize: 10,
    hiddenColumns: []
  },
  notifications: {
    inventory: true,
    finance: true,
    security: true
  }
};
export const allowedFonts = ['Inter', 'Manrope', 'Public Sans'];

