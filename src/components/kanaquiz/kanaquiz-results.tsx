import { KanaCollection, KanaItem } from "@/src/types/kanaquiz";
import {
  Container,
  createStyles,
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Image,
  Group,
  Grid,
  Button,
} from "@mantine/core";
import kanaOptionsData from "../../data/kanaOptions.json";
import { percentCompleted } from "@/src/utilities/general";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  resultsContainer: {},
}));

const percentCorrect = (responseCollection: KanaItem[]) => {
  let correctAnswers = responseCollection.filter(
    (response) => response.guessedCorrectly
  );
  let result = percentCompleted(responseCollection, correctAnswers.length);
  if (result > 95 && correctAnswers.length !== responseCollection.length) {
    result = 95;
  }
  return result;
};

interface KanaquizResultsProps {
  kanaPool: KanaCollection[] | undefined;
}

export default function KanaquizResults({ kanaPool }: KanaquizResultsProps) {
  // const [progressData, setProgressData] = useState<number[]>([
  //   50, 75, 60, 20, 5, 90, 100, 13,
  // ]);
  const [progressData, setProgressData] = useState<number[]>(() => {
    let newArr = [] as number[];
    console.log(kanaPool);
    kanaPool?.forEach((pool) => {
      // newArr.push(percentCorrect(pool.collection));
      newArr.push(Math.floor(Math.random() * 100));
    });
    console.log("NEW", newArr);
    return newArr;
  });

  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    let counter = 0;
    let incrementProgress = progress;
    let interval: NodeJS.Timer;
    setTimeout(() => {
      interval = setInterval(() => {
        progress.forEach((element, index) => {
          const difference = progressData[index] - progress[index];
          incrementProgress[index] += (difference / 100) * 25;
        });

        setProgress([...incrementProgress]);
        if (++counter >= 200 || progress[0] / progressData[0] > 0.999) {
          clearInterval(interval);
          setProgress([...progressData]);
        }
      }, 100);
    }, 500);

    return () => clearInterval(interval);
  }, [progressData]);

  const { classes } = useStyles();

  const stats = kanaPool?.map((pool, index) => {
    const colData = [
      ...kanaOptionsData.hiragana,
      ...kanaOptionsData.katakana,
    ].find((item) => item.label === pool.name);

    // let progressInPercent = percentCorrect(pool.collection);
    // // progressInPercent = Math.floor(Math.random() * 100);
    // setProgressData((prevState) => {
    //   let newArr = prevState;
    //   newArr[index] = progressInPercent;
    //   return [...newArr];
    // });
    let totalKana = pool.collection.length;
    let totalCorrect = pool.collection.filter(
      (response) => response.guessedCorrectly
    ).length;
    if (colData) {
      return (
        <Grid.Col xs={12} md={6} key={colData.title}>
          <Paper withBorder radius="md">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: progress[index], color: "red" }]}
                label={
                  <Center>
                    <Image src={colData.image} alt={colData.title} width={40} />
                  </Center>
                }
              />

              <div>
                <Text
                  color="dimmed"
                  size="xs"
                  transform="uppercase"
                  weight={700}
                >
                  {colData.title}
                </Text>
                <Text weight={700} size="xl">
                  {totalCorrect}/{totalKana}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
      );
    } else {
      return <></>;
    }
  });

  return (
    <Container size="md" py="lg">
      <Paper shadow={"sm"} className={classes.resultsContainer}>
        {/* <SimpleGrid
          p={"md"}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {stats}
        </SimpleGrid> */}
        <Grid grow gutter={"md"} p="md">
          {stats}
        </Grid>
      </Paper>
    </Container>
  );
}
