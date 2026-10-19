/**
 * ZeroIndex Editorial Theme Configuration
 * Built for Ant Design v5 ConfigProvider & CSS variables
 */

export const pastelThemeTokens = {
  // Brand color palette - Sunlit Editorial Refinement
  creamBg: '#FBF8F2',        // Warm ivory background
  softWhite: '#FFFFFF',      // Primary surface
  sageTint: '#F4F3ED',       // Secondary surface
  sageBorder: '#DDE2DA',     // Soft paper border
  sagePrimary: '#285C49',    // Primary brand green
  sageHover: '#1E4738',      // Interactive green
  sageLight: '#DDEADD',      // Supporting sage accent
  indigoAccent: '#496D91',   // Muted atlas blue accent
  indigoLight: '#E1EAF2',    // Blue tint
  amberBadge: '#C38A63',     // Warm accent
  amberLight: '#F5EBE1',     // Bridge tint
  technicalSlate: '#293B32', // Primary dark text
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
