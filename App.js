import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
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
  Music2,
  Play,
  Plus,
  Radio,
  Send,
  Share2,
  Sparkles,
  Star,
  Telescope,
  Trophy,
  Users,
  WalletCards,
} from 'lucide-react-native';

const STORAGE_KEY = '@oleen-mobile-state-v1';

const COLORS = {
  bg: '#F7F5EF',
  panel: '#FFFFFF',
  panelSoft: '#FBFAF6',
  ink: '#1F2329',
  muted: '#6D7280',
  line: '#E7E0D2',
  gold: '#C99B2E',
  goldSoft: '#FFF4CE',
  dark: '#2B2F36',
  teal: '#167D7F',
  red: '#B94747',
  green: '#2D7D46',
  blue: '#315D95',
};

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', Icon: Home },
  { id: 'sports', label: 'Sports', Icon: Dumbbell },
  { id: 'astronomy', label: 'Astro', Icon: Telescope },
  { id: 'betting', label: 'Paris', Icon: BadgeDollarSign },
  { id: 'solfege', label: 'Solfege', Icon: BookOpen },
  { id: 'music', label: 'Live', Icon: Music2 },
  { id: 'social', label: 'Social', Icon: Users },
];

const MODULES = [
  {
    id: 'sports',
    title: 'Videos de sports',
    subtitle: 'Selection et agregateur video',
    Icon: Dumbbell,
    color: COLORS.gold,
  },
  {
    id: 'astronomy',
    title: 'Sciences astronomiques',
    subtitle: 'Articles, evenements et quiz',
    Icon: Telescope,
    color: COLORS.blue,
  },
  {
    id: 'betting',
    title: 'Paris sportifs',
    subtitle: 'Mises simulees en credits',
    Icon: BadgeDollarSign,
    color: COLORS.green,
  },
  {
    id: 'solfege',
    title: 'Solfege par instrument',
    subtitle: 'Modules piano, guitare, violon...',
    Icon: BookOpen,
    color: COLORS.teal,
  },
  {
    id: 'music',
    title: 'Videos de musique live',
    subtitle: 'Scene en direct et replay',
    Icon: Radio,
    color: COLORS.red,
  },
  {
    id: 'social',
    title: 'Reseau social',
    subtitle: 'Profil, fil, likes, commentaires',
    Icon: Users,
    color: COLORS.dark,
  },
];

const SPORTS_VIDEOS = [
  {
    id: 'sport-1',
    title: 'Top actions football europeen',
    sport: 'Football',
    source: 'Chaine Sport Focus',
    length: '08:21',
    level: 'Highlights',
    url: 'https://www.youtube.com/results?search_query=football+highlights+europe',
  },
  {
    id: 'sport-2',
    title: 'Analyse tactique basket',
    sport: 'Basketball',
    source: 'Court Vision',
    length: '12:04',
    level: 'Analyse',
    url: 'https://www.youtube.com/results?search_query=basketball+tactical+analysis',
  },
  {
    id: 'sport-3',
    title: 'Preparation mentale tennis',
    sport: 'Tennis',
    source: 'Mental Match',
    length: '09:47',
    level: 'Cours',
    url: 'https://www.youtube.com/results?search_query=tennis+mental+training',
  },
];

const ASTRONOMY_ARTICLES = [
  {
    id: 'astro-1',
    title: 'Les exoplanetes habitables',
    category: 'Education',
    readTime: '5 min',
    body: 'Une exoplanete est une planete situee hors de notre systeme solaire. Les scientifiques cherchent des indices comme la zone habitable, la presence possible d eau liquide et la composition de l atmosphere.',
  },
  {
    id: 'astro-2',
    title: 'Comprendre les trous noirs',
    category: 'Physique',
    readTime: '6 min',
    body: 'Un trou noir est une region de l espace ou la gravite est si forte que meme la lumiere ne peut pas s echapper. On les detecte grace a leurs effets sur les etoiles et la matiere autour.',
  },
  {
    id: 'astro-3',
    title: 'Observer la Lune avec un smartphone',
    category: 'Pratique',
    readTime: '3 min',
    body: 'Pour obtenir une image nette, stabilise le telephone, baisse l exposition et vise une phase ou les craters sont marques par les ombres.',
  },
];

const SKY_EVENTS = [
  { id: 'sky-1', title: 'Lune visible au sud-est', time: '22:10', status: 'Facile' },
  { id: 'sky-2', title: 'Passage possible de satellites', time: '23:35', status: 'Moyen' },
  { id: 'sky-3', title: 'Jupiter basse sur l horizon', time: '05:20', status: 'Difficile' },
];

const MATCHES = [
  {
    id: 'match-1',
    sport: 'Football',
    title: 'Paris Nord vs Marseille Sud',
    date: '28/05/2026',
    outcomes: [
      { id: 'home', label: 'Paris Nord', odds: 1.8 },
      { id: 'draw', label: 'Nul', odds: 3.2 },
      { id: 'away', label: 'Marseille Sud', odds: 2.4 },
    ],
  },
  {
    id: 'match-2',
    sport: 'Basketball',
    title: 'Lyon Stars vs Lille Hoops',
    date: '29/05/2026',
    outcomes: [
      { id: 'home', label: 'Lyon Stars', odds: 1.6 },
      { id: 'away', label: 'Lille Hoops', odds: 2.1 },
    ],
  },
  {
    id: 'match-3',
    sport: 'Tennis',
    title: 'Finale junior open',
    date: '30/05/2026',
    outcomes: [
      { id: 'p1', label: 'Joueur A', odds: 1.9 },
      { id: 'p2', label: 'Joueur B', odds: 1.9 },
    ],
  },
];

const INSTRUMENTS = [
  {
    id: 'piano',
    title: 'Piano',
    color: COLORS.dark,
    lessons: [
      { id: 'p1', title: 'Lire les notes sur la cle de sol', skill: 'Do Re Mi Fa Sol' },
      { id: 'p2', title: 'Jouer une gamme majeure', skill: 'Do majeur' },
      { id: 'p3', title: 'Rythme mains separees', skill: 'Noires et blanches' },
    ],
  },
  {
    id: 'guitare',
    title: 'Guitare',
    color: COLORS.gold,
    lessons: [
      { id: 'g1', title: 'Lire une tablature', skill: 'Cordes et frettes' },
      { id: 'g2', title: 'Accords ouverts', skill: 'Em, C, G, D' },
      { id: 'g3', title: 'Rythme en 4 temps', skill: 'Battement regulier' },
    ],
  },
  {
    id: 'violon',
    title: 'Violon',
    color: COLORS.red,
    lessons: [
      { id: 'v1', title: 'Position des cordes', skill: 'Sol Re La Mi' },
      { id: 'v2', title: 'Premiere lecture melodique', skill: 'Notes longues' },
      { id: 'v3', title: 'Archet et pulsation', skill: 'Tenue du tempo' },
    ],
  },
  {
    id: 'flute',
    title: 'Flute',
    color: COLORS.teal,
    lessons: [
      { id: 'f1', title: 'Respiration et phrases', skill: 'Souffle stable' },
      { id: 'f2', title: 'Notes liees', skill: 'Legato' },
      { id: 'f3', title: 'Lecture simple', skill: 'Melodie courte' },
    ],
  },
  {
    id: 'batterie',
    title: 'Batterie',
    color: COLORS.blue,
    lessons: [
      { id: 'b1', title: 'Pulsation et tempo', skill: '60 a 90 BPM' },
      { id: 'b2', title: 'Rythme rock basique', skill: 'Kick snare hi-hat' },
      { id: 'b3', title: 'Silences et reprises', skill: 'Mesures completes' },
    ],
  },
  {
    id: 'saxophone',
    title: 'Saxophone',
    color: '#7A55A2',
    lessons: [
      { id: 's1', title: 'Embouchure et son', skill: 'Son stable' },
      { id: 's2', title: 'Lecture des notes graves', skill: 'Do Re Mi' },
      { id: 's3', title: 'Phrase jazz simple', skill: 'Syncope' },
    ],
  },
];

const MUSIC_LIVES = [
  {
    id: 'live-1',
    title: 'Session piano neo-classique',
    artist: 'Mila Keys',
    stage: 'Studio A',
    viewers: 1820,
    status: 'LIVE',
    url: 'https://www.youtube.com/results?search_query=live+piano+performance',
  },
  {
    id: 'live-2',
    title: 'Concert guitare acoustique',
    artist: 'Noah Strings',
    stage: 'Scene Campus',
    viewers: 940,
    status: 'LIVE',
    url: 'https://www.youtube.com/results?search_query=live+acoustic+guitar+performance',
  },
  {
    id: 'live-3',
    title: 'Beatmaking en direct',
    artist: 'Ari Loop',
    stage: 'Lab Musique',
    viewers: 2150,
    status: 'REPLAY',
    url: 'https://www.youtube.com/results?search_query=live+beatmaking+performance',
  },
];

const DEFAULT_STATE = {
  wallet: 1000,
  bets: [],
  completedLessons: {},
  likedPosts: {},
  profile: {
    name: 'Eleve OLEEN',
    handle: '@oleen_demo',
    bio: 'Sport, espace, musique et apprentissage.',
  },
  posts: [
    {
      id: 'post-1',
      author: 'Nina Sky',
      handle: '@nina_sky',
      category: 'Astronomie',
      content: 'Ce soir je tente une photo de la Lune avec le mode manuel.',
      likes: 14,
      comments: ['Montre le resultat dans le feed.'],
      shares: 2,
    },
    {
      id: 'post-2',
      author: 'Max Court',
      handle: '@max_sport',
      category: 'Sport',
      content: 'Le module de mise virtuelle aide a comprendre les cotes sans argent reel.',
      likes: 21,
      comments: ['Tres clair pour une demo de classe.'],
      shares: 5,
    },
  ],
};

function cloneDefaultState() {
  return {
    ...DEFAULT_STATE,
    bets: [...DEFAULT_STATE.bets],
    completedLessons: { ...DEFAULT_STATE.completedLessons },
    likedPosts: { ...DEFAULT_STATE.likedPosts },
    profile: { ...DEFAULT_STATE.profile },
    posts: DEFAULT_STATE.posts.map((post) => ({
      ...post,
      comments: [...post.comments],
    })),
  };
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [state, setState] = usePersistentState();

  const title = NAV_ITEMS.find((item) => item.id === activeScreen)?.label ?? 'OLEEN';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.shell}>
        <Header title={title} wallet={state.wallet} />
        <KeyboardAvoidingView
          behavior={undefined}
          style={styles.contentWrap}
        >
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {renderScreen(activeScreen, state, setState, setActiveScreen)}
          </ScrollView>
        </KeyboardAvoidingView>
        <BottomNav active={activeScreen} onChange={setActiveScreen} />
      </View>
    </SafeAreaView>
  );
}

function usePersistentState() {
  const [state, setState] = useState(cloneDefaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadState() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && mounted) {
          const parsed = JSON.parse(stored);
          setState({
            ...cloneDefaultState(),
            ...parsed,
            profile: { ...DEFAULT_STATE.profile, ...parsed.profile },
            posts: Array.isArray(parsed.posts) ? parsed.posts : DEFAULT_STATE.posts,
            bets: Array.isArray(parsed.bets) ? parsed.bets : [],
          });
        }
      } catch (error) {
        console.warn('Unable to load local OLEEN state', error);
      } finally {
        if (mounted) {
          setHydrated(true);
        }
      }
    }

    loadState();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch((error) => {
      console.warn('Unable to save local OLEEN state', error);
    });
  }, [hydrated, state]);

  return [state, setState];
}

function renderScreen(activeScreen, state, setState, navigate) {
  const props = { state, setState, navigate };

  switch (activeScreen) {
    case 'sports':
      return <SportsScreen {...props} />;
    case 'astronomy':
      return <AstronomyScreen {...props} />;
    case 'betting':
      return <BettingScreen {...props} />;
    case 'solfege':
      return <SolfegeScreen {...props} />;
    case 'music':
      return <MusicScreen {...props} />;
    case 'social':
      return <SocialScreen {...props} />;
    default:
      return <HomeScreen {...props} />;
  }
}

function Header({ title, wallet }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>OLEEN</Text>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerCaption}>Prototype mobile - Expo SDK 54</Text>
      </View>
      <View style={styles.walletBadge}>
        <WalletCards size={17} color={COLORS.gold} />
        <Text style={styles.walletText}>{formatCredits(wallet)}</Text>
      </View>
    </View>
  );
}

function BottomNav({ active, onChange }) {
  return (
    <View style={styles.navWrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.nav}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <Pressable
              key={id}
              onPress={() => onChange(id)}
              style={[styles.navItem, isActive && styles.navItemActive]}
            >
              <Icon size={18} color={isActive ? COLORS.ink : COLORS.muted} />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function HomeScreen({ state, navigate }) {
  const completedCount = Object.values(state.completedLessons).filter(Boolean).length;
  const pendingBets = state.bets.filter((bet) => bet.status === 'pending').length;
  const totalLikes = state.posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <View style={styles.stack}>
      <View style={styles.heroPanel}>
        <View style={styles.heroHeader}>
          <View style={styles.logoMark}>
            <Sparkles size={30} color={COLORS.ink} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.heroTitle}>Tableau de bord OLEEN</Text>
            <Text style={styles.heroText}>Une demo mobile complete pour presenter les 6 modules du projet.</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <StatPill label="Credits" value={formatCredits(state.wallet)} />
          <StatPill label="Cours" value={`${completedCount}/18`} />
          <StatPill label="Paris" value={`${pendingBets}`} />
          <StatPill label="Likes" value={`${totalLikes}`} />
        </View>
      </View>

      <View style={styles.statusPanel}>
        <View style={styles.statusIcon}>
          <CheckCircle2 size={22} color={COLORS.green} />
        </View>
        <View style={styles.flex}>
          <Text style={styles.statusTitle}>Projet pret pour la demonstration</Text>
          <Text style={styles.statusText}>Navigation, interactions locales, credits virtuels et progression sont operationnels.</Text>
        </View>
      </View>

      <SectionTitle title="Modules obligatoires" subtitle="Tous les blocs du devoir sont presents." />
      <View style={styles.moduleGrid}>
        {MODULES.map((module) => (
          <ModuleTile key={module.id} module={module} onPress={() => navigate(module.id)} />
        ))}
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <View style={styles.rowSmall}>
            <CheckCircle2 size={22} color={COLORS.green} />
            <View>
              <Text style={styles.cardTitle}>Version demo mobile</Text>
              <Text style={styles.smallMuted}>Donnees locales, sans serveur et sans argent reel.</Text>
            </View>
          </View>
          <Star size={20} color={COLORS.gold} />
        </View>
      </Card>

      <View style={styles.proofGrid}>
        <MiniProof label="Equipe" value="7 roles" />
        <MiniProof label="Mobile" value="Android" />
        <MiniProof label="Build" value="EAS configure" />
      </View>
    </View>
  );
}

function SportsScreen() {
  const [selected, setSelected] = useState(SPORTS_VIDEOS[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.stack}>
      <SectionTitle title="Videos de sports" subtitle="Selection de contenus sportifs a ouvrir ou presenter." />
      <VideoStage item={selected} playing={playing} onToggle={() => setPlaying((value) => !value)} />

      <View style={styles.stackSmall}>
        {SPORTS_VIDEOS.map((video) => (
          <VideoListItem
            key={video.id}
            item={video}
            active={selected.id === video.id}
            onSelect={() => {
              setSelected(video);
              setPlaying(true);
            }}
            onOpen={() => openExternal(video.url)}
          />
        ))}
      </View>
    </View>
  );
}

function AstronomyScreen() {
  const [selectedArticle, setSelectedArticle] = useState(ASTRONOMY_ARTICLES[0]);
  const [quizChoice, setQuizChoice] = useState(null);

  const quizIsRight = quizChoice === 'zone';

  return (
    <View style={styles.stack}>
      <SectionTitle title="Sciences astronomiques" subtitle="Contenus educatifs, observation et quiz." />

      <Card>
        <View style={styles.rowSmall}>
          <Telescope size={24} color={COLORS.blue} />
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>{selectedArticle.title}</Text>
            <Text style={styles.smallMuted}>
              {selectedArticle.category} - {selectedArticle.readTime}
            </Text>
          </View>
        </View>
        <Text style={styles.bodyText}>{selectedArticle.body}</Text>
      </Card>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {ASTRONOMY_ARTICLES.map((article) => (
          <Chip
            key={article.id}
            label={article.title}
            active={selectedArticle.id === article.id}
            onPress={() => setSelectedArticle(article)}
          />
        ))}
      </ScrollView>

      <SectionTitle title="Ciel ce soir" />
      {SKY_EVENTS.map((event) => (
        <Card key={event.id}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.cardTitle}>{event.title}</Text>
              <Text style={styles.smallMuted}>{event.status}</Text>
            </View>
            <View style={styles.timeBadge}>
              <Clock3 size={15} color={COLORS.ink} />
              <Text style={styles.timeText}>{event.time}</Text>
            </View>
          </View>
        </Card>
      ))}

      <Card>
        <Text style={styles.cardTitle}>Quiz rapide</Text>
        <Text style={styles.bodyText}>Quel indice aide a evaluer si une exoplanete pourrait avoir de l eau liquide ?</Text>
        <View style={styles.optionGrid}>
          <ChoiceButton
            label="Sa zone habitable"
            active={quizChoice === 'zone'}
            onPress={() => setQuizChoice('zone')}
          />
          <ChoiceButton
            label="Sa couleur vue depuis la Terre"
            active={quizChoice === 'color'}
            onPress={() => setQuizChoice('color')}
          />
        </View>
        {quizChoice ? (
          <Text style={[styles.feedback, quizIsRight ? styles.feedbackGood : styles.feedbackBad]}>
            {quizIsRight ? 'Bonne reponse.' : 'Pas encore. Cherche le lien avec la temperature.'}
          </Text>
        ) : null}
      </Card>
    </View>
  );
}

function BettingScreen({ state, setState }) {
  const pending = state.bets.filter((bet) => bet.status === 'pending');
  const settled = state.bets.filter((bet) => bet.status !== 'pending');

  function placeBet(match, outcome, amount) {
    const stake = Number(String(amount).replace(',', '.'));

    if (!outcome) {
      Alert.alert('Choix manquant', 'Selectionne une prediction.');
      return;
    }

    if (!Number.isFinite(stake) || stake <= 0) {
      Alert.alert('Mise invalide', 'Entre une mise superieure a 0 credit.');
      return;
    }

    if (stake > state.wallet) {
      Alert.alert('Credits insuffisants', 'Ta mise depasse ton solde virtuel.');
      return;
    }

    const bet = {
      id: `bet-${Date.now()}`,
      matchId: match.id,
      matchTitle: match.title,
      sport: match.sport,
      prediction: outcome.label,
      odds: outcome.odds,
      stake,
      potentialWin: Number((stake * outcome.odds).toFixed(2)),
      status: 'pending',
      date: match.date,
    };

    setState((current) => ({
      ...current,
      wallet: Number((current.wallet - stake).toFixed(2)),
      bets: [bet, ...current.bets],
    }));
  }

  function settleBet(betId, won) {
    setState((current) => {
      let wallet = current.wallet;
      const bets = current.bets.map((bet) => {
        if (bet.id !== betId || bet.status !== 'pending') {
          return bet;
        }
        if (won) {
          wallet += bet.potentialWin;
        }
        return { ...bet, status: won ? 'won' : 'lost' };
      });

      return { ...current, wallet: Number(wallet.toFixed(2)), bets };
    });
  }

  return (
    <View style={styles.stack}>
      <SectionTitle title="Paris sportifs" subtitle="Module de gestion de mises en credits virtuels." />
      <View style={styles.bettingHeader}>
        <View>
          <Text style={styles.balanceLabel}>Solde virtuel</Text>
          <Text style={styles.balance}>{formatCredits(state.wallet)}</Text>
        </View>
        <View style={styles.demoBadge}>
          <Text style={styles.demoBadgeText}>Simulation</Text>
        </View>
      </View>

      <Card>
        <View style={styles.rowSmall}>
          <CheckCircle2 size={22} color={COLORS.green} />
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>Simulation responsable</Text>
            <Text style={styles.smallMuted}>Les mises utilisent uniquement des credits virtuels. Aucun argent reel n'est gere par l'application.</Text>
          </View>
        </View>
      </Card>

      <SectionTitle title="Matchs disponibles" />
      {MATCHES.map((match) => (
        <MatchCard key={match.id} match={match} onPlaceBet={placeBet} />
      ))}

      <SectionTitle title="Tickets en cours" />
      {pending.length ? (
        pending.map((bet) => (
          <BetTicket key={bet.id} bet={bet} onWin={() => settleBet(bet.id, true)} onLose={() => settleBet(bet.id, false)} />
        ))
      ) : (
        <EmptyState text="Aucun ticket actif." />
      )}

      {settled.length ? (
        <>
          <SectionTitle title="Historique" />
          {settled.slice(0, 4).map((bet) => (
            <BetHistory key={bet.id} bet={bet} />
          ))}
        </>
      ) : null}
    </View>
  );
}

function SolfegeScreen({ state, setState }) {
  const [instrumentId, setInstrumentId] = useState(INSTRUMENTS[0].id);
  const [answer, setAnswer] = useState(null);
  const instrument = INSTRUMENTS.find((item) => item.id === instrumentId) ?? INSTRUMENTS[0];
  const completed = instrument.lessons.filter((lesson) => state.completedLessons[lessonKey(instrument.id, lesson.id)]).length;

  function toggleLesson(lesson) {
    const key = lessonKey(instrument.id, lesson.id);
    setState((current) => ({
      ...current,
      completedLessons: {
        ...current.completedLessons,
        [key]: !current.completedLessons[key],
      },
    }));
  }

  return (
    <View style={styles.stack}>
      <SectionTitle title="Apprentissage du solfege" subtitle="Un parcours interactif pour chaque instrument." />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {INSTRUMENTS.map((item) => (
          <Chip key={item.id} label={item.title} active={item.id === instrumentId} onPress={() => setInstrumentId(item.id)} />
        ))}
      </ScrollView>

      <Card>
        <View style={styles.rowBetween}>
          <View style={styles.rowSmall}>
            <View style={[styles.instrumentMark, { backgroundColor: instrument.color }]}>
              <Music2 size={21} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.cardTitle}>{instrument.title}</Text>
              <Text style={styles.smallMuted}>{completed}/{instrument.lessons.length} cours termines</Text>
            </View>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{Math.round((completed / instrument.lessons.length) * 100)}%</Text>
          </View>
        </View>
      </Card>

      {instrument.lessons.map((lesson) => {
        const done = state.completedLessons[lessonKey(instrument.id, lesson.id)];
        return (
          <Card key={lesson.id}>
            <View style={styles.rowBetween}>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{lesson.title}</Text>
                <Text style={styles.smallMuted}>{lesson.skill}</Text>
              </View>
              <Pressable onPress={() => toggleLesson(lesson)} style={[styles.iconAction, done && styles.iconActionDone]}>
                <CheckCircle2 size={22} color={done ? COLORS.green : COLORS.muted} />
              </Pressable>
            </View>
          </Card>
        );
      })}

      <Card>
        <Text style={styles.cardTitle}>Exercice rythme</Text>
        <Text style={styles.bodyText}>Dans une mesure a 4 temps, combien de noires peut-on placer ?</Text>
        <View style={styles.optionGrid}>
          <ChoiceButton label="2" active={answer === '2'} onPress={() => setAnswer('2')} />
          <ChoiceButton label="4" active={answer === '4'} onPress={() => setAnswer('4')} />
          <ChoiceButton label="8" active={answer === '8'} onPress={() => setAnswer('8')} />
        </View>
        {answer ? (
          <Text style={[styles.feedback, answer === '4' ? styles.feedbackGood : styles.feedbackBad]}>
            {answer === '4' ? 'Exact.' : 'Reessaie avec la valeur d une noire.'}
          </Text>
        ) : null}
      </Card>
    </View>
  );
}

function MusicScreen() {
  const [activeLive, setActiveLive] = useState(MUSIC_LIVES[0]);
  const [playing, setPlaying] = useState(true);

  return (
    <View style={styles.stack}>
      <SectionTitle title="Videos de musique live" subtitle="Lecteur de scene et selection de performances." />

      <View style={styles.liveStage}>
        <View style={styles.liveTopLine}>
          <View style={styles.liveDot} />
          <Text style={styles.liveStatus}>{activeLive.status}</Text>
        </View>
        <Text style={styles.liveTitle}>{activeLive.title}</Text>
        <Text style={styles.liveArtist}>{activeLive.artist} - {activeLive.stage}</Text>
        <View style={styles.playerControls}>
          <Pressable style={styles.playButtonLarge} onPress={() => setPlaying((value) => !value)}>
            <Play size={28} color="#FFFFFF" fill="#FFFFFF" />
          </Pressable>
          <View style={styles.flex}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: playing ? '68%' : '36%' }]} />
            </View>
            <Text style={styles.smallMuted}>{playing ? 'Lecture active' : 'Lecture en pause'} - {activeLive.viewers} spectateurs</Text>
          </View>
        </View>
      </View>

      {MUSIC_LIVES.map((live) => (
        <Card key={live.id}>
          <View style={styles.rowBetween}>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{live.title}</Text>
              <Text style={styles.smallMuted}>{live.artist} - {live.viewers} spectateurs</Text>
            </View>
            <Pressable
              onPress={() => {
                setActiveLive(live);
                setPlaying(true);
              }}
              style={[styles.compactButton, activeLive.id === live.id && styles.compactButtonActive]}
            >
              <Radio size={16} color={activeLive.id === live.id ? COLORS.ink : COLORS.muted} />
            </Pressable>
          </View>
          <Pressable style={styles.secondaryButton} onPress={() => openExternal(live.url)}>
            <Text style={styles.secondaryButtonText}>Ouvrir la source</Text>
            <ChevronRight size={16} color={COLORS.ink} />
          </Pressable>
        </Card>
      ))}
    </View>
  );
}

function SocialScreen({ state, setState }) {
  const [draft, setDraft] = useState('');
  const [commentDrafts, setCommentDrafts] = useState({});

  function publishPost() {
    const content = draft.trim();
    if (!content) {
      return;
    }

    const post = {
      id: `post-${Date.now()}`,
      author: state.profile.name,
      handle: state.profile.handle,
      category: 'General',
      content,
      likes: 0,
      comments: [],
      shares: 0,
    };

    setState((current) => ({ ...current, posts: [post, ...current.posts] }));
    setDraft('');
  }

  function toggleLike(postId) {
    setState((current) => {
      const liked = Boolean(current.likedPosts[postId]);
      return {
        ...current,
        likedPosts: { ...current.likedPosts, [postId]: !liked },
        posts: current.posts.map((post) =>
          post.id === postId ? { ...post, likes: Math.max(0, post.likes + (liked ? -1 : 1)) } : post
        ),
      };
    });
  }

  function addComment(postId) {
    const text = (commentDrafts[postId] ?? '').trim();
    if (!text) {
      return;
    }

    setState((current) => ({
      ...current,
      posts: current.posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, text] } : post
      ),
    }));
    setCommentDrafts((current) => ({ ...current, [postId]: '' }));
  }

  function sharePost(postId) {
    setState((current) => ({
      ...current,
      posts: current.posts.map((post) => (post.id === postId ? { ...post, shares: post.shares + 1 } : post)),
    }));
  }

  return (
    <View style={styles.stack}>
      <SectionTitle title="Reseau social" subtitle="Profil utilisateur, fil, likes, commentaires et partages." />

      <Card>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <CircleUserRound size={34} color={COLORS.ink} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>{state.profile.name}</Text>
            <Text style={styles.smallMuted}>{state.profile.handle}</Text>
            <Text style={styles.profileBio}>{state.profile.bio}</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Nouvelle publication</Text>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Partage une video, une note ou une observation..."
          placeholderTextColor={COLORS.muted}
          multiline
          style={styles.postInput}
        />
        <Pressable style={[styles.primaryButton, !draft.trim() && styles.primaryButtonDisabled]} onPress={publishPost}>
          <Plus size={18} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Publier</Text>
        </Pressable>
      </Card>

      {state.posts.map((post) => (
        <Card key={post.id}>
          <View style={styles.rowBetweenTop}>
            <View>
              <Text style={styles.cardTitle}>{post.author}</Text>
              <Text style={styles.smallMuted}>{post.handle} - {post.category}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{post.category}</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>{post.content}</Text>
          <View style={styles.socialActions}>
            <SocialAction
              Icon={Heart}
              label={`${post.likes}`}
              active={Boolean(state.likedPosts[post.id])}
              onPress={() => toggleLike(post.id)}
            />
            <SocialAction Icon={MessageCircle} label={`${post.comments.length}`} onPress={() => {}} />
            <SocialAction Icon={Share2} label={`${post.shares}`} onPress={() => sharePost(post.id)} />
          </View>

          {post.comments.slice(-2).map((comment, index) => (
            <View key={`${post.id}-comment-${index}`} style={styles.commentBubble}>
              <Text style={styles.commentText}>{comment}</Text>
            </View>
          ))}

          <View style={styles.commentForm}>
            <TextInput
              value={commentDrafts[post.id] ?? ''}
              onChangeText={(value) => setCommentDrafts((current) => ({ ...current, [post.id]: value }))}
              placeholder="Commentaire"
              placeholderTextColor={COLORS.muted}
              style={styles.commentInput}
            />
            <Pressable style={styles.sendButton} onPress={() => addComment(post.id)}>
              <Send size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </Card>
      ))}
    </View>
  );
}

function VideoStage({ item, playing, onToggle }) {
  return (
    <View style={styles.videoStage}>
      <View style={styles.videoFrame}>
        <Pressable style={styles.playButtonLarge} onPress={onToggle}>
          <Play size={30} color="#FFFFFF" fill="#FFFFFF" />
        </Pressable>
      </View>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <Text style={styles.videoMeta}>{item.sport} - {item.source} - {item.length}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: playing ? '72%' : '24%' }]} />
      </View>
    </View>
  );
}

function VideoListItem({ item, active, onSelect, onOpen }) {
  return (
    <Card>
      <Pressable onPress={onSelect} style={styles.videoItemBody}>
        <View style={[styles.videoThumb, active && styles.videoThumbActive]}>
          <Play size={22} color="#FFFFFF" fill="#FFFFFF" />
        </View>
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.smallMuted}>{item.sport} - {item.level} - {item.length}</Text>
        </View>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={onOpen}>
        <Text style={styles.secondaryButtonText}>Ouvrir la source</Text>
        <ChevronRight size={16} color={COLORS.ink} />
      </Pressable>
    </Card>
  );
}

function MatchCard({ match, onPlaceBet }) {
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [stake, setStake] = useState('25');
  const potential = selectedOutcome ? Number((Number(stake || 0) * selectedOutcome.odds).toFixed(2)) : 0;

  return (
    <Card>
      <View style={styles.rowBetweenTop}>
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>{match.title}</Text>
          <Text style={styles.smallMuted}>{match.sport} - {match.date}</Text>
        </View>
        <Trophy size={21} color={COLORS.gold} />
      </View>
      <View style={styles.outcomeGrid}>
        {match.outcomes.map((outcome) => (
          <Pressable
            key={outcome.id}
            onPress={() => setSelectedOutcome(outcome)}
            style={[styles.outcomeButton, selectedOutcome?.id === outcome.id && styles.outcomeButtonActive]}
          >
            <Text style={styles.outcomeLabel}>{outcome.label}</Text>
            <Text style={styles.oddsText}>x{outcome.odds}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.betForm}>
        <TextInput
          value={stake}
          onChangeText={setStake}
          keyboardType="decimal-pad"
          style={styles.stakeInput}
          placeholder="Mise"
          placeholderTextColor={COLORS.muted}
        />
        <Pressable style={styles.primaryButton} onPress={() => onPlaceBet(match, selectedOutcome, stake)}>
          <BadgeDollarSign size={18} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Miser</Text>
        </Pressable>
      </View>
      <Text style={styles.smallMuted}>Gain potentiel : {formatCredits(potential)}</Text>
    </Card>
  );
}

function BetTicket({ bet, onWin, onLose }) {
  return (
    <Card>
      <View style={styles.rowBetweenTop}>
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>{bet.matchTitle}</Text>
          <Text style={styles.smallMuted}>{bet.prediction} - cote x{bet.odds}</Text>
        </View>
        <View style={styles.pendingBadge}>
          <Text style={styles.pendingText}>En cours</Text>
        </View>
      </View>
      <View style={styles.ticketNumbers}>
        <StatPill label="Mise" value={formatCredits(bet.stake)} />
        <StatPill label="Gain" value={formatCredits(bet.potentialWin)} />
      </View>
      <View style={styles.dualButtons}>
        <Pressable style={[styles.secondaryButton, styles.flex]} onPress={onLose}>
          <Text style={styles.secondaryButtonText}>Perdu</Text>
        </Pressable>
        <Pressable style={[styles.primaryButton, styles.flex]} onPress={onWin}>
          <CheckCircle2 size={18} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Gagne</Text>
        </Pressable>
      </View>
    </Card>
  );
}

function BetHistory({ bet }) {
  const won = bet.status === 'won';
  return (
    <View style={styles.historyLine}>
      <Text style={styles.historyText}>{bet.matchTitle}</Text>
      <Text style={[styles.historyStatus, won ? styles.feedbackGood : styles.feedbackBad]}>
        {won ? `+${formatCredits(bet.potentialWin)}` : `-${formatCredits(bet.stake)}`}
      </Text>
    </View>
  );
}

function ModuleTile({ module, onPress }) {
  const Icon = module.Icon;
  return (
    <Pressable style={styles.moduleTile} onPress={onPress}>
      <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
        <Icon size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.moduleTitle}>{module.title}</Text>
      <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
    </Pressable>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

function StatPill({ label, value }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MiniProof({ label, value }) {
  return (
    <View style={styles.miniProof}>
      <Text style={styles.miniProofValue}>{value}</Text>
      <Text style={styles.miniProofLabel}>{label}</Text>
    </View>
  );
}

function Chip({ label, active, onPress }) {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function ChoiceButton({ label, active, onPress }) {
  return (
    <Pressable style={[styles.choiceButton, active && styles.choiceButtonActive]} onPress={onPress}>
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SocialAction({ Icon, label, active, onPress }) {
  return (
    <Pressable style={[styles.socialAction, active && styles.socialActionActive]} onPress={onPress}>
      <Icon size={18} color={active ? COLORS.red : COLORS.muted} fill={active ? COLORS.red : 'transparent'} />
      <Text style={[styles.socialActionText, active && styles.socialActionTextActive]}>{label}</Text>
    </Pressable>
  );
}

function EmptyState({ text }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

function openExternal(url) {
  Linking.openURL(url).catch(() => {
    Alert.alert('Lien indisponible', 'Impossible d ouvrir cette source.');
  });
}

function lessonKey(instrumentId, lessonId) {
  return `${instrumentId}:${lessonId}`;
}

function formatCredits(value) {
  const number = Number(value) || 0;
  return `${number.toFixed(number % 1 === 0 ? 0 : 2)} cr`;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  shell: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    minHeight: 86,
    backgroundColor: COLORS.dark,
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  brand: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0,
  },
  headerCaption: {
    color: '#D8D2C5',
    fontSize: 12,
    marginTop: 3,
  },
  walletBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#3A3F48',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  walletText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  contentWrap: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  stack: {
    gap: 14,
  },
  stackSmall: {
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  heroPanel: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoMark: {
    width: 58,
    height: 58,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
  },
  heroText: {
    color: '#D8D2C5',
    marginTop: 5,
    lineHeight: 20,
  },
  statusPanel: {
    backgroundColor: '#EEF8F1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDCC7',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  statusText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statPill: {
    minWidth: 76,
    flexGrow: 1,
    backgroundColor: COLORS.panelSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  statValue: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    gap: 3,
  },
  sectionHeading: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  moduleTile: {
    width: '48%',
    minHeight: 158,
    backgroundColor: COLORS.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 12,
    gap: 10,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
  },
  moduleSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  proofGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  miniProof: {
    flex: 1,
    minHeight: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panel,
    padding: 10,
    justifyContent: 'center',
  },
  miniProofValue: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  miniProofLabel: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 3,
  },
  card: {
    backgroundColor: COLORS.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 14,
    gap: 12,
  },
  rowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowBetweenTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  smallMuted: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  bodyText: {
    color: COLORS.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  videoStage: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 14,
    gap: 10,
  },
  videoFrame: {
    height: 184,
    backgroundColor: '#15181D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3A3F48',
  },
  playButtonLarge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0,
  },
  videoMeta: {
    color: '#D8D2C5',
    fontSize: 13,
  },
  progressBar: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#E8E2D4',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: 8,
  },
  videoItemBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  videoThumb: {
    width: 58,
    height: 58,
    borderRadius: 8,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoThumbActive: {
    backgroundColor: COLORS.gold,
  },
  secondaryButton: {
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  secondaryButtonText: {
    color: COLORS.ink,
    fontWeight: '800',
    fontSize: 14,
  },
  chipRow: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    minHeight: 38,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panel,
  },
  chipActive: {
    backgroundColor: COLORS.goldSoft,
    borderColor: COLORS.gold,
  },
  chipText: {
    color: COLORS.muted,
    fontWeight: '800',
    fontSize: 13,
  },
  chipTextActive: {
    color: COLORS.ink,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.goldSoft,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  timeText: {
    color: COLORS.ink,
    fontWeight: '900',
    fontSize: 12,
  },
  optionGrid: {
    gap: 8,
  },
  choiceButton: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  choiceButtonActive: {
    backgroundColor: COLORS.goldSoft,
    borderColor: COLORS.gold,
  },
  choiceText: {
    color: COLORS.ink,
    fontWeight: '800',
    textAlign: 'center',
  },
  choiceTextActive: {
    color: COLORS.ink,
  },
  feedback: {
    fontSize: 13,
    fontWeight: '900',
  },
  feedbackGood: {
    color: COLORS.green,
  },
  feedbackBad: {
    color: COLORS.red,
  },
  bettingHeader: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#D8D2C5',
    fontSize: 13,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
  },
  demoBadge: {
    backgroundColor: COLORS.gold,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  demoBadgeText: {
    color: COLORS.ink,
    fontWeight: '900',
  },
  outcomeGrid: {
    gap: 8,
  },
  outcomeButton: {
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  outcomeButtonActive: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.goldSoft,
  },
  outcomeLabel: {
    color: COLORS.ink,
    fontWeight: '800',
    flex: 1,
  },
  oddsText: {
    color: COLORS.green,
    fontWeight: '900',
  },
  betForm: {
    flexDirection: 'row',
    gap: 8,
  },
  stakeInput: {
    flex: 1,
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    color: COLORS.ink,
    paddingHorizontal: 12,
    fontWeight: '900',
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: 8,
    backgroundColor: COLORS.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  pendingBadge: {
    borderRadius: 8,
    backgroundColor: COLORS.goldSoft,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  pendingText: {
    color: COLORS.ink,
    fontWeight: '900',
    fontSize: 12,
  },
  ticketNumbers: {
    flexDirection: 'row',
    gap: 8,
  },
  dualButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  historyLine: {
    backgroundColor: COLORS.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  historyText: {
    color: COLORS.ink,
    fontWeight: '800',
    flex: 1,
  },
  historyStatus: {
    fontWeight: '900',
  },
  emptyState: {
    minHeight: 68,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelSoft,
  },
  emptyText: {
    color: COLORS.muted,
    fontWeight: '800',
  },
  instrumentMark: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: COLORS.ink,
    fontWeight: '900',
    fontSize: 13,
  },
  iconAction: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelSoft,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  iconActionDone: {
    backgroundColor: '#EAF6EE',
    borderColor: COLORS.green,
  },
  liveStage: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    minHeight: 230,
    padding: 16,
    justifyContent: 'space-between',
    gap: 16,
  },
  liveTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.red,
  },
  liveStatus: {
    color: COLORS.red,
    fontWeight: '900',
    fontSize: 13,
  },
  liveTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 32,
  },
  liveArtist: {
    color: '#D8D2C5',
    fontSize: 15,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compactButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelSoft,
  },
  compactButtonActive: {
    backgroundColor: COLORS.goldSoft,
    borderColor: COLORS.gold,
  },
  profileRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBio: {
    color: COLORS.ink,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  postInput: {
    minHeight: 92,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    color: COLORS.ink,
    padding: 12,
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  categoryBadge: {
    backgroundColor: COLORS.goldSoft,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  categoryBadgeText: {
    color: COLORS.ink,
    fontWeight: '900',
    fontSize: 12,
  },
  socialActions: {
    flexDirection: 'row',
    gap: 8,
  },
  socialAction: {
    minHeight: 38,
    minWidth: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 9,
  },
  socialActionActive: {
    borderColor: '#E8B6B6',
    backgroundColor: '#FFF0F0',
  },
  socialActionText: {
    color: COLORS.muted,
    fontWeight: '900',
  },
  socialActionTextActive: {
    color: COLORS.red,
  },
  commentBubble: {
    backgroundColor: COLORS.panelSoft,
    borderRadius: 8,
    padding: 10,
  },
  commentText: {
    color: COLORS.ink,
    fontSize: 13,
    lineHeight: 18,
  },
  commentForm: {
    flexDirection: 'row',
    gap: 8,
  },
  commentInput: {
    flex: 1,
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    color: COLORS.ink,
    paddingHorizontal: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ink,
  },
  navWrap: {
    backgroundColor: COLORS.panel,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  nav: {
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  navItem: {
    minWidth: 76,
    minHeight: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 8,
  },
  navItemActive: {
    backgroundColor: COLORS.goldSoft,
  },
  navLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  navLabelActive: {
    color: COLORS.ink,
  },
});
