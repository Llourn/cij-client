export type KanaCharacterSet = {
  hiraganaBase: boolean;
  hiraganaDakuten: boolean;
  hiraganaHandakuten: boolean;
  hiraganaCombo: boolean;
  katakanaBase: boolean;
  katakanaDakuten: boolean;
  katakanaHandakuten: boolean;
  katakanaCombo: boolean;
};

export interface KanaQueueItem {
  position: number;
  collectionName: string;
}

export interface KanaList {
  name: string;
  collection: KanaData[];
}

export interface KanaData {
  kana: string;
  readings: string[];
  guessedCorrectly: boolean;
}
