export type KanaOptions = {
  hiraganaBase: boolean;
  hiraganaDakuten: boolean;
  hiraganaHandakuten: boolean;
  hiraganaCombo: boolean;
  katakanaBase: boolean;
  katakanaDakuten: boolean;
  katakanaHandakuten: boolean;
  katakanaCombo: boolean;
};

export interface KanaCollection {
  hiraganaBase: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  hiraganaDakuten: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  hiraganaHandakuten: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  hiraganaCombo: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  katakanaBase: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  katakanaDakuten: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  katakanaHandakuten: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
  katakanaCombo: { kana: string; readings: string[]; guessedCorrectly: boolean }[];
}

export interface KanaQueueItem {
  position: number;
  collectionName: string;
}

export interface KanaCollection {
  name: string;
  collection: KanaItem[];
}

export interface KanaItem {
  kana: string;
  readings: string[];
  guessedCorrectly: boolean;
}