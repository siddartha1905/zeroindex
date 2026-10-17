/**
 * ZeroIndex Editorial Theme Configuration
 * Built for Ant Design v5 ConfigProvider & CSS variables
 */

export const pastelThemeTokens = {
  // Brand color palette (Part 4)
  creamBg: '#F7F5EF',        // Main paper background
  softWhite: '#FFFFFF',      // Primary surface
  sageTint: '#F0F1EB',       // Secondary surface
  sageBorder: '#DDE2DA',     // Soft paper border
  sagePrimary: '#245B4B',    // Primary brand green
  sageHover: '#28755E',      // Interactive green
  sageLight: '#E0EBDF',      // Light workbench accent
  indigoAccent: '#496D91',   // Muted atlas blue accent
  indigoLight: '#E1EAF2',    // Blue tint
  amberBadge: '#B77B59',     // Warm accent
  amberLight: '#F1E5D9',     // Bridge tint
  technicalSlate: '#25352D', // Primary ink
  slateMuted: '#5F6C64',     // Secondary text
  slateBorder: '#DDE2DA',    // Border
};

export const antdThemeConfig = {
  token: {
    colorPrimary: pastelThemeTokens.sagePrimary,
    colorInfo: pastelThemeTokens.indigoAccent,
    colorWarning: pastelThemeTokens.amberBadge,
    colorBgBase: pastelThemeTokens.softWhite,
    colorTextBase: pastelThemeTokens.technicalSlate,
    borderRadius: 12,
    fontFamily: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyCode: "'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', monospace",
  },
  components: {
    Button: {
      colorPrimary: pastelThemeTokens.sagePrimary,
      algorithm: true,
      fontWeight: 600,
      borderRadius: 10,
      controlHeight: 40,
    },
    Card: {
      colorBgContainer: pastelThemeTokens.softWhite,
      colorBorderSecondary: pastelThemeTokens.sageBorder,
      borderRadiusLG: 16,
    },
    Tag: {
      borderRadiusSM: 6,
      fontSize: 12,
    },
    Tabs: {
      colorPrimary: pastelThemeTokens.sagePrimary,
      itemSelectedColor: pastelThemeTokens.sagePrimary,
      itemHoverColor: pastelThemeTokens.sageHover,
    },
    Collapse: {
      colorBgContainer: pastelThemeTokens.softWhite,
      colorBorder: pastelThemeTokens.sageBorder,
    },
    Badge: {
      colorError: pastelThemeTokens.amberBadge,
    }
  },
};
