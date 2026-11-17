import React, { useEffect } from 'react';

interface ResetModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      onClick={onCancel}
    >
      <div
        className="liquid-glass w-full max-w-sm rounded-3xl p-6 text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-1.5">
          <h3 id="reset-modal-title" className="text-lg font-bold text-slate-900">
            Esvaziar o Jarro da Aprovação?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Isso vai desmarcar todos os 26 tópicos concluídos e voltar a fila para o início.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold text-slate-700 bg-white/75 hover:bg-white border border-white/90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold text-white bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-700 shadow-[0_6px_16px_-4px_rgba(185,28,28,0.45)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/50"
          >
            Sim, reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
