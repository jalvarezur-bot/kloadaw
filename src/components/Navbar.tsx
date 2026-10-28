import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  Users, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Cloud, 
  CloudOff, 
  UserCheck, 
  Smartphone,
  Award
} from 'lucide-react';
import { useIsland } from '../context/IslandContext';

export type TabType = 'journal' | 'story' | 'villagers' | 'calendar' | 'missions';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenProfile,
  onOpenAuth
}) => {
  const { profile, activeAvatar, user, isCloudSynced } = useIsland();

  return (
    <>
      {/* Desktop / Tablet Top Bar adhering to Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#fbf8eb]/90 backdrop-blur-md border-b border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Single text wordmark with ACNH leaf */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('journal')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-700 shadow-sm transition-transform group-hover:scale-105">
                <span className="text-xl">🍃</span>
              </div>
              <div>
                <span className="font-ac text-lg font-bold text-stone-800 tracking-tight whitespace-nowrap block leading-tight">
                  NookPedia
                </span>
                <span className="text-[11px] font-medium text-emerald-700/80 block leading-none">
                  {profile.islandName} · {profile.playerName}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 5 clean navigation links with hover underline */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'journal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Diario
            </button>

            <button
              onClick={() => setActiveTab('story')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <span>Totakeke</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-400 text-amber-950 font-bold rounded-full">
                ★ 3
              </span>
            </button>

            <button
              onClick={() => setActiveTab('villagers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'villagers'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Vecinos
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'calendar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Calendario y Metas
            </button>

            <button
              onClick={() => setActiveTab('missions')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'missions'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <span>Misiones & Tienda</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </button>
          </nav>

          {/* Zone 3: Sync Status + EXP Indicator + Profile Avatar Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Cloud Sync Status Button */}
            <button
              onClick={onOpenAuth}
              title={isCloudSynced ? 'Sincronizado con la nube (todos tus dispositivos)' : 'Modo local: toca para sincronizar'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-[#f0ebd7] hover:bg-[#e8e1c8] text-stone-700 transition-colors"
            >
              {isCloudSynced ? (
                <>
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-[11px] text-emerald-800 font-semibold">Sincronizado</span>
                </>
              ) : (
                <>
                  <CloudOff className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline text-[11px] text-amber-800">Sincronizar</span>
                </>
              )}
            </button>

            {/* EXP balance badge */}
            <button
              onClick={() => setActiveTab('missions')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors shadow-2xs"
            >
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span className="tabular-nums font-mono">{profile.experience} EXP</span>
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-2xl p-0.5 border-2 border-emerald-500/40 bg-white hover:border-emerald-600 transition-all flex items-center justify-center text-xl shadow-xs active:scale-95"
              title="Ajustes de Isla y Perfil"
            >
              <span className="leading-none">{activeAvatar.emoji}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Natural Thumb Zone, min 44px hitboxes) */}
      <nav 
        aria-label="Navegación móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fbf8eb]/95 backdrop-blur-md border-t border-[#e5dec9] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-2 pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-16">
          <button
            onClick={() => setActiveTab('journal')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'journal' ? 'text-emerald-700 font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Diario</span>
          </button>

          <button
            onClick={() => setActiveTab('story')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              activeTab === 'story' ? 'text-emerald-700 font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Totakeke</span>
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-amber-400"></span>
          </button>

          <button
            onClick={() => setActiveTab('villagers')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'villagers' ? 'text-emerald-700 font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Vecinos</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'calendar' ? 'text-emerald-700 font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Metas</span>
          </button>

          <button
            onClick={() => setActiveTab('missions')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'missions' ? 'text-emerald-700 font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-[10px] tracking-tight">Tienda</span>
          </button>
        </div>
      </nav>
    </>
  );
};
