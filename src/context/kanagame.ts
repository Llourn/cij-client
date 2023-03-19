import { createContext, useContext } from "react";

export interface KanaOptions {
  hiraganaBase: boolean;
  hiraganaDakuten: boolean;
  hiraganaHandakuten: boolean;
  hiraganaCombo: boolean;
  katakanaBase: boolean;
  katakanaDakuten: boolean;
  katakanaHandakuten: boolean;
  katakanaCombo: boolean;
}

const defaultState: KanaOptions = {
  hiraganaBase: true,
  hiraganaDakuten: true,
  hiraganaHandakuten: true,
  hiraganaCombo: true,
  katakanaBase: true,
  katakanaDakuten: true,
  katakanaHandakuten: true,
  katakanaCombo: true,
};

const KanaContext = createContext(defaultState);
