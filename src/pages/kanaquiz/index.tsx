import KanaquizConfig from "@/src/components/kanaquiz/kanaquiz-config";
import KanaquizGame from "@/src/components/kanaquiz/kanaquiz-game";
import { KanaOptions } from "@/src/types/kanaquiz";
import { useState } from "react";

enum gameStatus {
  CONFIG = "config",
  PLAY = "play",
  COMPLETE = "complete",
}

export default function Kanaquiz() {
  const [kanaOptions, setKanaOptions] = useState<KanaOptions>({
    hiraganaBase: false,
    hiraganaDakuten: false,
    hiraganaHandakuten: false,
    hiraganaCombo: false,
    katakanaBase: false,
    katakanaDakuten: false,
    katakanaHandakuten: false,
    katakanaCombo: false,
  });

  const [gameState, setGameState] = useState(gameStatus.CONFIG);

  const startGame = (options: KanaOptions) => {
    setKanaOptions(options);
    setGameState(gameStatus.PLAY);
  };

  return (
    <>
      {gameState === gameStatus.CONFIG && (
        <KanaquizConfig startGame={startGame} />
      )}
      {gameState === gameStatus.PLAY && (
        <KanaquizGame kanaOptions={kanaOptions} />
      )}
    </>
  );
}
