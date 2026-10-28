import React, { useState } from 'react';
import { Cake, Sparkles, X, Gift, Calendar } from 'lucide-react';
import { useIsland } from '../context/IslandContext';

export const BirthdayBanner: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const { profile, isBirthdayToday, daysUntilBirthday } = useIsland();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (isBirthdayToday) {
    return (
      <div className="bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 border-b-2 border-rose-200 px-4 py-3 shadow-sm relative">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-rose-400 text-white flex items-center justify-center shrink-0 shadow-sm animate-bounce">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <p className="font-ac text-base text-rose-900 font-bold flex items-center justify-center sm:justify-start gap-1.5">
                ¡Feliz Cumpleaños en {profile.islandName}, {profile.playerName}!
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 inline" />
              </p>
              <p className="text-xs text-rose-800">
                ¡Tus vecinos de la isla han preparado una fiesta secreta! ¡Entra hoy al juego para recibir tu tarta y regalos exclusivos de cumpleaños!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-sm transition-transform active:scale-95"
            >
              Ver perfil
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 text-rose-700 hover:text-rose-900 rounded-lg hover:bg-rose-200/50"
              title="Cerrar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If birthday is in 7 days or less, show gentle reminder
  if (daysUntilBirthday > 0 && daysUntilBirthday <= 7) {
    return (
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Recordatorio insular:</strong> Faltan solo <strong>{daysUntilBirthday} días</strong> para tu cumpleaños ({profile.birthdayDay}/{profile.birthdayMonth}). ¡No olvides entrar a Animal Crossing ese día!
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-700 hover:text-amber-900 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
