/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Achievements } from './components/Achievements';
import { FocusConsole } from './components/FocusConsole';
import { LiquidGlassJar } from './components/LiquidGlassJar';
import { QuestionOfTheDay, QuizStats } from './components/QuestionOfTheDay';
import { ResetModal } from './components/ResetModal';
import { SubjectAccordion } from './components/SubjectAccordion';
import {
  getLocalDateKey,
  WeeklyProgressChart,
} from './components/WeeklyProgressChart';
import { ENERGY_CONFIG, EnergyLevel, SYLLABUS } from './data/syllabus';

const STORAGE_KEY = 'oabQuestGuidedV4';

interface PersistedState {
  completed: Record<string, boolean>;
  completedAt: Record<string, string>;
  queueIndex: number;
  quizStats: QuizStats;
}

const DEFAULT_QUIZ_STATS: QuizStats = {
  answered: 0,
  correct: 0,
  answeredIds: [],
};

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      const validIndex =
        typeof parsed.queueIndex === 'number' &&
        parsed.queueIndex >= 0 &&
        parsed.queueIndex < SYLLABUS.length
          ? parsed.queueIndex
          : 0;
      const rawStats = parsed.quizStats;
      const quizStats: QuizStats =
        rawStats && typeof rawStats === 'object'
          ? {
              answered:
                typeof rawStats.answered === 'number' ? rawStats.answered : 0,
              correct:
                typeof rawStats.correct === 'number' ? rawStats.correct : 0,
              answeredIds: Array.isArray(rawStats.answeredIds)
                ? rawStats.answeredIds.filter(
                    (id): id is string => typeof id === 'string'
                  )
                : [],
            }
          : DEFAULT_QUIZ_STATS;

      return {
        completed:
          parsed.completed && typeof parsed.completed === 'object'
            ? parsed.completed
            : {},
        completedAt:
          parsed.completedAt && typeof parsed.completedAt === 'object'
            ? parsed.completedAt
            : {},
        queueIndex: validIndex,
        quizStats,
      };
    }
  } catch {
    // Fallback to clean initial state if localStorage is unavailable
  }
  return {
    completed: {},
    completedAt: {},
    queueIndex: 0,
    quizStats: DEFAULT_QUIZ_STATS,
  };
}

export default function App() {
  const [persisted, setPersisted] = useState<PersistedState>(loadInitialState);
  const [energy, setEnergy] = useState<EnergyLevel>('low');
  const [timerSeconds, setTimerSeconds] = useState<number>(ENERGY_CONFIG.low.mins * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>(() => {
    const initial = loadInitialState();
    const activeId = SYLLABUS[initial.queueIndex]?.id ?? SYLLABUS[0].id;
    return { [activeId]: true };
  });
  const [openGuides, setOpenGuides] = useState<Record<string, boolean>>({});
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'pending'>('all');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 4200);
  }, []);

  // Persist completed topics and queue position
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // Ignore storage quota errors
    }
  }, [persisted]);

  // Countdown interval
  useEffect(() => {
    if (!isRunning) return;
    const intervalId = window.setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          setIsRunning(false);
          setIsFinished(true);
          showToast('Bloco finalizado! Faça 15 minutos de descanso sensorial sem telas.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, showToast]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const { totalTopics, doneTopics, pct, level } = useMemo(() => {
    let total = 0;
    let done = 0;
    for (const subject of SYLLABUS) {
      for (const topic of subject.topics) {
        total += 1;
        if (persisted.completed[topic.id]) {
          done += 1;
        }
      }
    }
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    const currentLevel = Math.floor(done / 5) + 1;
    return {
      totalTopics: total,
      doneTopics: done,
      pct: percentage,
      level: currentLevel,
    };
  }, [persisted.completed]);

  const currentSubject = SYLLABUS[persisted.queueIndex] ?? SYLLABUS[0];

  const visibleSubjects = useMemo(() => {
    if (subjectFilter === 'all') return SYLLABUS;
    return SYLLABUS.filter((subj) =>
      subj.topics.some((topic) => !persisted.completed[topic.id])
    );
  }, [subjectFilter, persisted.completed]);

  const handleSelectEnergy = useCallback((levelKey: EnergyLevel) => {
    setEnergy(levelKey);
    setIsRunning(false);
    setIsFinished(false);
    setTimerSeconds(ENERGY_CONFIG[levelKey].mins * 60);
  }, []);

  const handleResetTimer = useCallback(() => {
    setIsRunning(false);
    setIsFinished(false);
    setTimerSeconds(ENERGY_CONFIG[energy].mins * 60);
  }, [energy]);

  const handleToggleTimer = useCallback(() => {
    if (isFinished || timerSeconds === 0) {
      setIsFinished(false);
      setTimerSeconds(ENERGY_CONFIG[energy].mins * 60);
      setIsRunning(true);
      return;
    }
    setIsRunning((prev) => !prev);
  }, [energy, isFinished, timerSeconds]);

  const handleAdvanceQueue = useCallback(() => {
    const nextIdx = (persisted.queueIndex + 1) % SYLLABUS.length;
    const nextSubject = SYLLABUS[nextIdx];
    setPersisted((prev) => ({ ...prev, queueIndex: nextIdx }));
    setOpenSubjects((prev) => ({ ...prev, [nextSubject.id]: true }));
    setIsRunning(false);
    setIsFinished(false);
    setTimerSeconds(ENERGY_CONFIG[energy].mins * 60);
    showToast(`Fila avançada para: ${nextSubject.number}. ${nextSubject.name}`);
  }, [energy, persisted.queueIndex, showToast]);

  const handleJumpToActive = useCallback(() => {
    setOpenSubjects((prev) => ({ ...prev, [currentSubject.id]: true }));
    const el = document.getElementById(`subject-${currentSubject.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSubject.id]);

  const handleToggleSubject = useCallback((subjectId: string) => {
    setOpenSubjects((prev) => ({ ...prev, [subjectId]: !prev[subjectId] }));
  }, []);

  const handleToggleTopic = useCallback(
    (topicId: string) => {
      setPersisted((prev) => {
        const nextCompleted = { ...prev.completed };
        const nextCompletedAt = { ...prev.completedAt };
        if (nextCompleted[topicId]) {
          delete nextCompleted[topicId];
          delete nextCompletedAt[topicId];
        } else {
          nextCompleted[topicId] = true;
          nextCompletedAt[topicId] = getLocalDateKey(new Date());
          showToast('Tópico concluído! O Jarro da Aprovação subiu.');
        }
        return {
          ...prev,
          completed: nextCompleted,
          completedAt: nextCompletedAt,
        };
      });
    },
    [showToast]
  );

  const handleToggleGuide = useCallback((topicId: string) => {
    setOpenGuides((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  }, []);

  const handleRecordQuizAnswer = useCallback(
    (questionId: string, isCorrect: boolean) => {
      setPersisted((prev) => {
        const nextIds = prev.quizStats.answeredIds.includes(questionId)
          ? prev.quizStats.answeredIds
          : [...prev.quizStats.answeredIds, questionId];
        return {
          ...prev,
          quizStats: {
            answered: prev.quizStats.answered + 1,
            correct: prev.quizStats.correct + (isCorrect ? 1 : 0),
            answeredIds: nextIds,
          },
        };
      });
    },
    []
  );

  const handleConfirmReset = useCallback(() => {
    setPersisted({
      completed: {},
      completedAt: {},
      queueIndex: 0,
      quizStats: DEFAULT_QUIZ_STATS,
    });
    setOpenSubjects({ [SYLLABUS[0].id]: true });
    setOpenGuides({});
    setIsResetModalOpen(false);
    handleResetTimer();
    showToast('Jarro esvaziado e fila reiniciada.');
  }, [handleResetTimer, showToast]);

  return (
    <div className="relative min-h-screen text-slate-900">
      {/* Subtle atmospheric refraction backdrop for iOS Liquid Glass */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 overflow-hidden bg-[#eef2f7]"
      >
        <div className="absolute -top-36 -left-24 w-[520px] h-[520px] rounded-full bg-sky-200/45 blur-[110px]" />
        <div className="absolute top-12 right-[-120px] w-[460px] h-[460px] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute bottom-[-160px] left-1/3 w-[560px] h-[560px] rounded-full bg-indigo-100/55 blur-[130px]" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24 space-y-8">
        {/* Clean Minimalist Header */}
        <header className="flex items-center justify-between gap-4 py-2">
          <a
            href="#top"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            OAB Quest
          </a>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 whitespace-nowrap">
            <span>Guia tático passo a passo</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-slate-700 font-semibold">
              Nível {level}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{pct}% do jarro</span>
          </div>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 liquid-glass-subtle hover:bg-white/75 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reiniciar</span>
          </button>
        </header>

        {/* Hero Dashboard: Unified Liquid Glass Vessel & Guided Focus Console */}
        <section
          aria-label="Painel de progresso e bloco de foco"
          className="liquid-glass rounded-[28px] sm:rounded-[32px] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
            <div className="md:pr-6 md:border-r md:border-slate-900/[0.06] flex justify-center">
              <LiquidGlassJar
                doneTopics={doneTopics}
                totalTopics={totalTopics}
                pct={pct}
                level={level}
              />
            </div>

            <FocusConsole
              currentSubject={currentSubject}
              energy={energy}
              onSelectEnergy={handleSelectEnergy}
              timerSeconds={timerSeconds}
              isRunning={isRunning}
              isFinished={isFinished}
              onToggleTimer={handleToggleTimer}
              onResetTimer={handleResetTimer}
              onAdvanceQueue={handleAdvanceQueue}
              onJumpToActive={handleJumpToActive}
            />
          </div>

          <WeeklyProgressChart completedAt={persisted.completedAt} />

          <Achievements
            pct={pct}
            completedMap={persisted.completed}
            completedAt={persisted.completedAt}
          />
        </section>

        {/* Questão do Dia */}
        <QuestionOfTheDay
          quizStats={persisted.quizStats}
          onRecordAnswer={handleRecordQuizAnswer}
        />

        {/* Core Subjects Section */}
        <section aria-label="Matérias do núcleo duro" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="space-y-0.5">
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                Matérias do núcleo duro
              </h2>
              <p className="text-xs text-slate-500">
                Sem calendário rígido. Toque em um tópico para abrir o roteiro completo.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filtrar matérias"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/[0.045] border border-white/70"
            >
              <button
                type="button"
                onClick={() => setSubjectFilter('all')}
                aria-pressed={subjectFilter === 'all'}
                className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  subjectFilter === 'all'
                    ? 'bg-white/95 text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.06)]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas ({SYLLABUS.length})
              </button>
              <button
                type="button"
                onClick={() => setSubjectFilter('pending')}
                aria-pressed={subjectFilter === 'pending'}
                className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  subjectFilter === 'pending'
                    ? 'bg-white/95 text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.06)]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pendentes
              </button>
            </div>
          </div>

          {visibleSubjects.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-8 text-center space-y-2">
              <p className="text-base font-semibold text-slate-900">
                Todos os 26 tópicos foram concluídos.
              </p>
              <p className="text-sm text-slate-600">
                Seu Jarro da Aprovação está em 100%. Continue revisando pelos truques ou reinicie quando quiser.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {visibleSubjects.map((subject) => {
                const originalIndex = SYLLABUS.findIndex((s) => s.id === subject.id);
                return (
                  <SubjectAccordion
                    key={subject.id}
                    subject={subject}
                    isCurrentQueue={originalIndex === persisted.queueIndex}
                    isExpanded={Boolean(openSubjects[subject.id])}
                    onToggleExpand={() => handleToggleSubject(subject.id)}
                    completedMap={persisted.completed}
                    openGuides={openGuides}
                    onToggleTopic={handleToggleTopic}
                    onToggleGuide={handleToggleGuide}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Floating Liquid Glass Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-md px-5 py-3 rounded-2xl bg-slate-900/85 backdrop-blur-2xl text-white text-sm font-medium shadow-[0_16px_36px_-8px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] border border-white/15 text-center transition-all duration-300 pointer-events-none ${
          toastVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        }`}
      >
        {toastMessage}
      </div>

      {/* Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onCancel={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
