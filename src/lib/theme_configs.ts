export interface ThemeConfig {
  id: string;
  name: string;
  layout_id: 'classic' | 'sidebar' | 'single-page';
  palette: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
  };
}

// Generate 27 dummy themes
export const THEME_CONFIGS: ThemeConfig[] = Array.from({ length: 27 }, (_, i) => {
  const layouts: ('classic' | 'sidebar' | 'single-page')[] = ['classic', 'sidebar', 'single-page'];
  return {
    id: `theme-${i + 1}`,
    name: `Theme Variant ${i + 1}`,
    layout_id: layouts[i % 3],
    palette: {
      primary: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
      secondary: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
      background: i % 2 === 0 ? '#ffffff' : '#111111',
      text: i % 2 === 0 ? '#111111' : '#ffffff',
      accent: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
    },
    typography: {
      fontFamily: i % 2 === 0 ? 'Inter, sans-serif' : 'Merriweather, serif',
    }
  };
});
