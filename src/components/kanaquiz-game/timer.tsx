import { secondsToMinAndSec } from "@/src/utilities/general";
import { Title } from "@mantine/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTimer } from "react-use-precision-timer";

interface TimerProps {
  setTimeInSeconds: Dispatch<SetStateAction<number>>;
}

export default function Timer({ setTimeInSeconds }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  const callback = React.useCallback(
    () => setSeconds((prevState) => prevState + 1),
    []
  );

  const timer = useTimer({ delay: 1000 }, callback);
  useEffect(() => {
    timer.start();
  }, [timer]);

  useEffect(() => {
    setTimeInSeconds(seconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <>
      <Title order={3} align="center">
        {secondsToMinAndSec(seconds)}
      </Title>
    </>
  );
}
