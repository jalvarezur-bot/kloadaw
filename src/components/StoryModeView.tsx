import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Star, 
  Music, 
  Award, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  Lock, 
  Check, 
  MapPin, 
  CalendarCheck 
} from 'lucide-react';
import { useIsland } from '../context/IslandContext';

export const StoryModeView: React.FC = () => {
  const { 
    storyMilestones, 
    toggleStoryTask, 
    storyProgressPercent, 
    completedStoryMilestonesCount,
    setShowConcertModal,
    profile 
  } = useIsland();

  const [activeStepFilter, setActiveStepFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredMilestones = storyMilestones.filter((m) => {
    if (activeStepFilter === 'completed') return m.completed;
    if (activeStepFilter === 'pending') return !m.completed;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Story Mode Header Hero */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#e5dec9] shadow-sm bg-amber-50">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-6 md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                <Music className="w-4 h-4 text-emerald-600" />
                <span>Ruta Oficial: Proyecto K de Nook Inc.</span>
              </div>
              <h1 className="font-ac text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                El Camino hacia Totakeke
              </h1>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Supera cada uno de los 10 hitos históricos en {profile.islandName} para atraer al gran músico Totakeke (K.K. Slider) a la plaza y pasarte la historia principal de Animal Crossing: New Horizons.
              </p>
            </div>

            {/* Progress Bar & Status */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-stone-700">
                  Progreso Insular: {completedStoryMilestonesCount} de {storyMilestones.length} capítulos
                </span>
                <span className="text-emerald-700 tabular-nums">{storyProgressPercent}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 shadow-xs"
                  style={{ width: `${storyProgressPercent}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span className="font-medium">Meta final:</span>
                  <span className="font-bold text-amber-700 flex items-center gap-1">
                    ★ 3 Estrellas + Concierto
                  </span>
                </div>

                <button
                  onClick={() => setShowConcertModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Ver Concierto de Totakeke</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-48 md:h-full w-full overflow-hidden border-t md:border-t-0 md:border-l border-[#e5dec9]">
            <img
              src="/src/assets/images/acnh_cozy_journal_1793223106052.jpg"
              alt="Cuaderno de la historia de Animal Crossing"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/20 md:bg-transparent" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-ac text-lg text-stone-900 font-bold flex items-center gap-2">
          <span>📜</span>
          <span>Cronología de Hitos de la Isla</span>
        </h2>

        <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <button
            onClick={() => setActiveStepFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeStepFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos ({storyMilestones.length})
          </button>
          <button
            onClick={() => setActiveStepFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeStepFilter === 'pending'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setActiveStepFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeStepFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Completados ({completedStoryMilestonesCount})
          </button>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4">
        {filteredMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`rounded-3xl border transition-all ${
              milestone.completed
                ? 'bg-emerald-50/50 border-emerald-200'
                : 'bg-white border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)]'
            }`}
          >
            <div className="p-5 sm:p-6">
              {/* Top row: Chapter, Title, Rewards & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                      milestone.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 text-stone-700 border border-stone-300'
                    }`}
                  >
                    {milestone.stepNumber}
                  </span>
                  <div>
                    <h3 className="font-ac text-base font-bold text-stone-900 leading-snug">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {milestone.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>+{milestone.rewardXp} EXP</span>
                  </span>

                  {milestone.completed ? (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Completado</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl bg-stone-100 text-stone-600 text-xs font-medium border border-stone-200">
                      En Curso
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-700 mt-2 mb-3 leading-relaxed">
                {milestone.description}
              </p>

              {/* Game Hint Box */}
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-4 flex items-start gap-2 text-xs text-amber-950">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Guía de Tom Nook: </span>
                  <span className="text-amber-900">{milestone.hint}</span>
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Tareas para superar este capítulo:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {milestone.tasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleStoryTask(milestone.id, task.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
                        task.done
                          ? 'bg-emerald-100/40 border-emerald-300 text-stone-800'
                          : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          task.done
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-stone-300 bg-white'
                        }`}
                      >
                        {task.done && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs ${task.done ? 'line-through text-stone-500' : 'font-medium'}`}>
                        {task.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
