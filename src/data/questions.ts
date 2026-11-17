import rawQuestions from './questions.json';

export interface OabQuestion {
  id: string;
  examNumber: number;
  examName: string;
  examDate: string;
  questionNumber: number;
  subjectId: string;
  subjectName: string;
  examRef: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const OAB_QUESTIONS: OabQuestion[] = rawQuestions as OabQuestion[];

export interface SubjectFilterOption {
  id: string;
  name: string;
  count: number;
}

export const OAB_SUBJECT_OPTIONS: SubjectFilterOption[] = (() => {
  const map = new Map<string, { name: string; count: number }>();
  for (const q of OAB_QUESTIONS) {
    const existing = map.get(q.subjectId);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(q.subjectId, { name: q.subjectName, count: 1 });
    }
  }
  return Array.from(map.entries())
    .map(([id, info]) => ({ id, name: info.name, count: info.count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
})();

export const OAB_EXAM_OPTIONS: { examNumber: number; label: string; count: number }[] = (() => {
  const map = new Map<number, { label: string; count: number }>();
  for (const q of OAB_QUESTIONS) {
    const existing = map.get(q.examNumber);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(q.examNumber, {
        label: `${q.examNumber}º Exame (${q.examDate})`,
        count: 1,
      });
    }
  }
  return Array.from(map.entries())
    .map(([examNumber, info]) => ({
      examNumber,
      label: info.label,
      count: info.count,
    }))
    .sort((a, b) => b.examNumber - a.examNumber);
})();
