import KanaquizConfig from "@/src/components/kanaquiz-setup";
import KanaquizGame from "@/src/components/kanaquiz-game";
import KanaquizResults from "@/src/components/kanaquiz-results";
import { KanaList, KanaCharacterSet, KanaData } from "@/src/types/kanaquiz";
import kanaData from "../../data/kana.json";
import { Transition } from "@mantine/core";
import { useState } from "react";
import CountDown from "@/src/components/kanaquiz/count-down";

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
  const [timeCompleted, setTimeCompleted] = useState<number>(0);

  const resetGame = () => {
    setGameState(gameStatus.LOADING);
    setTimeout(() => {
      for (const key in kanaData) {
        if (Object.prototype.hasOwnProperty.call(kanaData, key)) {
          const element = kanaData[key as keyof KanaCharacterSet] as KanaData[];
          element.forEach((datapoint) => {
            datapoint.guessedCorrectly = false;
          });
        }
      }
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

  const showStats = (timeInSeconds: number) => {
    setTimeCompleted(timeInSeconds);
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
            <KanaquizResults
              timeCompleted={timeCompleted}
              kanaPool={kanaPool}
              resetGame={resetGame}
            />
          </div>
        )}
      </Transition>
    </>
  );
}
