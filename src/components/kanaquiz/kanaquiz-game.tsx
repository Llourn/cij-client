import { KanaCollection, KanaOptions } from "@/src/types/kanaquiz";
import {
  Container,
  createStyles,
  Group,
  Paper,
  Progress,
  rem,
  TextInput,
  Text,
  Transition,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX, IconCheck } from "@tabler/icons-react";

import { useEffect, useState } from "react";
import kana from "../../data/kana.json";

// get options
// compile array of characters.
// build out the UI
// countdown to start.
// progress bar
// timer

const useStyles = createStyles((theme) => ({
  kanaContainer: {
    fontSize: "clamp(5rem, 18vw, 10rem)",
    textAlign: "center",
  },
  textInput: {
    textAlign: "center",
    maxWidth: rem(250),
  },
  inputContainer: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  countdown: {
    textAlign: "center",
    fontSize: "clamp(2rem, 16vw, 8rem)",
  },
  response: {
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: rem(50),
  },
}));

export default function KanaquizGame({
  kanaOptions,
}: {
  kanaOptions: KanaOptions | undefined;
}) {
  const { classes, cx } = useStyles();
  const [xReponseOpened, setXResposeOpened] = useState(false);
  const [checkReponseOpened, setCheckResposeOpened] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [kanaQueue, setKanaQueue] = useState<
    {
      position: number;
      collectionName: string;
    }[]
  >();
  const [kanaPool, setKanaPool] = useState<
    {
      name: string;
      collection: {
        kana: string;
        readings: string[];
        guessedCorrectly: boolean;
      }[];
    }[]
  >();

  const form = useForm({
    initialValues: {
      kana: "",
    },
    // validate: {
    //   kana: (value) => (/\d|\W/.test(value) ? null : "Invalid input"),
    // },
  });

  useEffect(() => {
    if (kanaOptions) {
      const { gameCollections, positions } = combineKana(kanaOptions);
      setKanaPool(gameCollections);
      setKanaQueue(positions);
    }
  }, [kanaOptions]);

  // useEffect(() => {
  //   if (kanaPool && kanaQueue) {
  //     let collection = kanaPool?.find(
  //       (element) => element.name === kanaQueue[iterator].collectionName
  //     );
  //     let chosen = collection?.collection[kanaQueue[iterator].position];
  //     if (chosen) setStagedKana(chosen);
  //   }
  // }, [kanaQueue]);

  const stagedKana = () => {
    if (kanaQueue && kanaPool) {
      const { position, collectionName } = kanaQueue[iterator];
      const col = kanaPool.find((item) => item.name === collectionName);
      if (col) {
        return col.collection[position];
      }
    }
    return {
      kana: "❌",
      readings: ["❌"],
      guessedCorrectly: false,
    };
  };

  const onSubmit = (value: string) => {
    clearResponses();
    if (stagedKana().readings.includes(value)) {
      console.log("🎉", value);
      success();
    } else {
      fail();
    }
    if (kanaQueue && iterator < kanaQueue.length - 1) {
      setIterator((prevState) => {
        return prevState + 1;
      });
    }
    form.reset();
  };

  const success = () => {
    stagedKana().guessedCorrectly = true;
    setCheckResposeOpened(true);
  };

  const fail = () => {
    setXResposeOpened(true);
  };

  const clearResponses = () => {
    setCheckResposeOpened(false);
    setXResposeOpened(false);
  };

  const percentCompleted = () => {
    if (kanaQueue) {
      let num = Math.floor((iterator / (kanaQueue.length - 1)) * 100);
      return num;
    }
    return 0;
  };

  return (
    <Container size="sm" py={"lg"}>
      <Paper shadow={"sm"} sx={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          <Transition
            mounted={xReponseOpened && !form.isTouched("kana")}
            transition="slide-up"
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <Paper
                className={classes.response}
                radius={"xl"}
                sx={{ backgroundColor: "red" }}
                m="md"
                style={styles}
              >
                <IconX size={36} strokeWidth={3} color={"white"} />
              </Paper>
            )}
          </Transition>
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <Transition
            mounted={checkReponseOpened && !form.isTouched("kana")}
            transition="slide-up"
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <Paper
                className={classes.response}
                radius={"xl"}
                sx={{ backgroundColor: "green" }}
                m="md"
                style={styles}
              >
                <IconCheck size={36} strokeWidth={3} color={"white"} />
              </Paper>
            )}
          </Transition>
        </div>
        {/* <div className={cx(classes.countdown, "jp-sans")}>スタート！</div> */}
        {stagedKana && (
          <div className={cx(classes.kanaContainer, "jp-sans")}>
            {stagedKana().kana}
          </div>
        )}
        <div className={classes.inputContainer}>
          <form
            onSubmit={form.onSubmit((values) => {
              onSubmit(values.kana);
            })}
          >
            <TextInput
              placeholder="Answer Here"
              className={classes.textInput}
              {...form.getInputProps("kana")}
            />
          </form>
        </div>
        <Paper p={"xl"}>
          <Group position="apart" mt="xs">
            <Text fz="sm" color="dimmed">
              Progress
            </Text>
            <Text fz="sm" color="dimmed">
              {percentCompleted()}%
            </Text>
          </Group>

          <Progress size="xl" value={percentCompleted()} striped mt={"md"} />
        </Paper>
      </Paper>
    </Container>
  );
}

function combineKana(options: KanaOptions) {
  let gameCollections = [] as {
    name: string;
    collection: {
      kana: string;
      readings: string[];
      guessedCorrectly: boolean;
    }[];
  }[];
  let positions = [];
  const kanaCollection = kana;

  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const element = options[key as keyof KanaOptions];
      if (element) {
        let targetCollection = kanaCollection[key as keyof KanaOptions];
        gameCollections.push({
          name: key,
          collection: targetCollection,
        });
        let temp = [] as { position: number; collectionName: string }[];
        targetCollection.forEach((item, index) => {
          temp.push({ position: index, collectionName: key });
        });
        positions.push(...temp);
      }
    }
  }

  positions = shufflePositions(positions);
  console.log("gamecollections", gameCollections);
  console.log("positions", positions);

  return { gameCollections, positions };
}

function shufflePositions(arr: { position: number; collectionName: string }[]) {
  for (var i = arr.length - 1; i >= 1; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
