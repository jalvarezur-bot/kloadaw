import React from 'react';
import { X, Sparkles, Music, Award, Star, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useIsland } from '../context/IslandContext';

export const TotakekeConcertModal: React.FC = () => {
  const { showConcertModal, setShowConcertModal, profile } = useIsland();

  if (!showConcertModal) return null;

  const triggerMoreConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fdd835', '#43a047', '#00acc1', '#e91e63']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#fbf8eb] rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowConcertModal(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image of Totakeke Concert */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-amber-900">
          <img
            src="/src/assets/images/totakeke_concert_hero_1793223104547.jpg"
            alt="Concierto de Totakeke en Animal Crossing"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
              <Star className="w-4 h-4 fill-amber-300" />
              <Star className="w-4 h-4 fill-amber-300" />
              <Star className="w-4 h-4 fill-amber-300" />
              <span className="ml-1 uppercase tracking-wider text-[11px]">¡Isla de 3 Estrellas!</span>
            </div>
            <h2 className="font-ac text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              ¡El Concierto de Totakeke!
            </h2>
            <p className="text-xs sm:text-sm text-stone-200">
              K.K. Slider en directo en la plaza de {profile.islandName}
            </p>
          </div>
        </div>

        {/* Content & Rewards */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-xs font-bold text-lg">
              🎸
            </div>
            <div>
              <h3 className="font-ac text-sm font-bold text-amber-950">
                ¡Has completado la historia principal de Animal Crossing!
              </h3>
              <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                Los acordes de <em>"Nuevo Horizonte"</em> han resonado bajo los farolillos de la plaza. Todos tus vecinos han asistido al evento histórico que pone tu isla en el mapa internacional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-stone-900">Obras Públicas Desbloqueadas</p>
                <p className="text-[11px] text-stone-500">Crea cascadas, ríos y acantilados</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-stone-200 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-stone-900">+1,500 EXP de Logro</p>
                <p className="text-[11px] text-stone-500">Para canjear en la Tienda de Iconos</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={triggerMoreConfetti}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>¡Lanzar Confetti!</span>
            </button>

            <button
              onClick={() => setShowConcertModal(false)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-transform active:scale-95"
            >
              ¡Continuar mi Aventura Insular!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
