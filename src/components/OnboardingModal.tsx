import React, { useState } from 'react';
import { X, Cake, Palmtree, User, Globe, Sparkles, Check } from 'lucide-react';
import { useIsland } from '../context/IslandContext';
import { Fruit, Hemisphere } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const FRUITS: { name: Fruit; icon: string }[] = [
  { name: 'Manzanas', icon: '🍎' },
  { name: 'Cerezas', icon: '🍒' },
  { name: 'Naranjas', icon: '🍊' },
  { name: 'Melocotones', icon: '🍑' },
  { name: 'Peras', icon: '🍐' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, title }) => {
  const { profile, updateProfile, activeAvatar } = useIsland();

  const [playerName, setPlayerName] = useState(profile.playerName || 'Aldeano');
  const [islandName, setIslandName] = useState(profile.islandName || 'Isla Paraíso');
  const [birthdayDay, setBirthdayDay] = useState(profile.birthdayDay || 15);
  const [birthdayMonth, setBirthdayMonth] = useState(profile.birthdayMonth || 7);
  const [nativeFruit, setNativeFruit] = useState<Fruit>(profile.nativeFruit || 'Melocotones');
  const [hemisphere, setHemisphere] = useState<Hemisphere>(profile.hemisphere || 'Norte');

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      playerName: playerName.trim() || 'Aldeano',
      islandName: islandName.trim() || 'Isla Paraíso',
      birthdayDay: Number(birthdayDay),
      birthdayMonth: Number(birthdayMonth),
      nativeFruit,
      hemisphere
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#fbf8eb] rounded-3xl border-2 border-[#e5dec9] shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl shadow-xs">
            {activeAvatar.emoji}
          </div>
          <div>
            <h2 className="font-ac text-xl text-stone-900 font-bold">
              {title || 'Pasaporte Insular'}
            </h2>
            <p className="text-xs text-stone-600">
              Personaliza los datos de tu isla de Animal Crossing: New Horizons
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Player & Island Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Tu Nombre (Aldeano)
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={24}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ej. Lucas"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Nombre de tu Isla
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={24}
                  value={islandName}
                  onChange={(e) => setIslandName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ej. Nooklandia"
                  required
                />
              </div>
            </div>
          </div>

          {/* Birthday configuration (Critical Requirement) */}
          <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-200">
            <div className="flex items-center gap-2 mb-2 text-pink-900 font-bold text-xs">
              <Cake className="w-4 h-4 text-pink-600" />
              <span>Fecha de tu Cumpleaños (¡Para el recordatorio en el juego!)</span>
            </div>
            <p className="text-[11px] text-pink-800 mb-3 leading-relaxed">
              La app te avisará ese día para que entres a Animal Crossing: ¡tus vecinos te preparan una fiesta sorpresa con tarta de cumpleaños y regalos de Tom Nook!
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Día
                </label>
                <select
                  value={birthdayDay}
                  onChange={(e) => setBirthdayDay(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-300 text-sm text-stone-900"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Mes
                </label>
                <select
                  value={birthdayMonth}
                  onChange={(e) => setBirthdayMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-pink-300 text-sm text-stone-900"
                >
                  {MONTH_NAMES.map((m, idx) => (
                    <option key={m} value={idx + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Native Fruit */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Fruta Nativa de tu Isla
            </label>
            <div className="grid grid-cols-5 gap-2">
              {FRUITS.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setNativeFruit(f.name)}
                  className={`p-2 rounded-2xl border text-center transition-all ${
                    nativeFruit === f.name
                      ? 'bg-emerald-100 border-emerald-500 shadow-xs ring-2 ring-emerald-400'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xl block mb-0.5">{f.icon}</span>
                  <span className="text-[10px] font-semibold text-stone-700 truncate block">
                    {f.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Hemisphere */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Hemisferio de la Isla
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHemisphere('Norte')}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  hemisphere === 'Norte'
                    ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-stone-900">Hemisferio Norte</p>
                  <p className="text-[10px] text-stone-600">Verano en Junio-Agosto</p>
                </div>
                {hemisphere === 'Norte' && <Check className="w-4 h-4 text-emerald-700" />}
              </button>

              <button
                type="button"
                onClick={() => setHemisphere('Sur')}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  hemisphere === 'Sur'
                    ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-stone-900">Hemisferio Sur</p>
                  <p className="text-[10px] text-stone-600">Verano en Diciembre-Feb</p>
                </div>
                {hemisphere === 'Sur' && <Check className="w-4 h-4 text-emerald-700" />}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-200/60 hover:bg-stone-200 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-transform active:scale-95"
            >
              Guardar Pasaporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
