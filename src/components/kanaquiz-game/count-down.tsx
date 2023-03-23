import { createStyles, Paper, rem, Text, Transition } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "pink",
    minHeight: rem(430),
    height: "45vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  countDownNumber: {
    fontSize: "clamp(2rem, 16vw, 8rem)",
  },
  countDownStart: {
    fontSize: "clamp(2rem, 14vw, 7rem)",
  },
}));

enum Count {
  THREE = 3,
  TWO = 2,
  ONE = 1,
  START = 0,
  LOADING = 4,
}

interface CountDownProps {
  startGame: Dispatch<SetStateAction<boolean>>;
}

export default function CountDown({
  startGame: setInputIsLocked,
}: CountDownProps) {
  const [countDownState, setCountDownState] = useState<number>(4);
  const { classes, cx } = useStyles();

  useEffect(() => {
    let counter = 3;
    setCountDownState(counter);
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      if (counter === 1) setCountDownState(Count.LOADING);
      setTimeout(() => {
        counter--;
        if (counter < 0) {
          clearInterval(interval);
          setInputIsLocked(false);
        } else {
          setCountDownState(counter);
        }
      }, 400);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper className={classes.container}>
      <Transition
        mounted={countDownState <= Count.THREE && countDownState != Count.START}
        transition="fade"
        duration={100}
        timingFunction="ease"
      >
        {(styles) => (
          <Text
            style={styles}
            className={cx(classes.countDownNumber, "jp-sans")}
          >
            3...
          </Text>
        )}
      </Transition>
      <Transition
        mounted={countDownState <= Count.TWO && countDownState != Count.START}
        transition="fade"
        duration={100}
        timingFunction="ease"
      >
        {(styles) => (
          <Text
            style={styles}
            className={cx(classes.countDownNumber, "jp-sans")}
          >
            2...
          </Text>
        )}
      </Transition>
      <Transition
        mounted={countDownState <= Count.ONE && countDownState != Count.START}
        transition="fade"
        duration={100}
        timingFunction="ease"
      >
        {(styles) => (
          <Text
            style={styles}
            className={cx(classes.countDownNumber, "jp-sans")}
          >
            1...
          </Text>
        )}
      </Transition>
      <Transition
        mounted={countDownState === Count.START}
        transition="pop"
        duration={100}
        timingFunction="ease"
      >
        {(styles) => (
          <Text
            style={styles}
            className={cx(classes.countDownStart, "jp-sans")}
          >
            スタート！
          </Text>
        )}
      </Transition>
    </Paper>
  );
}
