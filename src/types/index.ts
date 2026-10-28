export type Fruit = 'Manzanas' | 'Cerezas' | 'Naranjas' | 'Melocotones' | 'Peras';
export type Hemisphere = 'Norte' | 'Sur';
export type Weather = 'Soleado' | 'Nublado' | 'Lluvia' | 'Tormenta' | 'Cerezos en flor' | 'Nieve' | 'Aurora boreal';
export type Rarity = 'Común' | 'Poco Común' | 'Raro' | 'Épico' | 'Legendario';

export interface IslandProfile {
  userId: string;
  playerName: string;
  islandName: string;
  nativeFruit: Fruit;
  hemisphere: Hemisphere;
  birthdayDay: number;
  birthdayMonth: number;
  experience: number;
  activeIconId: string;
  unlockedIconIds: string[];
  totakekeUnlocked: boolean;
  islandRating: number;
  updatedAt?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  title: string;
  weather: Weather;
  rating: number; // 1 to 5 stars
  notes: string;
  specialVisitor?: string;
  turnipBuy?: number;
  turnipSell?: number;
  photoUrl?: string;
  photoCaption?: string;
  createdAt: string;
}

export interface IslandVillager {
  id: string;
  userId: string;
  villagerKey: string;
  name: string;
  species: string;
  personality: string;
  catchphrase: string;
  birthday: string;
  avatarUrl?: string;
  friendshipLevel: number; // 0 to 6 hearts
  talkedToday: boolean;
  giftGivenToday: boolean;
  isFavorite: boolean;
}

export interface StoryTask {
  id: string;
  text: string;
  done: boolean;
}

export interface StoryMilestone {
  id: string;
  userId: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  hint: string;
  tasks: StoryTask[];
  completed: boolean;
  rewardXp: number;
  completedAt?: string;
}

export interface IslandGoal {
  id: string;
  userId: string;
  title: string;
  date: string;
  type: 'meta' | 'evento' | 'visita' | 'cumpleaños';
  completed: boolean;
  xpReward: number;
}

export interface DailyMission {
  id: string;
  userId: string;
  missionKey: string;
  dayKey: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  claimed: boolean;
}

export interface AvatarIcon {
  id: string;
  name: string;
  character: string;
  category: 'character' | 'item' | 'villager' | 'special';
  rarity: Rarity;
  rarityOrder: number; // 1 = Común, 2 = Poco Común, 3 = Raro, 4 = Épico, 5 = Legendario
  priceXp: number;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  description: string;
}

export interface SpecialCalendarEvent {
  id: string;
  title: string;
  dateStr: string; // e.g. "04-12" or "Cada Sábado"
  month?: number;
  day?: number;
  category: 'Torneo' | 'Festividad' | 'Estacional';
  description: string;
}
