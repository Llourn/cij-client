import KanaquizConfig from "@/src/components/kanaquiz/kanaquiz-config";
import KanaquizGame from "@/src/components/kanaquiz/kanaquiz-game";
import { KanaOptions } from "@/src/types/kanaquiz";
import { Transition } from "@mantine/core";
import { useState } from "react";

const TRANSITION_DURATION = 250;

enum gameStatus {
  CONFIG = "config",
  PLAY = "play",
  LOADING = "loading",
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
    setGameState(gameStatus.LOADING);
    setTimeout(() => {
      setGameState(gameStatus.PLAY);
    }, TRANSITION_DURATION);
  };

  return (
    <>
      <Transition
        mounted={gameState === gameStatus.CONFIG}
        transition="pop"
        duration={TRANSITION_DURATION}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            <KanaquizConfig startGame={startGame} />
          </div>
        )}
      </Transition>
      <Transition
        mounted={gameState === gameStatus.PLAY}
        transition="pop"
        duration={TRANSITION_DURATION}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            <KanaquizGame kanaOptions={kanaOptions} />
          </div>
        )}
      </Transition>
    </>
  );
}
