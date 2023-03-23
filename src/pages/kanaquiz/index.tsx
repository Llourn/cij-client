import KanaquizConfig from "@/src/components/kanaquiz-setup";
import KanaquizGame from "@/src/components/kanaquiz-game";
import KanaquizResults from "@/src/components/kanaquiz-results";
import { KanaList, KanaCharacterSet } from "@/src/types/kanaquiz";
import { Transition } from "@mantine/core";
import { useState } from "react";
import CountDown from "@/src/components/kanaquiz-game/count-down";

const TRANSITION_DURATION = 250;

enum gameStatus {
  CONFIG = "config",
  COUNTDOWN = "countdown",
  PLAY = "play",
  LOADING = "loading",
  COMPLETE = "complete",
}

export default function Kanaquiz() {
  const [kanaSet, setKanaSet] = useState<KanaCharacterSet>({
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
  const [kanaPool, setKanaPool] = useState<KanaList[]>();

  const resetGame = () => {
    setGameState(gameStatus.LOADING);
    setTimeout(() => {
      setKanaPool(undefined);
      setGameState(gameStatus.CONFIG);
    }, TRANSITION_DURATION);
  };

  const startCountdown = (options: KanaCharacterSet) => {
    setKanaSet(options);
    setGameState(gameStatus.LOADING);
    setTimeout(() => {
      setGameState(gameStatus.COUNTDOWN);
    }, TRANSITION_DURATION);
  };

  const startGame = () => {
    setGameState(gameStatus.LOADING);
    setTimeout(() => {
      setGameState(gameStatus.PLAY);
    }, TRANSITION_DURATION);
  };

  const showStats = () => {
    setGameState(gameStatus.LOADING);
    setTimeout(() => {
      setGameState(gameStatus.COMPLETE);
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
            <KanaquizConfig startCountDown={startCountdown} />
          </div>
        )}
      </Transition>
      <Transition
        mounted={gameState === gameStatus.COUNTDOWN}
        transition="pop"
        duration={TRANSITION_DURATION}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            <CountDown startGame={startGame} />
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
            <KanaquizGame
              kanaOptions={kanaSet}
              kanaPool={kanaPool}
              setKanaPool={setKanaPool}
              showStats={showStats}
            />
          </div>
        )}
      </Transition>
      <Transition
        mounted={gameState === gameStatus.COMPLETE}
        transition="pop"
        duration={TRANSITION_DURATION}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            <KanaquizResults kanaPool={kanaPool} resetGame={resetGame} />
          </div>
        )}
      </Transition>
    </>
  );
}
