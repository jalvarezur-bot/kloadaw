import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  Heart, 
  MessageCircle, 
  Gift, 
  Star, 
  Trash2, 
  Search, 
  Filter, 
  Cake, 
  Smile, 
  CheckCircle2,
  X 
} from 'lucide-react';
import { useIsland } from '../context/IslandContext';
import { POPULAR_VILLAGERS_DB } from '../data/acnhData';
import { IslandVillager } from '../types';

export const VillagersView: React.FC = () => {
  const { villagers, addVillager, updateVillager, removeVillager, addExperience, profile } = useIsland();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('all');

  // Custom villager form state
  const [customName, setCustomName] = useState('');
  const [customSpecies, setCustomSpecies] = useState('Gato');
  const [customPersonality, setCustomPersonality] = useState('Normal');
  const [customCatchphrase, setCustomCatchphrase] = useState('');
  const [customBirthday, setCustomBirthday] = useState('');
  const [customAvatar, setCustomAvatar] = useState('🐱');

  const filteredVillagers = villagers.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.species.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPersonality = selectedPersonality === 'all' || v.personality === selectedPersonality;
    return matchesSearch && matchesPersonality;
  });

  const handleQuickAdd = async (villager: typeof POPULAR_VILLAGERS_DB[0]) => {
    if (villagers.some(v => v.villagerKey === villager.villagerKey)) {
      alert(`${villager.name} ya reside en tu isla.`);
      return;
    }
    await addVillager({
      villagerKey: villager.villagerKey,
      name: villager.name,
      species: villager.species,
      personality: villager.personality,
      catchphrase: villager.catchphrase,
      birthday: villager.birthday,
      avatarUrl: villager.avatarUrl,
      friendshipLevel: 1,
      talkedToday: false,
      giftGivenToday: false,
      isFavorite: false
    });
    await addExperience(80, 'Nuevo vecino recibido');
    setIsAddModalOpen(false);
  };

  const handleCustomAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    await addVillager({
      villagerKey: `custom-${Date.now()}`,
      name: customName.trim(),
      species: customSpecies,
      personality: customPersonality,
      catchphrase: customCatchphrase.trim() || 'hola',
      birthday: customBirthday.trim() || '1 de Enero',
      avatarUrl: customAvatar,
      friendshipLevel: 1,
      talkedToday: false,
      giftGivenToday: false,
      isFavorite: false
    });
    await addExperience(80, 'Nuevo vecino recibido');
    setCustomName('');
    setCustomCatchphrase('');
    setCustomBirthday('');
    setIsAddModalOpen(false);
  };

  const handleTalkedToday = async (id: string, current: boolean) => {
    await updateVillager(id, { talkedToday: !current });
    if (!current) {
      await addExperience(30, 'Conversación vecinal');
    }
  };

  const handleGiftToday = async (id: string, current: boolean) => {
    await updateVillager(id, { giftGivenToday: !current });
    if (!current) {
      await addExperience(50, 'Regalo entregado a vecino');
    }
  };

  const handleHeartLevel = async (id: string, currentLevel: number) => {
    const nextLevel = currentLevel >= 6 ? 1 : currentLevel + 1;
    await updateVillager(id, { friendshipLevel: nextLevel });
    if (nextLevel === 6) {
      await addExperience(200, '¡Foto con marco de amistad conseguida!');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#e5dec9] shadow-sm bg-sky-50">
        <div className="h-44 sm:h-52 w-full relative">
          <img
            src="/src/assets/images/acnh_villager_plaza_1793223105091.jpg"
            alt="Vecinos en la plaza de Animal Crossing"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-300">
                  Censo Insular de Vecinos
                </span>
                <h1 className="font-ac text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Vecinos de {profile.islandName}
                </h1>
                <p className="text-xs text-stone-200 mt-0.5">
                  Capacidad de la isla: {villagers.length} / 10 residentes
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Nuevo Vecino</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nombre o especie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Personalidad:</span>
          <select
            value={selectedPersonality}
            onChange={(e) => setSelectedPersonality(e.target.value)}
            className="px-3 py-1.5 text-xs bg-stone-50 rounded-xl border border-stone-300 text-stone-900 focus:outline-hidden"
          >
            <option value="all">Todas ({villagers.length})</option>
            <option value="Normal">Normal</option>
            <option value="Esnob">Esnob</option>
            <option value="Perezoso">Perezoso</option>
            <option value="Dulce">Dulce</option>
            <option value="Altanera">Altanera</option>
            <option value="Vivaz">Vivaz</option>
            <option value="Atlético">Atlético</option>
          </select>
        </div>
      </div>

      {/* Villagers Grid */}
      {filteredVillagers.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center">
          <span className="text-4xl block mb-2">🏡</span>
          <h3 className="font-ac text-base text-stone-800 font-bold mb-1">
            No se encontraron vecinos
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            Añade vecinos desde la base de datos o crea tus propios residentes con sus frases y cumpleaños.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
          >
            Añadir vecino ahora
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVillagers.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-3xl border border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              {/* Top row: Avatar, Name, Species, Personality */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-2xl shadow-2xs">
                      {v.avatarUrl || '🐾'}
                    </div>
                    <div>
                      <h3 className="font-ac text-base font-bold text-stone-900 leading-tight">
                        {v.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">
                        {v.species} · <span className="text-emerald-700 font-semibold">{v.personality}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => updateVillager(v.id, { isFavorite: !v.isFavorite })}
                    className="p-1 hover:scale-110 transition-transform"
                    title="Vecino Favorito"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        v.isFavorite ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Catchphrase & Birthday */}
                <div className="p-2.5 rounded-2xl bg-[#faf7ef] border border-[#e8e2d2] mb-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="text-[11px] font-medium text-stone-500">Muletilla:</span>
                    <span className="font-bold text-stone-800 italic">"{v.catchphrase}"</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="text-[11px] font-medium text-stone-500">Cumpleaños:</span>
                    <span className="font-semibold text-stone-800 flex items-center gap-1">
                      <Cake className="w-3 h-3 text-pink-500" />
                      {v.birthday}
                    </span>
                  </div>
                </div>

                {/* Friendship Level (0 to 6 hearts) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-500 font-medium">Nivel de Amistad:</span>
                    <button
                      onClick={() => handleHeartLevel(v.id, v.friendshipLevel)}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline"
                      title="Haz clic para subir nivel de amistad"
                    >
                      {v.friendshipLevel === 6 ? '🖼️ ¡Foto Conseguida!' : `Nivel ${v.friendshipLevel}/6`}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 6 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleHeartLevel(v.id, i + 1)}
                        className="hover:scale-110 transition-transform p-0.5"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            i < v.friendshipLevel
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Checklist: Talked today? Gifted today? */}
              <div className="pt-3 border-t border-stone-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Atenciones de hoy:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleTalkedToday(v.id, v.talkedToday)}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      v.talkedToday
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{v.talkedToday ? 'Hablado ✓' : 'Saludar (+30)'}</span>
                  </button>

                  <button
                    onClick={() => handleGiftToday(v.id, v.giftGivenToday)}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      v.giftGivenToday
                        ? 'bg-pink-100 text-pink-900 border border-pink-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{v.giftGivenToday ? 'Regalado ✓' : 'Regalar (+50)'}</span>
                  </button>
                </div>

                <div className="mt-2.5 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`¿${v.name} se ha mudado de tu isla?`)) {
                        removeVillager(v.id);
                      }
                    }}
                    className="text-[11px] text-stone-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Mudanza</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Villager Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-[#fbf8eb] rounded-3xl border-2 border-[#e5dec9] shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <h3 className="font-ac text-xl text-stone-900 font-bold">
                  Registrar Vecino en {profile.islandName}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-500 hover:text-stone-800 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Popular database quick picks */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Elegir de la Lista de Vecinos Populares de Animal Crossing:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                {POPULAR_VILLAGERS_DB.map((pv) => (
                  <button
                    key={pv.villagerKey}
                    type="button"
                    onClick={() => handleQuickAdd(pv)}
                    className="p-2.5 rounded-2xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-left flex items-center gap-2.5 transition-all shadow-2xs"
                  >
                    <span className="text-2xl">{pv.avatarUrl}</span>
                    <div className="overflow-hidden">
                      <p className="font-bold text-xs text-stone-900 truncate">{pv.name}</p>
                      <p className="text-[10px] text-stone-500 truncate">{pv.species} · {pv.personality}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Villager Creator */}
            <div className="border-t border-stone-200 pt-4">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                O Crear un Vecino Personalizado:
              </h4>
              <form onSubmit={handleCustomAdd} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      required
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Ej. Parches"
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Especie</label>
                    <input
                      type="text"
                      required
                      value={customSpecies}
                      onChange={(e) => setCustomSpecies(e.target.value)}
                      placeholder="Ej. Oso, Gato, Conejo..."
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Personalidad</label>
                    <select
                      value={customPersonality}
                      onChange={(e) => setCustomPersonality(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-sm"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Perezoso">Perezoso</option>
                      <option value="Esnob">Esnob</option>
                      <option value="Dulce">Dulce</option>
                      <option value="Altanera">Altanera</option>
                      <option value="Vivaz">Vivaz</option>
                      <option value="Atlético">Atlético</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Muletilla</label>
                    <input
                      type="text"
                      value={customCatchphrase}
                      onChange={(e) => setCustomCatchphrase(e.target.value)}
                      placeholder="Ej. grrr, puchis..."
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Cumpleaños</label>
                    <input
                      type="text"
                      value={customBirthday}
                      onChange={(e) => setCustomBirthday(e.target.value)}
                      placeholder="Ej. 10 de Febrero"
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-200/70 hover:bg-stone-200 rounded-xl"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                  >
                    Guardar Vecino
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
