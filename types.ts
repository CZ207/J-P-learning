export interface Word {
  jp: string;
  cn: string;
  kana?: string;
  tone?: string;        // e.g., "◎", "①", "③"
  pos?: string;         // e.g., "动1", "动2", "名", "形1", "形2"
  transitivity?: '自' | '他' | '自·他'; // Transitivity for verbs
  group?: 1 | 2 | 3;    // Verb Group for conjugation logic
}

export interface GrammarPoint {
  title: string;
  construction?: string;
  explanation: string;
  examples: string[];
}

export interface Lesson {
  id: number;
  title: string;
  words: Word[];
  grammar: GrammarPoint[];
}

export type ViewState = 'HOME' | 'LESSON' | 'AI_TUTOR' | 'PROFILE' | 'KANA';

export interface UserProgress {
  lastLessonId: number;
  completedLessons: number[];
  darkMode: boolean;
}

export interface Kana {
  h: string; // Hiragana
  k: string; // Katakana
  r: string; // Romaji
}