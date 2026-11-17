import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
} from 'lucide-react';
import { Subject } from '../data/syllabus';

interface SubjectAccordionProps {
  subject: Subject;
  isCurrentQueue: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  completedMap: Record<string, boolean>;
  openGuides: Record<string, boolean>;
  onToggleTopic: (topicId: string) => void;
  onToggleGuide: (topicId: string) => void;
}

export const SubjectAccordion: React.FC<SubjectAccordionProps> = ({
  subject,
  isCurrentQueue,
  isExpanded,
  onToggleExpand,
  completedMap,
  openGuides,
  onToggleTopic,
  onToggleGuide,
}) => {
  const doneCount = subject.topics.filter((t) => Boolean(completedMap[t.id])).length;
  const totalCount = subject.topics.length;
  const allDone = doneCount === totalCount && totalCount > 0;

  return (
    <section
      id={`subject-${subject.id}`}
      className={`rounded-3xl transition-all duration-200 overflow-hidden ${
        isCurrentQueue ? 'liquid-glass-active' : 'liquid-glass'
      }`}
    >
      {/* Subject Header Row */}
      <button
        type="button"
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
        className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-white/35 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
      >
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight">
              {subject.number}. {subject.name}
            </h3>
            {isCurrentQueue && (
              <span className="text-xs font-semibold text-red-700 whitespace-nowrap">
                · Sua vez na fila
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{subject.questionsLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-medium text-slate-600">
              {doneCount} de {totalCount} concluídos
            </span>
            {allDone && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">Completa</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Minimalist progress hairline ring/bar */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-900/[0.07] overflow-hidden">
              <div
                className="h-full rounded-full bg-red-600 transition-all duration-500"
                style={{ width: `${(doneCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-white/70 border border-white/90 text-slate-600 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-slate-900' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </button>

      {/* Topics List */}
      {isExpanded && (
        <div className="border-t border-slate-900/[0.06] bg-white/30 divide-y divide-slate-900/[0.06]">
          {subject.topics.map((topic) => {
            const isChecked = Boolean(completedMap[topic.id]);
            const isGuideOpen = Boolean(openGuides[topic.id]);

            return (
              <div key={topic.id} className="transition-colors">
                <div className="px-5 py-3.5 sm:px-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Accessible >= 44px touch target wrapping crisp circular glass checkbox */}
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      aria-label={`Marcar ${topic.title} como concluído`}
                      onClick={() => onToggleTopic(topic.id)}
                      className="min-w-[44px] min-h-[44px] -ml-2.5 flex items-center justify-center rounded-xl hover:bg-white/50 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-150 ${
                          isChecked
                            ? 'bg-red-600 border-red-600 text-white shadow-[0_2px_8px_rgba(185,28,28,0.3)]'
                            : 'bg-white/80 border-slate-300/90 text-transparent hover:border-red-400'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.75]" aria-hidden="true" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleGuide(topic.id)}
                      className={`text-left text-sm sm:text-[15px] font-medium leading-snug py-2 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40 rounded-md ${
                        isChecked
                          ? 'line-through text-slate-400'
                          : 'text-slate-800 hover:text-red-700'
                      }`}
                    >
                      {topic.title}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleGuide(topic.id)}
                    aria-expanded={isGuideOpen}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40 ${
                      isGuideOpen
                        ? 'bg-red-700 text-white shadow-[0_4px_12px_rgba(185,28,28,0.28)]'
                        : 'bg-white/75 text-slate-700 hover:bg-white hover:text-red-700 border border-white/90 shadow-[0_1px_4px_rgba(15,23,42,0.04)]'
                    }`}
                  >
                    <span>{isGuideOpen ? 'Ocultar guia' : 'Como estudar'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isGuideOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* 4-Step Tactical Guide (Minimalist grouped inset list, no border-l-4 clutter) */}
                {isGuideOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1">
                    <div className="rounded-2xl bg-white/70 border border-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] divide-y divide-slate-900/[0.06]">
                      {/* Step 1: What to read */}
                      <div className="p-4 sm:px-5 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-800">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>1. O que ler (Lei seca exata)</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed pl-5.5">
                          {topic.read}
                        </p>
                      </div>

                      {/* Step 2: FGV Trap */}
                      <div className="p-4 sm:px-5 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>2. Onde a FGV tenta te derrubar</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed pl-5.5">
                          {topic.trap}
                        </p>
                      </div>

                      {/* Step 3: Resolution Hack */}
                      <div className="p-4 sm:px-5 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
                          <Lightbulb className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>3. Como derrotar a FGV (Truque de resolução)</span>
                        </div>
                        <p className="text-sm text-slate-800 leading-relaxed pl-5.5">
                          {topic.hack}
                        </p>
                      </div>

                      {/* Step 4: Immediate Practical Action */}
                      <div className="p-4 sm:px-5 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>4. Passo prático agora</span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed pl-5.5">
                          {topic.action}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
