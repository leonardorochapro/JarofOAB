import React, { useMemo, useState } from 'react';
import { CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import {
  OAB_EXAM_OPTIONS,
  OAB_QUESTIONS,
  OAB_SUBJECT_OPTIONS,
  OabQuestion,
} from '../data/questions';

export interface QuizStats {
  answered: number;
  correct: number;
  answeredIds: string[];
}

interface QuestionOfTheDayProps {
  quizStats: QuizStats;
  onRecordAnswer: (questionId: string, isCorrect: boolean) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

const CORE_SUBJECT_IDS = new Set([
  'etica',
  'const',
  'civil',
  'proc_civil',
  'penal',
  'proc_penal',
]);

function filterQuestions(subjectFilter: string, examFilter: string): OabQuestion[] {
  return OAB_QUESTIONS.filter((q) => {
    if (subjectFilter === 'core' && !CORE_SUBJECT_IDS.has(q.subjectId)) {
      return false;
    }
    if (
      subjectFilter !== 'all' &&
      subjectFilter !== 'core' &&
      q.subjectId !== subjectFilter
    ) {
      return false;
    }
    if (examFilter !== 'all' && String(q.examNumber) !== examFilter) {
      return false;
    }
    return true;
  });
}

function pickRandomQuestion(
  candidates: OabQuestion[],
  excludeId?: string,
  answeredIds: string[] = []
): OabQuestion {
  const safePool = candidates.length > 0 ? candidates : OAB_QUESTIONS;
  const answeredSet = new Set(answeredIds);
  const unansweredPool = safePool.filter(
    (q) => q.id !== excludeId && !answeredSet.has(q.id)
  );
  const pool =
    unansweredPool.length > 0
      ? unansweredPool
      : safePool.filter((q) => q.id !== excludeId);

  const source = pool.length > 0 ? pool : safePool;
  return source[Math.floor(Math.random() * source.length)];
}

export const QuestionOfTheDay: React.FC<QuestionOfTheDayProps> = ({
  quizStats,
  onRecordAnswer,
}) => {
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [examFilter, setExamFilter] = useState<string>('all');

  const filteredPool = useMemo(
    () => filterQuestions(subjectFilter, examFilter),
    [subjectFilter, examFilter]
  );

  const [question, setQuestion] = useState<OabQuestion>(() =>
    pickRandomQuestion(OAB_QUESTIONS, undefined, quizStats.answeredIds)
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const accuracyPct = useMemo(() => {
    if (quizStats.answered === 0) return 0;
    return Math.round((quizStats.correct / quizStats.answered) * 100);
  }, [quizStats.answered, quizStats.correct]);

  const hasAnswered = selectedIndex !== null;
  const isCorrectSelection =
    hasAnswered && selectedIndex === question.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedIndex(idx);
    onRecordAnswer(question.id, idx === question.correctIndex);
  };

  const handleNextQuestion = () => {
    const next = pickRandomQuestion(
      filteredPool,
      question.id,
      quizStats.answeredIds
    );
    setQuestion(next);
    setSelectedIndex(null);
  };

  const handleSubjectFilterChange = (nextSubject: string) => {
    setSubjectFilter(nextSubject);
    let nextPool = filterQuestions(nextSubject, examFilter);
    if (nextPool.length === 0) {
      setExamFilter('all');
      nextPool = filterQuestions(nextSubject, 'all');
    }
    setQuestion(pickRandomQuestion(nextPool, question.id, quizStats.answeredIds));
    setSelectedIndex(null);
  };

  const handleExamFilterChange = (nextExam: string) => {
    setExamFilter(nextExam);
    let nextPool = filterQuestions(subjectFilter, nextExam);
    if (nextPool.length === 0) {
      setSubjectFilter('all');
      nextPool = filterQuestions('all', nextExam);
    }
    setQuestion(pickRandomQuestion(nextPool, question.id, quizStats.answeredIds));
    setSelectedIndex(null);
  };

  return (
    <section
      aria-label="Questão do Dia da OAB"
      className="liquid-glass rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 space-y-5"
    >
      {/* Quiet Top Metadata Bar & Performance */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-red-700">Questão do dia</span>
          <span aria-hidden="true" className="text-slate-300">
            ·
          </span>
          <span className="font-semibold text-slate-800">
            {question.subjectName}
          </span>
          <span aria-hidden="true" className="text-slate-300">
            ·
          </span>
          <span className="text-slate-500">{question.examRef}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
          <span>
            Desempenho:{' '}
            <strong className="font-semibold text-slate-800">
              {quizStats.correct}/{quizStats.answered}
            </strong>
          </span>
          {quizStats.answered > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-700">
                {accuracyPct}% de acerto
              </span>
            </>
          )}
        </div>
      </div>

      {/* Subtle Minimalist Filters (Subject & Official Exam) */}
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="sr-only" htmlFor="oab-subject-filter">
          Filtrar por matéria
        </label>
        <select
          id="oab-subject-filter"
          value={subjectFilter}
          onChange={(e) => handleSubjectFilterChange(e.target.value)}
          className="px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-medium text-slate-700 bg-white/60 hover:bg-white/85 border border-white/85 shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/35"
        >
          <option value="all">Todas as matérias ({OAB_QUESTIONS.length})</option>
          <option value="core">Núcleo duro (6 matérias principais)</option>
          {OAB_SUBJECT_OPTIONS.map((subj) => (
            <option key={subj.id} value={subj.id}>
              {subj.name} ({subj.count})
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="oab-exam-filter">
          Filtrar por prova
        </label>
        <select
          id="oab-exam-filter"
          value={examFilter}
          onChange={(e) => handleExamFilterChange(e.target.value)}
          className="px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-medium text-slate-700 bg-white/60 hover:bg-white/85 border border-white/85 shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/35"
        >
          <option value="all">Todas as provas (36º ao 45º Exame)</option>
          {OAB_EXAM_OPTIONS.map((exam) => (
            <option key={exam.examNumber} value={String(exam.examNumber)}>
              {exam.label} ({exam.count})
            </option>
          ))}
        </select>

        <span className="text-[11px] text-slate-500 tabular-nums ml-auto">
          {filteredPool.length} {filteredPool.length === 1 ? 'questão disponível' : 'questões disponíveis'}
        </span>
      </div>

      {/* Question Enunciado (explicitly informing Matéria and Prova inside the enunciado) */}
      <p className="text-sm sm:text-[15px] font-medium text-slate-900 leading-relaxed">
        <span className="font-bold text-red-700">{question.subjectName}</span>
        <span className="text-slate-400"> · </span>
        <span className="font-semibold text-slate-700">
          {question.examName} ({question.examDate} · Questão {question.questionNumber})
        </span>
        <span className="text-slate-400"> — </span>
        {question.prompt}
      </p>

      {/* Answer Options */}
      <div
        role="radiogroup"
        aria-label="Alternativas da questão"
        className="space-y-2.5"
      >
        {question.options.map((optionText, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrectOption = idx === question.correctIndex;

          let rowStyle =
            'bg-white/60 hover:bg-white/85 border-white/85 text-slate-800';
          let letterStyle =
            'bg-slate-900/[0.05] text-slate-700 border-white/80';

          if (hasAnswered) {
            if (isCorrectOption) {
              rowStyle =
                'bg-emerald-50/85 border-emerald-500/35 text-slate-900 shadow-[0_6px_18px_-10px_rgba(5,150,105,0.28)]';
              letterStyle = 'bg-emerald-600 text-white border-emerald-500';
            } else if (isSelected) {
              rowStyle =
                'bg-red-50/85 border-red-500/35 text-slate-900 shadow-[0_6px_18px_-10px_rgba(185,28,28,0.22)]';
              letterStyle = 'bg-red-600 text-white border-red-500';
            } else {
              rowStyle = 'bg-white/35 border-white/60 text-slate-500 opacity-75';
              letterStyle = 'bg-slate-900/[0.04] text-slate-400 border-white/60';
            }
          }

          return (
            <button
              key={OPTION_LETTERS[idx]}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={hasAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-3.5 sm:px-4 rounded-2xl border transition-all duration-150 flex items-start gap-3.5 min-h-[48px] ${
                hasAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.995]'
              } ${rowStyle} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0 mt-0.5 transition-colors ${letterStyle}`}
              >
                {OPTION_LETTERS[idx]}
              </span>

              <span className="text-sm leading-relaxed flex-1">
                {optionText}
              </span>

              {hasAnswered && isCorrectOption && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Gabarito</span>
                </span>
              )}

              {hasAnswered && isSelected && !isCorrectOption && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 shrink-0 mt-1">
                  <XCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Sua escolha</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback + Official Gabarito Reference */}
      {hasAnswered && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl p-4 sm:p-5 border space-y-1.5 ${
            isCorrectSelection
              ? 'bg-emerald-50/75 border-emerald-500/25'
              : 'bg-amber-50/75 border-amber-500/25'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
            {isCorrectSelection ? (
              <>
                <CheckCircle2
                  className="w-4 h-4 text-emerald-700 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-emerald-900">
                  Resposta correta! Você acertou esta questão oficial da FGV.
                </span>
              </>
            ) : (
              <>
                <XCircle
                  className="w-4 h-4 text-red-700 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-slate-900">
                  Resposta incorreta · O gabarito oficial é a alternativa{' '}
                  {OPTION_LETTERS[question.correctIndex]}.
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-slate-700 leading-relaxed pl-6">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Footer Action */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <span className="text-xs text-slate-500">
          {hasAnswered
            ? 'Desempenho salvo automaticamente.'
            : 'Selecione uma alternativa para conferir o gabarito oficial.'}
        </span>

        <button
          type="button"
          onClick={handleNextQuestion}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-semibold text-slate-700 bg-white/75 hover:bg-white border border-white/90 shadow-[0_2px_8px_rgba(15,23,42,0.05)] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
          <span>Outra questão</span>
        </button>
      </div>
    </section>
  );
};
