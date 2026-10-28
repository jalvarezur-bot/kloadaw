import React, { useState } from 'react';
import { X, Cloud, Smartphone, Monitor, Tablet, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useIsland } from '../context/IslandContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithGoogle, loginAsGuest, logout, isCloudSynced } = useIsland();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('No se pudo iniciar sesión con Google. Puedes continuar en modo local.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await loginAsGuest();
      onClose();
    } catch {
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#fbf8eb] rounded-3xl border-2 border-[#e5dec9] shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs mb-3">
            <Cloud className="w-7 h-7" />
          </div>
          <h2 className="font-ac text-xl text-stone-900 font-bold">
            Sincronización Multi-Dispositivo
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
            Accede a tu diario, vecinos y avances de Totakeke desde tu móvil, tablet o PC en tiempo real.
          </p>
        </div>

        {/* Sync cross-device explanation */}
        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 mb-5 space-y-2">
          <div className="flex items-center justify-around py-1 text-stone-600">
            <div className="flex flex-col items-center gap-1">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-semibold">Móvil</span>
            </div>
            <span className="text-stone-300 text-sm">⇄</span>
            <div className="flex flex-col items-center gap-1">
              <Tablet className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-semibold">Tablet</span>
            </div>
            <span className="text-stone-300 text-sm">⇄</span>
            <div className="flex flex-col items-center gap-1">
              <Monitor className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-semibold">PC</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium bg-emerald-50 p-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Tus datos se guardan con seguridad en la nube de Firebase Firestore.</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            {errorMsg}
          </div>
        )}

        {user ? (
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-950">Sesión iniciada con éxito</p>
                <p className="text-emerald-800 truncate max-w-[220px]">{user.email || 'Cuenta de usuario'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold shadow-xs flex items-center justify-center gap-2.5 transition-transform active:scale-98"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Conectando...' : 'Iniciar Sesión con Google'}</span>
            </button>

            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-200/70 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center transition-colors"
            >
              Continuar como Invitado (Modo local)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
