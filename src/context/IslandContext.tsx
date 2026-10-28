import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User } from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { 
  db, 
  auth, 
  onAuthStateChanged, 
  loginWithGoogle as fbLoginWithGoogle,
  loginAsGuest as fbLoginAsGuest,
  logoutUser as fbLogoutUser,
  handleFirestoreError,
  OperationType 
} from '../lib/firebase';
import { 
  IslandProfile, 
  JournalEntry, 
  IslandVillager, 
  StoryMilestone, 
  IslandGoal, 
  DailyMission,
  AvatarIcon 
} from '../types';
import { 
  DEFAULT_PROFILE, 
  INITIAL_STORY_STEPS, 
  AVATAR_ICONS, 
  DAILY_MISSION_TEMPLATES, 
  POPULAR_VILLAGERS_DB 
} from '../data/acnhData';

interface IslandContextType {
  user: User | null;
  isAuthReady: boolean;
  isCloudSynced: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  
  // Profile & EXP
  profile: IslandProfile;
  updateProfile: (updates: Partial<IslandProfile>) => Promise<void>;
  addExperience: (amount: number, reason?: string) => Promise<void>;
  
  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  
  // Villagers
  villagers: IslandVillager[];
  addVillager: (villager: Omit<IslandVillager, 'id' | 'userId'>) => Promise<void>;
  updateVillager: (id: string, updates: Partial<IslandVillager>) => Promise<void>;
  removeVillager: (id: string) => Promise<void>;
  
  // Story (Totakeke Road)
  storyMilestones: StoryMilestone[];
  toggleStoryTask: (milestoneId: string, taskId: string) => Promise<void>;
  completedStoryMilestonesCount: number;
  storyProgressPercent: number;
  showConcertModal: boolean;
  setShowConcertModal: (show: boolean) => void;
  
  // Calendar & Goals
  goals: IslandGoal[];
  addGoal: (goal: Omit<IslandGoal, 'id' | 'userId'>) => Promise<void>;
  toggleGoal: (id: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  
  // Daily Missions
  dailyMissions: DailyMission[];
  toggleMission: (id: string) => Promise<void>;
  claimMission: (id: string) => Promise<void>;
  
  // Shop & Avatars
  avatarIcons: AvatarIcon[];
  activeAvatar: AvatarIcon;
  buyAvatarIcon: (icon: AvatarIcon) => Promise<boolean>;
  equipAvatarIcon: (iconId: string) => Promise<void>;
  
  // Birthday Alert
  isBirthdayToday: boolean;
  daysUntilBirthday: number;
}

const IslandContext = createContext<IslandContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'acnh_diary_';

function getTodayDayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const IslandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [showConcertModal, setShowConcertModal] = useState(false);

  // Core State
  const [profile, setProfile] = useState<IslandProfile>(() => {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}profile`);
    return cached ? JSON.parse(cached) : DEFAULT_PROFILE;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}journal`);
    if (cached) return JSON.parse(cached);
    // Initial sample entry for charming first impression
    return [
      {
        id: 'init-1',
        userId: 'local',
        date: getTodayDayKey(),
        title: '¡Primer día en la Isla!',
        weather: 'Soleado',
        rating: 2,
        notes: 'Tom Nook nos ha entregado las tiendas de campaña. El sonido del mar y las olas es maravilloso. He recolectado algunas ramas, cerezas y pescado una lubina en el muelle de madera. ¡Empieza la aventura!',
        specialVisitor: 'Tom Nook',
        turnipBuy: 98,
        turnipSell: 112,
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [villagers, setVillagers] = useState<IslandVillager[]>(() => {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}villagers`);
    if (cached) return JSON.parse(cached);
    // Initial 2 pioneer villagers
    return [
      {
        id: 'v-1',
        userId: 'local',
        villagerKey: 'fauna',
        name: 'Fauna',
        species: 'Ciervo',
        personality: 'Normal',
        catchphrase: 'bambi',
        birthday: '26 de Marzo',
        avatarUrl: '🦌',
        friendshipLevel: 3,
        talkedToday: false,
        giftGivenToday: false,
        isFavorite: true
      },
      {
        id: 'v-2',
        userId: 'local',
        villagerKey: 'roald',
        name: 'Reinaldo (Roald)',
        species: 'Pingüino',
        personality: 'Atlético',
        catchphrase: 'brr',
        birthday: '5 de Enero',
        avatarUrl: '🐧',
        friendshipLevel: 2,
        talkedToday: false,
        giftGivenToday: false,
        isFavorite: false
      }
    ];
  });

  const [storyMilestones, setStoryMilestones] = useState<StoryMilestone[]>(() => {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}story`);
    if (cached) return JSON.parse(cached);
    return INITIAL_STORY_STEPS.map((s, idx) => ({
      ...s,
      id: `story-${idx + 1}`,
      userId: 'local'
    }));
  });

  const [goals, setGoals] = useState<IslandGoal[]>(() => {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}goals`);
    if (cached) return JSON.parse(cached);
    return [
      {
        id: 'g-1',
        userId: 'local',
        title: 'Pagar préstamo inicial de 98,000 bayas a Tom Nook',
        date: getTodayDayKey(),
        type: 'meta',
        completed: false,
        xpReward: 150
      },
      {
        id: 'g-2',
        userId: 'local',
        title: 'Comprobar precio matutino y vespertino del nabo en Mini Nook',
        date: getTodayDayKey(),
        type: 'meta',
        completed: true,
        xpReward: 80
      },
      {
        id: 'g-3',
        userId: 'local',
        title: 'Comprar una receta de bricolaje con Millas Nook',
        date: getTodayDayKey(),
        type: 'meta',
        completed: false,
        xpReward: 100
      }
    ];
  });

  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(() => {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}daily`);
    const today = getTodayDayKey();
    if (cached) {
      const parsed: DailyMission[] = JSON.parse(cached);
      if (parsed.length > 0 && parsed[0].dayKey === today) {
        return parsed;
      }
    }
    // Generate for today
    return DAILY_MISSION_TEMPLATES.map((tmpl, idx) => ({
      id: `dm-${today}-${idx}`,
      userId: 'local',
      missionKey: tmpl.missionKey,
      dayKey: today,
      title: tmpl.title,
      description: tmpl.description,
      xpReward: tmpl.xpReward,
      completed: false,
      claimed: false
    }));
  });

  // Local Storage Save Effects
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}journal`, JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}villagers`, JSON.stringify(villagers));
  }, [villagers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}story`, JSON.stringify(storyMilestones));
  }, [storyMilestones]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}goals`, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}daily`, JSON.stringify(dailyMissions));
  }, [dailyMissions]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      if (currentUser) {
        setIsCloudSynced(true);
      } else {
        setIsCloudSynced(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Cloud Firestore Sync Listeners (When User is authenticated)
  useEffect(() => {
    if (!user) return;

    const currentUid = user.uid;

    // 1. Listen to Island Profile
    const profileDocRef = doc(db, 'island_profiles', currentUid);
    const unsubProfile = onSnapshot(profileDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as IslandProfile;
        setProfile(data);
      } else {
        // First cloud sign-in: upload current local profile to cloud
        const initialCloudProfile: IslandProfile = {
          ...profile,
          userId: currentUid,
          updatedAt: new Date().toISOString()
        };
        setDoc(profileDocRef, initialCloudProfile).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, `island_profiles/${currentUid}`);
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `island_profiles/${currentUid}`);
    });

    // 2. Listen to Journal Entries
    const journalQ = query(collection(db, 'journal_entries'), where('userId', '==', currentUid));
    const unsubJournal = onSnapshot(journalQ, (snap) => {
      if (!snap.empty) {
        const entries = snap.docs.map(d => ({ ...d.data(), id: d.id } as JournalEntry));
        entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setJournalEntries(entries);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'journal_entries');
    });

    // 3. Listen to Villagers
    const villagersQ = query(collection(db, 'villagers'), where('userId', '==', currentUid));
    const unsubVillagers = onSnapshot(villagersQ, (snap) => {
      if (!snap.empty) {
        const vList = snap.docs.map(d => ({ ...d.data(), id: d.id } as IslandVillager));
        setVillagers(vList);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'villagers');
    });

    // 4. Listen to Story Milestones
    const storyQ = query(collection(db, 'story_milestones'), where('userId', '==', currentUid));
    const unsubStory = onSnapshot(storyQ, (snap) => {
      if (!snap.empty) {
        const sList = snap.docs.map(d => ({ ...d.data(), id: d.id } as StoryMilestone));
        sList.sort((a, b) => a.stepNumber - b.stepNumber);
        setStoryMilestones(sList);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'story_milestones');
    });

    // 5. Listen to Goals
    const goalsQ = query(collection(db, 'island_goals'), where('userId', '==', currentUid));
    const unsubGoals = onSnapshot(goalsQ, (snap) => {
      if (!snap.empty) {
        const gList = snap.docs.map(d => ({ ...d.data(), id: d.id } as IslandGoal));
        setGoals(gList);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'island_goals');
    });

    // 6. Listen to Daily Missions
    const today = getTodayDayKey();
    const missionsQ = query(
      collection(db, 'daily_missions'), 
      where('userId', '==', currentUid)
    );
    const unsubMissions = onSnapshot(missionsQ, (snap) => {
      if (!snap.empty) {
        const mList = snap.docs
          .map(d => ({ ...d.data(), id: d.id } as DailyMission))
          .filter(m => m.dayKey === today);
        if (mList.length > 0) {
          setDailyMissions(mList);
        }
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'daily_missions');
    });

    return () => {
      unsubProfile();
      unsubJournal();
      unsubVillagers();
      unsubStory();
      unsubGoals();
      unsubMissions();
    };
  }, [user]);

  // Auth Functions
  const loginWithGoogle = async () => {
    try {
      await fbLoginWithGoogle();
      setIsCloudSynced(true);
    } catch (err) {
      console.error('Google Sign-in failed:', err);
      throw err;
    }
  };

  const loginAsGuest = async () => {
    try {
      await fbLoginAsGuest();
      setIsCloudSynced(true);
    } catch (err) {
      console.warn('Guest auth failed, continuing in offline mode:', err);
    }
  };

  const logout = async () => {
    await fbLogoutUser();
    setIsCloudSynced(false);
  };

  // Profile and EXP
  const updateProfile = async (updates: Partial<IslandProfile>) => {
    const updated: IslandProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setProfile(updated);

    if (user) {
      const docRef = doc(db, 'island_profiles', user.uid);
      try {
        await setDoc(docRef, { ...updated, userId: user.uid }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `island_profiles/${user.uid}`);
      }
    }
  };

  const addExperience = async (amount: number, reason?: string) => {
    const newExp = (profile.experience || 0) + amount;
    await updateProfile({ experience: newExp });
    
    // Confetti celebration effect
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#81c784', '#ffb74d', '#4fc3f7', '#ba68c8']
    });
  };

  // Journal
  const addJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'userId' | 'createdAt'>) => {
    const entryId = `entry-${Date.now()}`;
    const newEntry: JournalEntry = {
      ...entry,
      id: entryId,
      userId: user ? user.uid : 'local',
      createdAt: new Date().toISOString()
    };

    setJournalEntries(prev => [newEntry, ...prev]);

    if (user) {
      const docRef = doc(db, 'journal_entries', entryId);
      try {
        await setDoc(docRef, newEntry);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `journal_entries/${entryId}`);
      }
    }

    // Award EXP for writing in island diary
    await addExperience(50, 'Página del diario escrita');
  };

  const deleteJournalEntry = async (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
    if (user) {
      const docRef = doc(db, 'journal_entries', id);
      try {
        await deleteDoc(docRef);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `journal_entries/${id}`);
      }
    }
  };

  // Villagers
  const addVillager = async (villager: Omit<IslandVillager, 'id' | 'userId'>) => {
    const villagerId = `v-${Date.now()}`;
    const newV: IslandVillager = {
      ...villager,
      id: villagerId,
      userId: user ? user.uid : 'local'
    };

    setVillagers(prev => [...prev, newV]);

    if (user) {
      const docRef = doc(db, 'villagers', villagerId);
      try {
        await setDoc(docRef, newV);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `villagers/${villagerId}`);
      }
    }
  };

  const updateVillager = async (id: string, updates: Partial<IslandVillager>) => {
    setVillagers(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));

    if (user) {
      const docRef = doc(db, 'villagers', id);
      try {
        await setDoc(docRef, updates, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `villagers/${id}`);
      }
    }
  };

  const removeVillager = async (id: string) => {
    setVillagers(prev => prev.filter(v => v.id !== id));
    if (user) {
      const docRef = doc(db, 'villagers', id);
      try {
        await deleteDoc(docRef);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `villagers/${id}`);
      }
    }
  };

  // Story Progression (Path to Totakeke)
  const toggleStoryTask = async (milestoneId: string, taskId: string) => {
    let milestoneCompletedNow = false;
    let earnedXp = 0;
    let isLastMilestone = false;

    const updated = storyMilestones.map(m => {
      if (m.id !== milestoneId) return m;

      const newTasks = m.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      const allDone = newTasks.every(t => t.done);
      const wasCompleted = m.completed;

      if (allDone && !wasCompleted) {
        milestoneCompletedNow = true;
        earnedXp = m.rewardXp;
        if (m.stepNumber === 10) {
          isLastMilestone = true;
        }
      }

      return {
        ...m,
        tasks: newTasks,
        completed: allDone,
        completedAt: allDone ? (m.completedAt || new Date().toISOString()) : undefined
      };
    });

    setStoryMilestones(updated);

    const changedMilestone = updated.find(m => m.id === milestoneId);
    if (user && changedMilestone) {
      const docRef = doc(db, 'story_milestones', milestoneId);
      try {
        await setDoc(docRef, { ...changedMilestone, userId: user.uid }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `story_milestones/${milestoneId}`);
      }
    }

    if (milestoneCompletedNow) {
      await addExperience(earnedXp, 'Hito de la historia completado');
      
      if (isLastMilestone) {
        setShowConcertModal(true);
        await updateProfile({ totakekeUnlocked: true, islandRating: 3 });
        // Massive grand finale celebration confetti
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#ffeb3b', '#4caf50', '#03a9f4', '#e91e63', '#ff9800']
        });
      }
    }
  };

  // Calendar Goals
  const addGoal = async (goal: Omit<IslandGoal, 'id' | 'userId'>) => {
    const goalId = `goal-${Date.now()}`;
    const newG: IslandGoal = {
      ...goal,
      id: goalId,
      userId: user ? user.uid : 'local'
    };

    setGoals(prev => [newG, ...prev]);

    if (user) {
      const docRef = doc(db, 'island_goals', goalId);
      try {
        await setDoc(docRef, newG);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `island_goals/${goalId}`);
      }
    }
  };

  const toggleGoal = async (id: string) => {
    let newlyDone = false;
    let reward = 0;

    const updated = goals.map(g => {
      if (g.id !== id) return g;
      const nextDone = !g.completed;
      if (nextDone) {
        newlyDone = true;
        reward = g.xpReward || 50;
      }
      return { ...g, completed: nextDone };
    });

    setGoals(updated);

    const targetGoal = updated.find(g => g.id === id);
    if (user && targetGoal) {
      const docRef = doc(db, 'island_goals', id);
      try {
        await setDoc(docRef, { completed: targetGoal.completed }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `island_goals/${id}`);
      }
    }

    if (newlyDone && reward > 0) {
      await addExperience(reward, 'Meta del día completada');
    }
  };

  const deleteGoal = async (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    if (user) {
      const docRef = doc(db, 'island_goals', id);
      try {
        await deleteDoc(docRef);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `island_goals/${id}`);
      }
    }
  };

  // Daily Missions
  const toggleMission = async (id: string) => {
    const updated = dailyMissions.map(m => {
      if (m.id !== id) return m;
      return { ...m, completed: !m.completed };
    });
    setDailyMissions(updated);

    const targetM = updated.find(m => m.id === id);
    if (user && targetM) {
      const docRef = doc(db, 'daily_missions', id);
      try {
        await setDoc(docRef, { ...targetM, userId: user.uid }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `daily_missions/${id}`);
      }
    }
  };

  const claimMission = async (id: string) => {
    const target = dailyMissions.find(m => m.id === id);
    if (!target || !target.completed || target.claimed) return;

    const updated = dailyMissions.map(m => m.id === id ? { ...m, claimed: true } : m);
    setDailyMissions(updated);

    if (user) {
      const docRef = doc(db, 'daily_missions', id);
      try {
        await setDoc(docRef, { claimed: true }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `daily_missions/${id}`);
      }
    }

    await addExperience(target.xpReward, 'Recompensa de misión diaria');
  };

  // Avatar Shop
  const avatarIcons = useMemo(() => {
    // Sort from lowest rarity to highest rarity as requested:
    // "segun el costo de experiencia el icono es mas raro y muestra una lista de rareza de menor a mayor."
    return [...AVATAR_ICONS].sort((a, b) => {
      if (a.rarityOrder !== b.rarityOrder) {
        return a.rarityOrder - b.rarityOrder;
      }
      return a.priceXp - b.priceXp;
    });
  }, []);

  const activeAvatar = useMemo(() => {
    const found = AVATAR_ICONS.find(i => i.id === profile.activeIconId);
    return found || AVATAR_ICONS[0];
  }, [profile.activeIconId]);

  const buyAvatarIcon = async (icon: AvatarIcon): Promise<boolean> => {
    if ((profile.experience || 0) < icon.priceXp) {
      return false;
    }

    if (profile.unlockedIconIds.includes(icon.id)) {
      // Already unlocked, simply equip
      await updateProfile({ activeIconId: icon.id });
      return true;
    }

    const newExp = profile.experience - icon.priceXp;
    const newUnlocked = [...profile.unlockedIconIds, icon.id];
    
    await updateProfile({
      experience: newExp,
      unlockedIconIds: newUnlocked,
      activeIconId: icon.id
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    return true;
  };

  const equipAvatarIcon = async (iconId: string) => {
    if (profile.unlockedIconIds.includes(iconId)) {
      await updateProfile({ activeIconId: iconId });
    }
  };

  // Birthday Calculations
  const { isBirthdayToday, daysUntilBirthday } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    const isToday = profile.birthdayMonth === currentMonth && profile.birthdayDay === currentDay;

    let targetYear = now.getFullYear();
    const birthdayThisYear = new Date(targetYear, profile.birthdayMonth - 1, profile.birthdayDay);
    if (birthdayThisYear.getTime() < now.getTime() && !isToday) {
      birthdayThisYear.setFullYear(targetYear + 1);
    }
    const diffTime = birthdayThisYear.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      isBirthdayToday: isToday,
      daysUntilBirthday: isToday ? 0 : Math.max(0, diffDays)
    };
  }, [profile.birthdayDay, profile.birthdayMonth]);

  // Story Progress Calculations
  const completedStoryMilestonesCount = useMemo(() => {
    return storyMilestones.filter(m => m.completed).length;
  }, [storyMilestones]);

  const storyProgressPercent = useMemo(() => {
    if (storyMilestones.length === 0) return 0;
    return Math.round((completedStoryMilestonesCount / storyMilestones.length) * 100);
  }, [completedStoryMilestonesCount, storyMilestones.length]);

  return (
    <IslandContext.Provider
      value={{
        user,
        isAuthReady,
        isCloudSynced,
        loginWithGoogle,
        loginAsGuest,
        logout,
        profile,
        updateProfile,
        addExperience,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry,
        villagers,
        addVillager,
        updateVillager,
        removeVillager,
        storyMilestones,
        toggleStoryTask,
        completedStoryMilestonesCount,
        storyProgressPercent,
        showConcertModal,
        setShowConcertModal,
        goals,
        addGoal,
        toggleGoal,
        deleteGoal,
        dailyMissions,
        toggleMission,
        claimMission,
        avatarIcons,
        activeAvatar,
        buyAvatarIcon,
        equipAvatarIcon,
        isBirthdayToday,
        daysUntilBirthday
      }}
    >
      {children}
    </IslandContext.Provider>
  );
};

export const useIsland = () => {
  const context = useContext(IslandContext);
  if (!context) {
    throw new Error('useIsland must be used within an IslandProvider');
  }
  return context;
};
