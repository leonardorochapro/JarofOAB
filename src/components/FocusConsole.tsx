import React from 'react';
import { ArrowRight, BatteryCharging, BatteryLow, BatteryMedium, Pause, Play, RotateCcw } from 'lucide-react';
import { ENERGY_CONFIG, EnergyLevel, Subject } from '../data/syllabus';

interface FocusConsoleProps {
  currentSubject: Subject;
  energy: EnergyLevel;
  onSelectEnergy: (level: EnergyLevel) => void;
  timerSeconds: number;
  isRunning: boolean;
  isFinished: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAdvanceQueue: () => void;
  onJumpToActive: () => void;
}

export const FocusConsole: React.FC<FocusConsoleProps> = ({
  currentSubject,
  energy,
  onSelectEnergy,
  timerSeconds,
  isRunning,
  isFinished,
  onToggleTimer,
  onResetTimer,
  onAdvanceQueue,
  onJumpToActive,
}) => {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const seconds = String(timerSeconds % 60).padStart(2, '0');

  const timerLabel = isFinished
    ? 'Concluído'
    : isRunning
    ? 'Pausar'
    : timerSeconds < ENERGY_CONFIG[energy].mins * 60
    ? 'Retomar'
    : 'Iniciar bloco';

  const energyOptions: { key: EnergyLevel; icon: React.ReactNode }[] = [
    { key: 'low', icon: <BatteryLow className="w-4 h-4 shrink-0" aria-hidden="true" /> },
    { key: 'med', icon: <BatteryMedium className="w-4 h-4 shrink-0" aria-hidden="true" /> },
    { key: 'high', icon: <BatteryCharging className="w-4 h-4 shrink-0" aria-hidden="true" /> },
  ];

  return (
    <div className="flex flex-col justify-between gap-6 h-full">
      {/* Header & Active Queue Subject */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-red-700">
          <span>Próximo passo da fila</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-500">{currentSubject.questionsLabel}</span>
        </div>

        <button
          type="button"
          onClick={onJumpToActive}
          className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40 rounded-lg"
        >
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-red-700 transition-colors text-balance">
            {currentSubject.number}. {currentSubject.name}
          </h2>
        </button>

        <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
          {ENERGY_CONFIG[energy].desc}
        </p>
      </div>

      {/* iOS Segmented Energy Control */}
      <div className="space-y-3">
        <div
          role="group"
          aria-label="Nível de energia do bloco"
          className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 rounded-2xl bg-slate-900/[0.045] border border-white/60 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]"
        >
          {energyOptions.map(({ key, icon }) => {
            const active = energy === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectEnergy(key)}
                aria-pressed={active}
                className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40 ${
                  active
                    ? 'bg-white/95 text-slate-900 shadow-[0_2px_10px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1)]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                <span className={active ? 'text-red-700' : 'text-slate-400'}>{icon}</span>
                <span>{ENERGY_CONFIG[key].label}</span>
              </button>
            );
          })}
        </div>

        {/* Frosted Timer & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/55 border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_-8px_rgba(15,23,42,0.06)]">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-live="off"
            >
              {minutes}:{seconds}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {isRunning ? 'Em foco' : isFinished ? 'Bloco concluído' : 'Pronto'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggleTimer}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] sm:min-h-[40px] rounded-xl text-sm font-semibold text-white bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-700 active:scale-[0.98] shadow-[0_6px_16px_-4px_rgba(185,28,28,0.45),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/50"
            >
              {isRunning ? (
                <Pause className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : (
                <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              <span>{timerLabel}</span>
            </button>

            <button
              type="button"
              onClick={onResetTimer}
              aria-label="Zerar cronômetro"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[44px] sm:min-h-[40px] rounded-xl text-sm font-medium text-slate-700 bg-white/75 hover:bg-white border border-white/90 shadow-[0_2px_8px_rgba(15,23,42,0.05)] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
            >
              <RotateCcw className="w-4 h-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span>Zerar</span>
            </button>

            <button
              type="button"
              onClick={onAdvanceQueue}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[44px] sm:min-h-[40px] rounded-xl text-sm font-medium text-slate-700 bg-white/75 hover:bg-white border border-white/90 shadow-[0_2px_8px_rgba(15,23,42,0.05)] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
            >
              <span>Próxima matéria</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-slate-500" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
