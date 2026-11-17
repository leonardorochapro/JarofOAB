import React, { useMemo } from 'react';
import { Award, Check, Compass, Droplets, Flame, Lock, Trophy } from 'lucide-react';
import { SYLLABUS } from '../data/syllabus';
import { getLocalDateKey } from './WeeklyProgressChart';

interface AchievementsProps {
  pct: number;
  completedMap: Record<string, boolean>;
  completedAt: Record<string, string>;
}

interface Milestone {
  id: string;
  label: string;
  hint: string;
  unlocked: boolean;
  icon: React.ReactNode;
}

function calculateStudyStreak(completedAt: Record<string, string>): number {
  const uniqueDates = new Set(
    Object.values(completedAt).filter(
      (value): value is string => typeof value === 'string' && value.length === 10
    )
  );
  if (uniqueDates.size === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = getLocalDateKey(today);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = getLocalDateKey(yesterday);

  // Streak must include today or yesterday to be active
  let cursor = new Date(today);
  if (!uniqueDates.has(todayKey)) {
    if (!uniqueDates.has(yesterdayKey)) {
      return 0;
    }
    cursor = yesterday;
  }

  let streak = 0;
  while (uniqueDates.has(getLocalDateKey(cursor))) {
    streak += 1;
    const prev = new Date(cursor);
    prev.setDate(cursor.getDate() - 1);
    cursor = prev;
  }
  return streak;
}

export const Achievements: React.FC<AchievementsProps> = ({
  pct,
  completedMap,
  completedAt,
}) => {
  const { milestones, unlockedCount, streakDays } = useMemo(() => {
    const masteredSubjects = SYLLABUS.filter((subject) =>
      subject.topics.every((topic) => Boolean(completedMap[topic.id]))
    ).length;

    const streak = calculateStudyStreak(completedAt);

    const items: Milestone[] = [
      {
        id: 'progress-10',
        label: '10% de progresso',
        hint: pct >= 10 ? 'Desbloqueada' : 'Alcance 10% do jarro',
        unlocked: pct >= 10,
        icon: <Droplets className="w-4 h-4" aria-hidden="true" />,
      },
      {
        id: 'study-streak',
        label: 'Sequência de estudos',
        hint:
          streak >= 2
            ? `${streak} dias seguidos`
            : streak === 1
            ? '1 de 2 dias seguidos'
            : 'Estude 2 dias seguidos',
        unlocked: streak >= 2,
        icon: <Flame className="w-4 h-4" aria-hidden="true" />,
      },
      {
        id: 'first-subject',
        label: '1ª matéria dominada',
        hint:
          masteredSubjects >= 1
            ? `${masteredSubjects} ${
                masteredSubjects === 1 ? 'matéria completa' : 'matérias completas'
              }`
            : 'Conclua 1 matéria inteira',
        unlocked: masteredSubjects >= 1,
        icon: <Award className="w-4 h-4" aria-hidden="true" />,
      },
      {
        id: 'progress-50',
        label: '50% do edital',
        hint: pct >= 50 ? 'Metade concluída' : 'Alcance 50% do jarro',
        unlocked: pct >= 50,
        icon: <Compass className="w-4 h-4" aria-hidden="true" />,
      },
      {
        id: 'progress-100',
        label: 'Jarro completo',
        hint: pct === 100 ? '26 tópicos dominados' : 'Conclua todos os tópicos',
        unlocked: pct === 100,
        icon: <Trophy className="w-4 h-4" aria-hidden="true" />,
      },
    ];

    return {
      milestones: items,
      unlockedCount: items.filter((item) => item.unlocked).length,
      streakDays: streak,
    };
  }, [pct, completedMap, completedAt]);

  return (
    <div className="pt-5 mt-6 border-t border-slate-900/[0.06] space-y-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Conquistas
          </h3>
          <span className="text-xs text-slate-500">
            · Marcos da sua jornada
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
          <span className="font-semibold text-slate-800">
            {unlockedCount} de {milestones.length} desbloqueadas
          </span>
          {streakDays > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Sequência atual: {streakDays}{' '}
                {streakDays === 1 ? 'dia' : 'dias'}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {milestones.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 ${
              item.unlocked
                ? 'bg-white/75 border-red-700/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_18px_-10px_rgba(185,28,28,0.22)]'
                : 'bg-white/35 border-white/65 opacity-70'
            }`}
          >
            {/* Small Badge Icon */}
            <div
              className={`relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                item.unlocked
                  ? 'bg-gradient-to-b from-red-500 to-red-700 text-white border-red-400/40 shadow-[0_4px_12px_-2px_rgba(185,28,28,0.4)]'
                  : 'bg-slate-900/[0.04] text-slate-400 border-white/80'
              }`}
            >
              {item.icon}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-white ${
                  item.unlocked
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {item.unlocked ? (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                ) : (
                  <Lock className="w-2 h-2" />
                )}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div
                className={`text-xs font-semibold truncate ${
                  item.unlocked ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {item.hint}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
