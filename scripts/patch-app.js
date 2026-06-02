const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'App.js');
let source = fs.readFileSync(appPath, 'utf8');

const newHeader = `import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ArrowLeft,
  BadgeDollarSign,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Dumbbell,
  Heart,
  Home,
  MessageCircle,
  Moon,
  Music2,
  Play,
  Plus,
  Radio,
  Send,
  Share2,
  Sparkles,
  Star,
  Sun,
  Telescope,
  Trophy,
  Users,
  WalletCards,
} from 'lucide-react-native';
import { BRAND, getThemeBundle, LIGHT_COLORS, THEME_STORAGE_KEY } from './theme';

const STORAGE_KEY = '@oleen-mobile-state-v1';

const UIContext = React.createContext(null);

function useUI() {
  const context = React.useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used inside the OLEEN app shell.');
  }
  return context;
}

`;

source = source.replace(/^import React[\s\S]*?from 'lucide-react-native';\r?\n\r?\n/, newHeader);
source = source.replace(
  /const COLORS = \{[\s\S]*?\};\r?\n\r?\n/,
  ''
);
source = source.replace(/COLORS\./g, 'BRAND.');

const skipUseUI = new Set([
  'cloneDefaultState',
  'usePersistentState',
  'renderScreen',
  'openExternal',
  'lessonKey',
  'formatCredits',
  'App',
]);

source = source.replace(/^function (\w+)\(([^)]*)\) \{\n/gm, (match, name, params) => {
  if (skipUseUI.has(name)) {
    return match;
  }
  if (match.includes('useUI()')) {
    return match;
  }
  return `function ${name}(${params}) {\n  const { styles, colors, showToast } = useUI();\n`;
});

const newAppBlock = `export default function App() {
  const insets = useSafeAreaInsets();
  const [activeScreen, setActiveScreen] = useState('home');
  const [state, setState, hydrated] = usePersistentState();
  const [themeName, setThemeName] = useState('light');
  const [themeReady, setThemeReady] = useState(false);
  const [toast, setToast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { colors, styles } = getThemeBundle(themeName);

  useEffect(() => {
    let mounted = true;

    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (mounted && saved === 'dark') {
          setThemeName('dark');
        }
      } catch (error) {
        console.warn('Unable to load theme preference', error);
      } finally {
        if (mounted) {
          setThemeReady(true);
        }
      }
    }

    loadTheme();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message) => {
    setToast(message);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {});
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      return next;
    });
  }, []);

  const navigate = useCallback(
    (screenId) => {
      if (screenId === activeScreen) {
        return;
      }

      Haptics.selectionAsync().catch(() => {});
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 110,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) {
          return;
        }
        setActiveScreen(screenId);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }).start();
      });
    },
    [activeScreen, fadeAnim]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  if (!hydrated || !themeReady) {
    return <LoadingScreen />;
  }

  const title = NAV_ITEMS.find((item) => item.id === activeScreen)?.label ?? 'OLEEN';
  const ui = {
    colors,
    styles,
    themeName,
    toggleTheme,
    showToast,
    navigate,
    activeScreen,
  };

  return (
    <UIContext.Provider value={ui}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style={themeName === 'dark' ? 'light' : 'light'} />
        <View style={styles.shell}>
          <Header title={title} wallet={state.wallet} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.contentWrap}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
          >
            <Animated.View style={[styles.contentWrap, { opacity: fadeAnim }]}>
              <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  activeScreen === 'home' ? (
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} />
                  ) : undefined
                }
              >
                {renderScreen(activeScreen, state, setState, navigate, showToast)}
              </ScrollView>
            </Animated.View>
          </KeyboardAvoidingView>
          <BottomNav active={activeScreen} onChange={navigate} bottomInset={insets.bottom} />
          {toast ? (
            <View style={[styles.toast, { bottom: Math.max(insets.bottom, 12) + 72 }]}>
              <Text style={styles.toastText}>{toast}</Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </UIContext.Provider>
  );
}

function LoadingScreen() {
  const { colors, styles } = getThemeBundle('light');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.loadingScreen}>
        <Image source={require('./assets/icon.png')} style={styles.loadingLogo} />
        <Text style={styles.loadingTitle}>OLEEN</Text>
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={styles.loadingCaption}>Chargement de votre espace...</Text>
      </View>
    </SafeAreaView>
  );
}

`;

source = source.replace(/export default function App\(\) \{[\s\S]*?\n\}\n\nfunction usePersistentState/, `${newAppBlock}function usePersistentState`);

source = source.replace(
  /return \[state, setState\];\n\}/,
  `return [state, setState, hydrated];\n}`
);

source = source.replace(
  /function renderScreen\(activeScreen, state, setState, navigate\) \{\n  const props = \{ state, setState, navigate \};/,
  `function renderScreen(activeScreen, state, setState, navigate, showToast) {\n  const props = { state, setState, navigate, showToast };`
);

const newHeaderFn = `function Header({ title, wallet }) {
  const { styles, colors, themeName, toggleTheme, navigate, activeScreen } = useUI();
  const canGoBack = activeScreen !== 'home';

  return (
    <View style={styles.header}>
      <View style={styles.headerMain}>
        <View style={styles.brandRow}>
          {canGoBack ? (
            <Pressable
              onPress={() => navigate('home')}
              style={({ pressed }) => [styles.headerIconButton, pressed && styles.headerIconButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel="Retour a l accueil"
            >
              <ArrowLeft size={20} color={colors.onDark} />
            </Pressable>
          ) : (
            <Image source={require('./assets/icon.png')} style={styles.headerLogo} />
          )}
          <View style={styles.flex}>
            <Text style={styles.brand}>OLEEN</Text>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerCaption}>
              {canGoBack ? 'Module actif' : 'Bienvenue sur votre application'}
            </Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [styles.headerIconButton, pressed && styles.headerIconButtonPressed]}
            accessibilityRole="button"
            accessibilityLabel={themeName === 'dark' ? 'Activer le theme clair' : 'Activer le theme sombre'}
          >
            {themeName === 'dark' ? <Sun size={18} color={colors.gold} /> : <Moon size={18} color={colors.gold} />}
          </Pressable>
          <View style={styles.walletBadge}>
            <WalletCards size={17} color={colors.gold} />
            <Text style={styles.walletText}>{formatCredits(wallet)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
`;

source = source.replace(/function Header\(\{ title, wallet \}\) \{[\s\S]*?\n\}\n\nfunction BottomNav/, `${newHeaderFn}\nfunction BottomNav`);

const newBottomNav = `function BottomNav({ active, onChange, bottomInset }) {
  const { styles, colors } = useUI();

  return (
    <View style={[styles.navWrap, { paddingBottom: Math.max(bottomInset, 10) }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.nav}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <Pressable
              key={id}
              onPress={() => onChange(id)}
              style={({ pressed }) => [
                styles.navItem,
                isActive && styles.navItemActive,
                pressed && styles.navItemPressed,
              ]}
            >
              <Icon size={20} color={isActive ? colors.ink : colors.muted} />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
              {isActive ? <View style={styles.navActiveDot} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
`;

source = source.replace(/function BottomNav\(\{ active, onChange \}\) \{[\s\S]*?\n\}\n\nfunction HomeScreen/, `${newBottomNav}\nfunction HomeScreen`);

source = source.replace(/color: BRAND\./g, 'color: colors.');
source = source.replace(/color=\{BRAND\./g, 'color={colors.');
source = source.replace(/placeholderTextColor=\{BRAND\./g, 'placeholderTextColor={colors.');

source = source.replace(
  /function HomeScreen\(\{ state, navigate \}\) \{\n  const \{ styles, colors, showToast \} = useUI\(\);\n/,
  `function HomeScreen({ state, navigate }) {\n  const { styles, colors } = useUI();\n`
);

source = source.replace(
  '<Text style={styles.heroTitle}>Tableau de bord OLEEN</Text>\n            <Text style={styles.heroText}>Une demo mobile complete pour presenter les 6 modules du projet.</Text>',
  "<Text style={styles.heroTitle}>{`Bonjour, ${state.profile.name.split(' ')[0]}`}</Text>\n            <Text style={styles.heroText}>Retrouvez sport, astronomie, paris virtuels, solfege, live et reseau social au meme endroit.</Text>"
);

source = source.replace(
  '<Text style={styles.statusTitle}>Projet pret pour la demonstration</Text>\n          <Text style={styles.statusText}>Navigation, interactions locales, credits virtuels et progression sont operationnels.</Text>',
  `<Text style={styles.statusTitle}>Tout est synchronise sur cet appareil</Text>
          <Text style={styles.statusText}>Vos credits, cours, paris et publications sont enregistres localement.</Text>`
);

source = source.replace(
  '<SectionTitle title="Modules obligatoires" subtitle="Tous les blocs du devoir sont presents." />',
  '<SectionTitle title="Explorer" subtitle="Accedez a chaque univers OLEEN." />'
);

source = source.replace(
  `<Text style={styles.cardTitle}>Version demo mobile</Text>\n              <Text style={styles.smallMuted}>Donnees locales, sans serveur et sans argent reel.</Text>`,
  `<Text style={styles.cardTitle}>Application OLEEN</Text>\n              <Text style={styles.smallMuted}>Experience fluide, donnees locales et credits virtuels uniquement.</Text>`
);

source = source.replace(
  'function BettingScreen({ state, setState }) {',
  'function BettingScreen({ state, setState, showToast }) {'
);
source = source.replace(
  /setState\(\(current\) => \(\{\n      \.\.\.current,\n      wallet: Number\(\(current\.wallet - stake\)\.toFixed\(2\)\),\n      bets: \[bet, \.\.\.current\.bets\],\n    \}\)\);\n  \}/,
  `setState((current) => ({
      ...current,
      wallet: Number((current.wallet - stake).toFixed(2)),
      bets: [bet, ...current.bets],
    }));
    showToast('Mise enregistree');
  }`
);

source = source.replace(
  'function SocialScreen({ state, setState }) {',
  'function SocialScreen({ state, setState, showToast }) {'
);
source = source.replace(
  /setState\(\(current\) => \(\{ \.\.\.current, posts: \[post, \.\.\.current\.posts\] \}\)\);\n    setDraft\(''\);/,
  `setState((current) => ({ ...current, posts: [post, ...current.posts] }));
    showToast('Publication envoyee');
    setDraft('');`
);

fs.writeFileSync(appPath, source);
console.log('App.js patched');
