import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  KanaCollection,
  KanaItem,
  KanaOptions,
  KanaQueueItem,
} from "@/src/types/kanaquiz";
import {
  Container,
  createStyles,
  Group,
  Paper,
  Progress,
  rem,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX, IconCheck } from "@tabler/icons-react";
import kanaData from "../../data/kana.json";
import AnswerResponse from "./response";
import { percentCompleted } from "@/src/utilities/general";

// countdown to start.
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
  gameContainer: {
    position: "relative",
  },
  errorResponse: { position: "absolute" },
  successResponse: { position: "absolute", right: 0 },
}));

interface KanaquizGameProps {
  kanaOptions: KanaOptions;
  kanaPool: KanaCollection[] | undefined;
  setKanaPool: Dispatch<SetStateAction<KanaCollection[] | undefined>>;
  showStats: () => void;
}

export default function KanaquizGame({
  kanaOptions,
  kanaPool,
  setKanaPool,
  showStats,
}: KanaquizGameProps) {
  const [xReponseOpened, setXResponseOpened] = useState(false);
  const [checkReponseOpened, setCheckResponseOpened] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [kanaQueue, setKanaQueue] = useState<KanaQueueItem[]>();
  // const [kanaPool, setKanaPool] = useState<KanaCollection[]>();

  const { classes, cx } = useStyles();
  const form = useForm({
    initialValues: {
      kana: "",
    },
  });

  useEffect(() => {
    if (kanaOptions) {
      const { kanaCollections, queue } = combineKana(kanaOptions);
      setKanaPool(kanaCollections);
      setKanaQueue(queue);
    }
  }, [kanaOptions, setKanaPool, setKanaQueue]);

  const stagedKana = () => {
    if (kanaQueue && kanaPool && iterator <= kanaQueue.length - 1) {
      const { position, collectionName } = kanaQueue[iterator];
      const col = kanaPool.find((item) => item.name === collectionName);
      if (col) {
        return col.collection[position];
      }
    }
    return null;
  };

  const onSubmit = (value: string) => {
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
      showStats();
    }
    form.reset();
  };

  const success = () => {
    const staged = stagedKana();
    if (staged) staged.guessedCorrectly = true;
    console.log("YAY");
    setCheckResponseOpened(true);
  };

  const fail = () => {
    setXResponseOpened(true);
  };

  const clearResponses = () => {
    setCheckResponseOpened(false);
    setXResponseOpened(false);
  };

  return (
    <Container size="sm" py={"lg"}>
      <Paper shadow={"sm"} className={classes.gameContainer}>
        <div className={classes.errorResponse}>
          <AnswerResponse
            isActive={xReponseOpened && !form.isTouched("kana")}
            customStyle={{ backgroundColor: "red" }}
          >
            <IconX size={36} strokeWidth={3} color={"white"} />
          </AnswerResponse>
        </div>
        <div className={classes.successResponse}>
          <AnswerResponse
            isActive={checkReponseOpened && !form.isTouched("kana")}
            customStyle={{ backgroundColor: "green" }}
          >
            <IconCheck size={36} strokeWidth={3} color={"white"} />
          </AnswerResponse>
        </div>
        {/* <div className={cx(classes.countdown, "jp-sans")}>スタート！</div> */}
        {stagedKana ? (
          <div className={cx(classes.kanaContainer, "jp-sans")}>
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
        <Paper p={"xl"}>
          <Group position="apart" mt="xs">
            <Text fz="sm" color="dimmed">
              Progress
            </Text>
            <Text fz="sm" color="dimmed">
              {percentCompleted(kanaQueue, iterator)}%
            </Text>
          </Group>
          <Progress
            size="xl"
            value={percentCompleted(kanaQueue, iterator)}
            striped
            mt={"md"}
          />
        </Paper>
      </Paper>
    </Container>
  );
}

function combineKana(options: KanaOptions) {
  let kanaCollections = [] as KanaCollection[];
  let queue = [] as KanaQueueItem[];

  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const element = options[key as keyof KanaOptions];

      if (element) {
        let targetCollection = kanaData[key as keyof KanaOptions] as KanaItem[];

        kanaCollections.push({
          name: key,
          collection: targetCollection,
        } as KanaCollection);

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
