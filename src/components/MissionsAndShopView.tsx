import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Lock, 
  Check, 
  ShoppingBag, 
  Flame, 
  ArrowUpRight, 
  Info,
  Layers,
  Star
} from 'lucide-react';
import { useIsland } from '../context/IslandContext';
import { AvatarIcon, Rarity } from '../types';

export const MissionsAndShopView: React.FC = () => {
  const { 
    dailyMissions, 
    toggleMission, 
    claimMission, 
    profile, 
    avatarIcons, 
    activeAvatar, 
    buyAvatarIcon, 
    equipAvatarIcon 
  } = useIsland();

  const [activeSection, setActiveSection] = useState<'missions' | 'shop'>('shop');
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string>('all');

  const rarityTiers: { label: Rarity; order: number; color: string; bg: string; expRange: string }[] = [
    { label: 'Común', order: 1, color: 'text-stone-700', bg: 'bg-stone-100 border-stone-300', expRange: '100 - 300 EXP' },
    { label: 'Poco Común', order: 2, color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-300', expRange: '450 - 750 EXP' },
    { label: 'Raro', order: 3, color: 'text-blue-800', bg: 'bg-blue-100 border-blue-300', expRange: '1000 - 1800 EXP' },
    { label: 'Épico', order: 4, color: 'text-purple-800', bg: 'bg-purple-100 border-purple-300', expRange: '2200 - 3500 EXP' },
    { label: 'Legendario', order: 5, color: 'text-amber-900', bg: 'bg-amber-100 border-amber-400', expRange: '4500 - 6000 EXP' },
  ];

  // Group or filter icons
  const displayedIcons = avatarIcons.filter((i) => {
    if (selectedRarityFilter === 'all') return true;
    return i.rarity === selectedRarityFilter;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Section Nav Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-3xl border border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('shop')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSection === 'shop'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tienda de Iconos por Rareza</span>
          </button>

          <button
            onClick={() => setActiveSection('missions')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeSection === 'missions'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Mini Misiones Diarias (Nook+)</span>
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] flex items-center justify-center font-mono font-bold">
              {dailyMissions.filter(m => m.completed && !m.claimed).length}
            </span>
          </button>
        </div>

        {/* Current EXP and Equipped Avatar Badge */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-stone-500 font-normal">Tu Saldo:</span>
            <span className="tabular-nums font-mono text-sm text-amber-800">{profile.experience} EXP</span>
          </div>
          <div className="h-4 w-px bg-amber-300" />
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <span className="text-[11px]">Icono activo:</span>
            <span className="text-base">{activeAvatar.emoji}</span>
          </div>
        </div>
      </div>

      {activeSection === 'shop' ? (
        /* ==================== AVATAR ICON SHOP ==================== */
        <div className="space-y-6">
          {/* Shop Hero Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 border-2 border-[#e5dec9] shadow-sm">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Boutique Exclusiva de Nook Inc.
              </span>
              <h1 className="font-ac text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight mt-1">
                Tienda de Iconos de Perfil
              </h1>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Usa la experiencia (EXP) ganada completando misiones diarias, avanzando en la historia hacia Totakeke y escribiendo en el diario. 
                Los iconos están ordenados rigurosamente de <strong>menor a mayor rareza</strong> según su valor de EXP.
              </p>
            </div>

            {/* Rarity Legend Scale (Menor a Mayor) */}
            <div className="mt-5 pt-4 border-t border-stone-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Escala de Rareza de Menor a Mayor:</span>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {rarityTiers.map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedRarityFilter(selectedRarityFilter === tier.label ? 'all' : tier.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tier.bg} ${tier.color} ${
                      selectedRarityFilter === tier.label ? 'ring-2 ring-emerald-500 shadow-xs' : 'hover:opacity-90'
                    }`}
                  >
                    <span>{tier.order}. {tier.label}</span>
                    <span className="text-[10px] ml-1.5 opacity-75 font-mono">({tier.expRange})</span>
                  </button>
                ))}

                {selectedRarityFilter !== 'all' && (
                  <button
                    onClick={() => setSelectedRarityFilter('all')}
                    className="text-xs text-stone-500 hover:text-stone-800 underline ml-2"
                  >
                    Ver todas las rarezas
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Icons Grid sorted by Rarity (Menor a Mayor) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedIcons.map((icon) => {
              const isUnlocked = profile.unlockedIconIds.includes(icon.id);
              const isActive = profile.activeIconId === icon.id;
              const canAfford = (profile.experience || 0) >= icon.priceXp;
              const expNeeded = icon.priceXp - (profile.experience || 0);

              const rarityColor = 
                icon.rarity === 'Legendario' ? 'bg-amber-100 text-amber-900 border-amber-400' :
                icon.rarity === 'Épico' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                icon.rarity === 'Raro' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                icon.rarity === 'Poco Común' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                'bg-stone-100 text-stone-700 border-stone-300';

              return (
                <div
                  key={icon.id}
                  className={`bg-white rounded-3xl border p-5 flex flex-col justify-between transition-all ${
                    isActive
                      ? 'border-emerald-500 ring-2 ring-emerald-400 shadow-md'
                      : isUnlocked
                      ? 'border-stone-200 hover:border-stone-300 shadow-[0_2px_8px_rgba(78,52,46,0.04)]'
                      : 'border-stone-200/80 bg-stone-50/50 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Top row: Rarity badge + Price in EXP */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${rarityColor}`}>
                        {icon.rarityOrder}. {icon.rarity}
                      </span>

                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        {icon.priceXp} EXP
                      </span>
                    </div>

                    {/* Icon preview & details */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${icon.bgGradient} border-2 ${icon.borderColor} flex items-center justify-center text-3xl shadow-xs shrink-0`}>
                        {icon.emoji}
                      </div>
                      <div>
                        <h3 className="font-ac text-base font-bold text-stone-900 leading-tight">
                          {icon.name}
                        </h3>
                        <p className="text-[11px] text-stone-500 font-medium">
                          {icon.character}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {icon.description}
                    </p>
                  </div>

                  {/* Purchase or Equip Action Button */}
                  <div className="pt-3 border-t border-stone-100">
                    {isActive ? (
                      <div className="w-full py-2 px-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Icono de Perfil Activo</span>
                      </div>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => equipAvatarIcon(icon.id)}
                        className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Equipar Icono</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => buyAvatarIcon(icon)}
                        disabled={!canAfford}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          canAfford
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-98'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Comprar por {icon.priceXp} EXP</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Te faltan {expNeeded} EXP</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ==================== DAILY MINI-MISSIONS ==================== */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-[#e5dec9] shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Programa Nook Miles+ Diario
            </span>
            <h1 className="font-ac text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight mt-1">
              Mini Misiones Diarias
            </h1>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Completa las actividades cotidianas en tu isla (pescar, hablar con vecinos, desenterrar fósiles y picar rocas) para conseguir grandes paquetes de EXP que luego podrás gastar en la tienda de avatares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyMissions.map((mission) => (
              <div
                key={mission.id}
                className={`bg-white rounded-3xl border p-5 flex flex-col justify-between transition-all ${
                  mission.claimed
                    ? 'bg-stone-50/70 border-stone-200 opacity-75'
                    : mission.completed
                    ? 'border-emerald-400 bg-emerald-50/30 ring-1 ring-emerald-300 shadow-sm'
                    : 'border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      Misión del Día
                    </span>

                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                      +{mission.xpReward} EXP
                    </span>
                  </div>

                  <h3 className="font-ac text-base font-bold text-stone-900 mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {mission.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleMission(mission.id)}
                    disabled={mission.claimed}
                    className="flex items-center gap-2 text-xs font-semibold text-stone-700"
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                        mission.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-stone-300 bg-white'
                      }`}
                    >
                      {mission.completed && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span>{mission.completed ? 'Misión completada' : 'Marcar como hecha'}</span>
                  </button>

                  {mission.claimed ? (
                    <span className="text-[11px] font-bold text-stone-400">
                      Reclamado ✓
                    </span>
                  ) : mission.completed ? (
                    <button
                      onClick={() => claimMission(mission.id)}
                      className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold shadow-xs transition-transform active:scale-95 animate-pulse"
                    >
                      ¡Reclamar +{mission.xpReward} EXP!
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
