import React, { useState } from 'react';
import { 
  Plus, 
  Star, 
  Calendar, 
  CloudSun, 
  Camera, 
  TrendingUp, 
  TrendingDown, 
  User, 
  Trash2, 
  Image as ImageIcon,
  Sparkles,
  Heart
} from 'lucide-react';
import { useIsland } from '../context/IslandContext';
import { WEATHER_OPTIONS, SPECIAL_VISITORS } from '../data/acnhData';
import { Weather } from '../types';

export const JournalView: React.FC = () => {
  const { profile, journalEntries, addJournalEntry, deleteJournalEntry, storyProgressPercent } = useIsland();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [weather, setWeather] = useState<Weather>('Soleado');
  const [rating, setRating] = useState(profile.islandRating || 2);
  const [specialVisitor, setSpecialVisitor] = useState(SPECIAL_VISITORS[0]);
  const [turnipBuy, setTurnipBuy] = useState<string>('');
  const [turnipSell, setTurnipSell] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');

  // Handle Photo upload with compression for smooth storage
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = Math.min(img.width, MAX_WIDTH);
        canvas.height = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.75);
        setPhotoUrl(compressed);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !notes.trim()) return;

    await addJournalEntry({
      title: title.trim(),
      date,
      weather,
      rating,
      specialVisitor: specialVisitor === SPECIAL_VISITORS[0] ? undefined : specialVisitor,
      turnipBuy: turnipBuy ? Number(turnipBuy) : undefined,
      turnipSell: turnipSell ? Number(turnipSell) : undefined,
      notes: notes.trim(),
      photoUrl: photoUrl || undefined,
      photoCaption: photoCaption.trim() || undefined
    });

    // Reset form
    setTitle('');
    setNotes('');
    setTurnipBuy('');
    setTurnipSell('');
    setPhotoUrl(null);
    setPhotoCaption('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Island Banner Hero */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#e5dec9] shadow-sm bg-amber-100">
        <div className="h-44 sm:h-56 w-full relative">
          <img
            src="/src/assets/images/acnh_island_banner_1793223103285.jpg"
            alt="Paisaje de Isla Animal Crossing"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-300">
                  Diario Oficial de la Isla
                </span>
                <h1 className="font-ac text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {profile.islandName}
                </h1>
                <p className="text-xs text-stone-200 mt-0.5">
                  Insular: {profile.playerName} · Fruta nativa: {profile.nativeFruit} · Hemisferio {profile.hemisphere}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreating(true)}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Escribir Página</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Island Vitals Strip */}
        <div className="bg-[#fcfaf2] px-5 py-3 border-t border-[#e5dec9] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-stone-700">
              <span className="text-stone-500 font-medium">Reputación:</span>
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < profile.islandRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-stone-700">
              <span className="text-stone-500 font-medium">Proyecto K:</span>
              <span className="font-bold text-emerald-700">{storyProgressPercent}% completado</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 font-medium">
            {journalEntries.length} {journalEntries.length === 1 ? 'entrada registrada' : 'entradas registradas'}
          </div>
        </div>
      </div>

      {/* Entry Creation Modal / Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#fbf8eb] rounded-3xl border-2 border-[#e5dec9] shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <h3 className="font-ac text-xl text-stone-900 font-bold">
                  Nueva Página del Diario
                </h3>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="text-stone-500 hover:text-stone-800 text-sm font-semibold p-1"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Título del Día
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej. ¡Lluvia de estrellas con Estela!"
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm"
                  />
                </div>
              </div>

              {/* Weather & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Clima en la Isla
                  </label>
                  <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value as Weather)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-sm text-stone-900"
                  >
                    {WEATHER_OPTIONS.map((w) => (
                      <option key={w.label} value={w.label}>
                        {w.emoji} {w.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Estrellas de la Isla ({rating}★)
                  </label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Visitor & Turnip Stalk Market */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    Visitante Especial del Día
                  </label>
                  <select
                    value={specialVisitor}
                    onChange={(e) => setSpecialVisitor(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-sm text-stone-900"
                  >
                    {SPECIAL_VISITORS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Precio Compra Nabo (Domingo)
                    </label>
                    <input
                      type="number"
                      placeholder="Ej. 104"
                      value={turnipBuy}
                      onChange={(e) => setTurnipBuy(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Precio Venta Mini Nook
                    </label>
                    <input
                      type="number"
                      placeholder="Ej. 142"
                      value={turnipSell}
                      onChange={(e) => setTurnipSell(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Notes / Island Adventures */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Crónica y Recuerdos de la Isla
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={2000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="¿Qué proyectos hiciste hoy? ¿Con qué vecinos hablaste? ¿Qué donaste al museo de Sócrates?..."
                  className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Photo Upload for Special Events (Critical Requirement) */}
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200">
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Foto de Evento Especial o Momento Insular
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Subir Foto de tu Isla</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {photoUrl && (
                    <span className="text-xs text-emerald-700 font-medium">
                      ✓ Foto adjunta con éxito
                    </span>
                  )}
                </div>

                {photoUrl && (
                  <div className="mt-3 flex items-start gap-3">
                    <img
                      src={photoUrl}
                      alt="Vista previa de foto"
                      className="w-20 h-20 object-cover rounded-xl border border-stone-300 shadow-2xs"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Pie de foto (ej. Foto de grupo con Sócrates)"
                        value={photoCaption}
                        onChange={(e) => setPhotoCaption(e.target.value)}
                        className="w-full px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotoUrl(null)}
                        className="text-[11px] text-rose-600 hover:text-rose-800 mt-1 block"
                      >
                        Eliminar foto
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-200/70 hover:bg-stone-200 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-transform active:scale-95"
                >
                  Guardar en el Diario (+50 EXP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Diary Entries Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-ac text-lg text-stone-900 font-bold flex items-center gap-2">
            <span>📖</span>
            <span>Crónicas y Recuerdos de {profile.islandName}</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Ordenado cronológicamente
          </span>
        </div>

        {journalEntries.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white/80 border border-stone-200 text-center">
            <span className="text-4xl block mb-2">🏝️</span>
            <h3 className="font-ac text-base text-stone-800 font-bold mb-1">
              Tu diario aún no tiene páginas
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              ¡Registra lo que pasó hoy en tu isla, sube fotos de tus visitas y sigue tus avances diarios!
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
            >
              Escribir primera página
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {journalEntries.map((entry) => (
              <article
                key={entry.id}
                className="bg-white rounded-3xl border border-[#e5dec9] shadow-[0_2px_8px_rgba(78,52,46,0.04)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
              >
                {/* Header: Date, Weather, Rating */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-stone-700">{entry.date}</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                        {entry.weather}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: entry.rating || 1 }, (_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-ac text-base font-bold text-stone-900 mb-2 leading-snug">
                    {entry.title}
                  </h3>

                  {/* Optional Attached Polaroid Photo */}
                  {entry.photoUrl && (
                    <div className="my-3 p-2 bg-[#fdfdfc] rounded-2xl border border-stone-200 shadow-2xs">
                      <img
                        src={entry.photoUrl}
                        alt={entry.photoCaption || 'Foto de la isla'}
                        className="w-full h-44 object-cover rounded-xl"
                      />
                      {entry.photoCaption && (
                        <p className="text-[11px] text-stone-600 italic text-center mt-1.5 font-medium">
                          "{entry.photoCaption}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Journal Notes */}
                  <p className="text-xs text-stone-700 whitespace-pre-line leading-relaxed">
                    {entry.notes}
                  </p>
                </div>

                {/* Footer metadata: Visitors, Turnip prices, Delete action */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex flex-wrap items-center gap-2 text-stone-600">
                    {entry.specialVisitor && (
                      <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-800 font-medium">
                        Visitante: {entry.specialVisitor}
                      </span>
                    )}

                    {(entry.turnipBuy || entry.turnipSell) && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 font-medium flex items-center gap-1">
                        🌱 Nabos: {entry.turnipBuy ? `Comprados a ${entry.turnipBuy}` : ''}{' '}
                        {entry.turnipSell ? `| Venta a ${entry.turnipSell}` : ''}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors opacity-80 hover:opacity-100"
                    title="Borrar entrada"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
