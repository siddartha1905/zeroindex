/**
 * ZeroIndex Pastel Theme Configuration
 * Built for Ant Design v5 ConfigProvider & CSS variables
 */

export const pastelThemeTokens = {
  // Brand color palette
  creamBg: '#FAF8F5',        // Warm Alabaster Cream
  softWhite: '#FFFFFF',      // Soft Paper White
  sageTint: '#F2F7F4',       // Pastel Sage Tint
  sageBorder: '#DCE7E1',     // Soft Sage Border
  sagePrimary: '#2E6F40',    // Muted Sage Green primary accent
  sageHover: '#255A34',      // Deep Sage Green
  sageLight: '#E8F2EC',      // Light Sage Background
  indigoAccent: '#4F46E5',   // Soft Indigo secondary accent
  indigoLight: '#EEF2FF',    // Indigo Tint
  amberBadge: '#D97706',     // Warm Amber badges
  amberLight: '#FEF3C7',     // Amber Tint
  technicalSlate: '#1E293B', // High-Contrast Technical Slate
  slateMuted: '#64748B',     // Slate Secondary Text
  slateBorder: '#334155',    // Slate Border
};

export const antdThemeConfig = {
  token: {
    colorPrimary: pastelThemeTokens.sagePrimary,
    colorInfo: pastelThemeTokens.indigoAccent,
    colorWarning: pastelThemeTokens.amberBadge,
    colorBgBase: pastelThemeTokens.softWhite,
    colorTextBase: pastelThemeTokens.technicalSlate,
    borderRadius: 10,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyCode: "'JetBrains Mono', 'Fira Code', monospace",
  },
  components: {
    Button: {
      colorPrimary: pastelThemeTokens.sagePrimary,
      algorithm: true,
      fontWeight: 600,
      borderRadius: 8,
      controlHeight: 38,
    },
    Card: {
      colorBgContainer: pastelThemeTokens.softWhite,
      colorBorderSecondary: pastelThemeTokens.sageBorder,
      borderRadiusLG: 14,
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
