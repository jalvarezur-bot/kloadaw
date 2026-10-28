import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Cake, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Sparkles, 
  Award,
  Crown
} from 'lucide-react';
import { useIsland } from '../context/IslandContext';
import { SPECIAL_EVENTS_CALENDAR } from '../data/acnhData';
import { SpecialCalendarEvent } from '../types';

export const CalendarView: React.FC = () => {
  const { 
    goals, 
    addGoal, 
    toggleGoal, 
    deleteGoal, 
    profile, 
    villagers 
  } = useIsland();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => new Date().toISOString().split('T')[0]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalReward, setNewGoalReward] = useState('80');

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Calendar Math
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Adjust so Monday is index 0
  const startDayOffset = (firstDayOfMonth + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    await addGoal({
      title: newGoalTitle.trim(),
      date: selectedDateStr,
      type: 'meta',
      completed: false,
      xpReward: Number(newGoalReward) || 80
    });

    setNewGoalTitle('');
  };

  // Find events for each day
  const getEventsForDay = (day: number) => {
    const monthNum = currentMonth + 1;
    const dayStr = `${currentYear}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check if player's birthday
    const isPlayerBirthday = profile.birthdayMonth === monthNum && profile.birthdayDay === day;

    // Check if any villager's birthday
    const villagerBirthdays = villagers.filter(v => {
      // simple match if birthday contains day and month name
      return v.birthday.includes(`${day} de ${monthNames[currentMonth]}`);
    });

    // Check special ACNH calendar events
    const specialEvts = SPECIAL_EVENTS_CALENDAR.filter(e => e.month === monthNum && e.day === day);

    // Check user goals
    const dayGoals = goals.filter(g => g.date === dayStr);

    return {
      isPlayerBirthday,
      villagerBirthdays,
      specialEvts,
      dayGoals
    };
  };

  // Selected date goals
  const selectedDateGoals = useMemo(() => {
    return goals.filter(g => g.date === selectedDateStr);
  }, [goals, selectedDateStr]);

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)] p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
              <CalendarIcon className="w-4 h-4 text-emerald-600" />
              <span>Agenda y Calendario Insular</span>
            </div>
            <h1 className="font-ac text-2xl font-extrabold text-stone-900 leading-tight">
              Eventos Especiales y Metas Diarias
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Organiza tus proyectos en el juego, torneos de pesca, caza de bichos y cumpleaños de {profile.islandName}.
            </p>
          </div>

          {/* Month switcher */}
          <div className="flex items-center gap-2 bg-[#fbf8eb] p-1.5 rounded-2xl border border-stone-200">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-ac text-sm font-bold text-stone-900 px-3 min-w-[140px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mt-6">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-stone-500 mb-2">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span className="text-emerald-700">Sáb</span>
            <span className="text-rose-700">Dom</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots for start offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-2xl bg-stone-50/50" />
            ))}

            {/* Days of Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const monthNum = currentMonth + 1;
              const dateKey = `${currentYear}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDateStr === dateKey;
              const { isPlayerBirthday, villagerBirthdays, specialEvts, dayGoals } = getEventsForDay(day);

              const hasHighlights = isPlayerBirthday || villagerBirthdays.length > 0 || specialEvts.length > 0 || dayGoals.length > 0;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDateStr(dateKey)}
                  className={`h-16 sm:h-20 p-1.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-100/70 border-emerald-500 ring-2 ring-emerald-400 shadow-xs'
                      : isPlayerBirthday
                      ? 'bg-pink-50 border-pink-300'
                      : hasHighlights
                      ? 'bg-white border-stone-300 hover:border-emerald-300'
                      : 'bg-[#fdfcf9] border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-bold ${isSelected ? 'text-emerald-950 font-extrabold' : 'text-stone-700'}`}>
                      {day}
                    </span>
                    {isPlayerBirthday && (
                      <span title="Tu Cumpleaños">
                        <Crown className="w-3.5 h-3.5 text-pink-600 fill-pink-400" />
                      </span>
                    )}
                  </div>

                  {/* Day icons/indicators */}
                  <div className="flex flex-wrap gap-0.5 mt-auto">
                    {specialEvts.map((e) => (
                      <span
                        key={e.id}
                        className="w-2 h-2 rounded-full bg-amber-500"
                        title={e.title}
                      />
                    ))}
                    {villagerBirthdays.map((v) => (
                      <span
                        key={v.id}
                        className="w-2 h-2 rounded-full bg-pink-500"
                        title={`Cumpleaños de ${v.name}`}
                      />
                    ))}
                    {dayGoals.map((g) => (
                      <span
                        key={g.id}
                        className={`w-2 h-2 rounded-full ${g.completed ? 'bg-emerald-500' : 'bg-blue-400'}`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day Agenda & Goals Creator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Events on this date */}
        <div className="bg-white rounded-3xl border border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-ac text-base font-bold text-stone-900 flex items-center gap-2">
              <span>📅</span>
              <span>Eventos para: {selectedDateStr}</span>
            </h3>
          </div>

          {/* Birthday or Tourney highlights for this date */}
          {(() => {
            const [y, m, d] = selectedDateStr.split('-').map(Number);
            const { isPlayerBirthday, villagerBirthdays, specialEvts } = getEventsForDay(d);

            if (!isPlayerBirthday && villagerBirthdays.length === 0 && specialEvts.length === 0) {
              return (
                <div className="p-4 rounded-2xl bg-[#faf7ef] text-center text-xs text-stone-500">
                  No hay eventos de festival oficiales para este día. ¡Un momento perfecto para pescar o decorar la isla!
                </div>
              );
            }

            return (
              <div className="space-y-2.5">
                {isPlayerBirthday && (
                  <div className="p-3.5 rounded-2xl bg-pink-100/70 border border-pink-300 text-pink-950 flex items-start gap-3">
                    <Cake className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold">¡Tu Cumpleaños en Animal Crossing!</p>
                      <p className="text-pink-900 mt-0.5">
                        Tus vecinos celebrarán contigo en cuanto entres al juego hoy. ¡Recibe tu tarta y regalos de felicitación!
                      </p>
                    </div>
                  </div>
                )}

                {villagerBirthdays.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 flex items-center gap-3 text-xs"
                  >
                    <span className="text-2xl">{v.avatarUrl || '🎂'}</span>
                    <div>
                      <p className="font-bold">¡Cumpleaños de {v.name}!</p>
                      <p className="text-purple-800 text-[11px]">
                        Llévale un regalo envuelto con papel de regalo a su casa para conseguir puntos máximos de amistad.
                      </p>
                    </div>
                  </div>
                ))}

                {specialEvts.map((e) => (
                  <div
                    key={e.id}
                    className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs"
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {e.title}
                    </p>
                    <p className="text-amber-900 text-[11px] mt-0.5">{e.description}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Quick reference guide of seasonal events */}
          <div className="pt-2">
            <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
              Próximas Festividades Insulares:
            </h4>
            <div className="space-y-1.5 text-xs">
              {SPECIAL_EVENTS_CALENDAR.slice(0, 3).map((se) => (
                <div key={se.id} className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span className="font-semibold text-stone-800">{se.title}</span>
                  <span className="text-[11px] text-stone-500">{se.dateStr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Daily Goals Manager */}
        <div className="bg-white rounded-3xl border border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)] p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-ac text-base font-bold text-stone-900 flex items-center gap-2">
                <span>🎯</span>
                <span>Metas Insulares del Día</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {selectedDateGoals.filter(g => g.completed).length}/{selectedDateGoals.length} hechas
              </span>
            </div>

            {/* Add Goal Form */}
            <form onSubmit={handleAddGoal} className="mt-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ej. Pagar préstamo de 758,000 bayas..."
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 rounded-xl border border-stone-300 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
                <select
                  value={newGoalReward}
                  onChange={(e) => setNewGoalReward(e.target.value)}
                  className="px-2.5 py-2 text-xs bg-stone-50 rounded-xl border border-stone-300 text-stone-900 focus:outline-hidden"
                >
                  <option value="50">+50 EXP</option>
                  <option value="80">+80 EXP</option>
                  <option value="120">+120 EXP</option>
                  <option value="200">+200 EXP</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Goals list */}
            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-1">
              {selectedDateGoals.length === 0 ? (
                <p className="text-xs text-stone-400 italic py-4 text-center">
                  No hay metas asignadas para este día. Escribe una arriba para ganar EXP.
                </p>
              ) : (
                selectedDateGoals.map((g) => (
                  <div
                    key={g.id}
                    className={`p-2.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                      g.completed
                        ? 'bg-emerald-50/70 border-emerald-200 text-stone-600'
                        : 'bg-white border-stone-200 text-stone-800'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleGoal(g.id)}
                      className="flex items-center gap-2.5 text-left flex-1"
                    >
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                          g.completed
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-stone-300 bg-white'
                        }`}
                      >
                        {g.completed && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs ${g.completed ? 'line-through text-stone-400' : 'font-medium'}`}>
                        {g.title}
                      </span>
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                        +{g.xpReward} EXP
                      </span>
                      <button
                        onClick={() => deleteGoal(g.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
