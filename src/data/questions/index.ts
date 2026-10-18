import { Question } from '../../types/quiz';
import { MINGGU_1_QUESTIONS } from './m1';
import { MINGGU_2_QUESTIONS } from './m2';
import { MINGGU_3_QUESTIONS } from './m3';
import { MINGGU_4_QUESTIONS } from './m4';
import { MINGGU_5_QUESTIONS } from './m5';
import { MINGGU_6_QUESTIONS } from './m6';
import { MINGGU_7_QUESTIONS } from './m7';
import { MINGGU_8_QUESTIONS } from './m8';

export const ALL_QUESTIONS_BY_WEEK: Record<number, Question[]> = {
  1: MINGGU_1_QUESTIONS,
  2: MINGGU_2_QUESTIONS,
  3: MINGGU_3_QUESTIONS,
  4: MINGGU_4_QUESTIONS,
  5: MINGGU_5_QUESTIONS,
  6: MINGGU_6_QUESTIONS,
  7: MINGGU_7_QUESTIONS,
  8: MINGGU_8_QUESTIONS,
};

export const ALL_400_QUESTIONS: Question[] = [
  ...MINGGU_1_QUESTIONS,
  ...MINGGU_2_QUESTIONS,
  ...MINGGU_3_QUESTIONS,
  ...MINGGU_4_QUESTIONS,
  ...MINGGU_5_QUESTIONS,
  ...MINGGU_6_QUESTIONS,
  ...MINGGU_7_QUESTIONS,
  ...MINGGU_8_QUESTIONS,
];

export const QUESTION_MAP: Map<string, Question> = new Map(
  ALL_400_QUESTIONS.map(q => [q.id, q])
);

export function getQuestionsForWeek(weekId: number): Question[] {
  if (weekId >= 1 && weekId <= 8) {
    return ALL_QUESTIONS_BY_WEEK[weekId] || [];
  }
  return ALL_400_QUESTIONS;
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_MAP.get(id);
}
