import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  KanaList,
  KanaData,
  KanaCharacterSet,
  KanaQueueItem,
} from "@/src/types/kanaquiz";
import { Container, createStyles, Paper, rem, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import kanaData from "../../data/kana.json";
import AnswerResponse from "./answer-response";
import ProgressBar from "./progress-bar";
import Timer from "./timer";

const useStyles = createStyles((theme) => ({
  kanaStage: {
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

  gameContainer: {
    position: "relative",
  },
}));

interface KanaquizGameProps {
  kanaOptions: KanaCharacterSet;
  kanaPool: KanaList[] | undefined;
  setKanaPool: Dispatch<SetStateAction<KanaList[] | undefined>>;
  showStats: (timeInSeconds: number) => void;
}

export default function KanaquizGame({
  kanaOptions,
  kanaPool,
  setKanaPool,
  showStats,
}: KanaquizGameProps) {
  const [showFailResponse, setShowFailResponse] = useState(false);
  const [showSuccessResponse, setShowSuccessResponse] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [kanaQueue, setKanaQueue] = useState<KanaQueueItem[]>([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);

  const { classes, cx } = useStyles();
  const form = useForm({
    initialValues: {
      kana: "",
    },
  });

  useEffect(() => {
    if (kanaOptions) {
      const { kanaCollections, queue } = combineKana(kanaOptions);
      setKanaPool([...kanaCollections]);
      setKanaQueue([...queue]);
    }
  }, [kanaOptions, setKanaPool, setKanaQueue]);

  const stagedKana = () => {
    if (kanaQueue && kanaPool && iterator <= kanaQueue.length - 1) {
      const { position, collectionName } = kanaQueue[iterator];
      const col = kanaPool.find(
        (kanaCollection) => kanaCollection.name === collectionName
      );
      if (col) {
        return col.collection[position];
      }
    }
    return null;
  };

  const onSubmit = (value: string) => {
    if (value === "skip") {
      setKanaQueue([]);
      showStats(timeInSeconds);
    }
    clearResponses();

    if (stagedKana()?.readings.includes(value)) {
      success();
    } else {
      fail();
    }

    if (kanaQueue && iterator < kanaQueue.length - 1) {
      setIterator((prevState) => {
        return prevState + 1;
      });
    } else {
      setKanaQueue([]);
      showStats(timeInSeconds);
    }
    form.reset();
  };

  const success = () => {
    const staged = stagedKana();
    if (staged) staged.guessedCorrectly = true;
    setShowSuccessResponse(true);
  };

  const fail = () => {
    setShowFailResponse(true);
  };

  const clearResponses = () => {
    setShowSuccessResponse(false);
    setShowFailResponse(false);
  };

  return (
    <Container size="sm" py={"lg"}>
      <Paper shadow={"sm"} className={classes.gameContainer}>
        <AnswerResponse
          showFailResponse={showFailResponse}
          showSuccessResponse={showSuccessResponse}
          formIsEmpty={!form.isDirty("kana")}
        ></AnswerResponse>
        {stagedKana ? (
          <div className={cx(classes.kanaStage, "jp-sans")}>
            {stagedKana()?.kana}
          </div>
        ) : null}
        <div className={classes.inputContainer}>
          <form
            onSubmit={form.onSubmit((values) => {
              onSubmit(values.kana);
            })}
          >
            <TextInput
              autoFocus
              placeholder="Answer Here"
              className={classes.textInput}
              {...form.getInputProps("kana")}
            />
          </form>
        </div>
        <Timer setTimeInSeconds={setTimeInSeconds} />
        <ProgressBar total={kanaQueue.length - 1} value={iterator} />
      </Paper>
    </Container>
  );
}

function combineKana(options: KanaCharacterSet) {
  let kanaCollections = [] as KanaList[];
  let queue = [] as KanaQueueItem[];

  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const element = options[key as keyof KanaCharacterSet];

      if (element) {
        let targetCollection = kanaData[
          key as keyof KanaCharacterSet
        ] as KanaData[];

        kanaCollections.push({
          name: key,
          collection: [...targetCollection],
        } as KanaList);

        let temp = [] as KanaQueueItem[];

        targetCollection.forEach((item, index) => {
          temp.push({ position: index, collectionName: key });
        });

        queue.push(...temp);
      }
    }
  }

  queue = shuffleQueue(queue);

  return { kanaCollections, queue };
}

function shuffleQueue(arr: KanaQueueItem[]) {
  for (var i = arr.length - 1; i >= 1; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
