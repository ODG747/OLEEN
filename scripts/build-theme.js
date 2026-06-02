const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'App.js');
const src = fs.readFileSync(appPath, 'utf8');
const start = src.indexOf('const styles = StyleSheet.create({');
const end = src.lastIndexOf('});');
let body = src.slice(start + 'const styles = StyleSheet.create({'.length, end);

const replacements = [
  [/COLORS\./g, 'c.'],
  [/backgroundColor: '#EEF8F1'/g, 'backgroundColor: c.successBg'],
  [/borderColor: '#BFDCC7'/g, 'borderColor: c.successBorder'],
  [
    /backgroundColor: '#FFFFFF',\r?\n    alignItems: 'center',\r?\n    justifyContent: 'center',\r?\n  },\r?\n  statusTitle/,
    "backgroundColor: c.panel,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  statusTitle",
  ],
  [/backgroundColor: '#15181D'/g, 'backgroundColor: c.stageBg'],
  [/borderColor: '#3A3F48'/g, 'borderColor: c.stageBorder'],
  [/color: '#FFFFFF'/g, 'color: c.onDark'],
  [/color: '#D8D2C5'/g, 'color: c.onDarkMuted'],
  [/backgroundColor: '#E8E2D4'/g, 'backgroundColor: c.progressTrack'],
  [/backgroundColor: '#EAF6EE'/g, 'backgroundColor: c.successSoft'],
  [/borderColor: '#E8B6B6'/g, 'borderColor: c.dangerSoftBorder'],
  [/backgroundColor: '#FFF0F0'/g, 'backgroundColor: c.dangerSoftBg'],
  [/backgroundColor: '#3A3F48'/g, 'backgroundColor: c.walletBadge'],
  [/backgroundColor: COLORS\.ink/g, 'backgroundColor: c.primaryBtn'],
];

for (const [pattern, replacement] of replacements) {
  body = body.replace(pattern, replacement);
}

body = body.replace(
  /primaryButtonText: \{\r?\n    color: c\.onDark,/,
  'primaryButtonText: {\n    color: c.primaryBtnText,'
);

const header = `import { StyleSheet } from 'react-native';

export const THEME_STORAGE_KEY = '@oleen-theme-preference-v1';

export const BRAND = {
  gold: '#C99B2E',
  blue: '#315D95',
  green: '#2D7D46',
  teal: '#167D7F',
  red: '#B94747',
  dark: '#2B2F36',
  purple: '#7A55A2',
};

export const LIGHT_COLORS = {
  gold: '#C99B2E',
  teal: '#167D7F',
  red: '#B94747',
  green: '#2D7D46',
  blue: '#315D95',
  bg: '#F7F5EF',
  panel: '#FFFFFF',
  panelSoft: '#FBFAF6',
  ink: '#1F2329',
  muted: '#6D7280',
  line: '#E7E0D2',
  goldSoft: '#FFF4CE',
  dark: '#2B2F36',
  onDark: '#FFFFFF',
  onDarkMuted: '#D8D2C5',
  walletBadge: '#3A3F48',
  stageBg: '#15181D',
  stageBorder: '#3A3F48',
  progressTrack: '#E8E2D4',
  successBg: '#EEF8F1',
  successBorder: '#BFDCC7',
  successSoft: '#EAF6EE',
  dangerSoftBg: '#FFF0F0',
  dangerSoftBorder: '#E8B6B6',
  primaryBtn: '#1F2329',
  primaryBtnText: '#FFFFFF',
};

export const DARK_COLORS = {
  gold: '#D4AB3F',
  teal: '#167D7F',
  red: '#E05C5C',
  green: '#3D9A57',
  blue: '#4A7FC4',
  bg: '#12151A',
  panel: '#1C2129',
  panelSoft: '#171B22',
  ink: '#F2EFE6',
  muted: '#A8ADB8',
  line: '#2E3540',
  goldSoft: '#3A3220',
  dark: '#0A0C0F',
  onDark: '#FFFFFF',
  onDarkMuted: '#C8C2B6',
  walletBadge: '#2A3039',
  stageBg: '#0A0C0F',
  stageBorder: '#2E3540',
  progressTrack: '#2E3540',
  successBg: '#1A2B22',
  successBorder: '#2D5C40',
  successSoft: '#1A2B22',
  dangerSoftBg: '#3A2222',
  dangerSoftBorder: '#6A4040',
  primaryBtn: '#D4AB3F',
  primaryBtnText: '#1F2329',
};

export function createStyles(c) {
  return StyleSheet.create({
`;

const footer = `
  });
}

export const lightStyles = createStyles(LIGHT_COLORS);
export const darkStyles = createStyles(DARK_COLORS);

export function getThemeBundle(themeName) {
  return themeName === 'dark'
    ? { colors: DARK_COLORS, styles: darkStyles }
    : { colors: LIGHT_COLORS, styles: lightStyles };
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'theme.js'), header + body + footer);
console.log('theme.js generated');
