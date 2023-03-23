import { KanaList, KanaData } from "@/src/types/kanaquiz";
import {
  Container,
  createStyles,
  RingProgress,
  Text,
  Paper,
  Center,
  Image,
  Group,
  Grid,
  Button,
  Title,
} from "@mantine/core";
import kanaOptionsData from "../../data/kanaOptions.json";
import { useEffect, useState } from "react";
import { secondsToMinAndSec } from "@/src/utilities/general";

const useStyles = createStyles((theme) => ({
  resultsContainer: {},
}));

const percentCorrect = (responseCollection: KanaData[]) => {
  let correctAnswers = responseCollection.filter(
    (response) => response.guessedCorrectly
  );
  return correctAnswers.length / responseCollection.length;
};

interface KanaquizResultsProps {
  timeCompleted: number;
  kanaPool: KanaList[] | undefined;
  resetGame: () => void;
}

export default function KanaquizResults({
  timeCompleted,
  kanaPool,
  resetGame,
}: KanaquizResultsProps) {
  const [progressData, setProgressData] = useState<number[]>(() => {
    let newArr = [] as number[];
    kanaPool?.forEach((pool) => {
      newArr.push(percentCorrect(pool.collection));
    });
    return newArr;
  });

  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    let counter = 0;
    let incrementProgress = [0, 0, 0, 0, 0, 0, 0, 0];
    let interval: NodeJS.Timer;
    setTimeout(() => {
      interval = setInterval(() => {
        progressData.forEach((element, index) => {
          const difference = progressData[index] - incrementProgress[index];
          incrementProgress[index] += (difference / 100) * 5;
        });
        setProgress([...incrementProgress]);
        if (
          ++counter >= 2000 ||
          incrementProgress[0] / progressData[0] > 0.99
        ) {
          clearInterval(interval);
          setProgress([...progressData]);
        }
      }, 10);
    }, 500);

    return () => clearInterval(interval);
  }, [progressData]);

  const { classes } = useStyles();

  const stats = kanaPool?.map((pool, index) => {
    const colData = [
      ...kanaOptionsData.hiragana,
      ...kanaOptionsData.katakana,
    ].find((item) => item.label === pool.name);

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
                sections={[{ value: progress[index] * 100, color: "red" }]}
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
      <Paper shadow={"sm"} p="md" className={classes.resultsContainer}>
        <Title order={1}>Results</Title>
        <Text c="dimmed" pb={"md"}>
          おめでた! 🎉 You completed the quiz in{" "}
          {secondsToMinAndSec(timeCompleted, true)}! Check out the stats below
          to see how you did.
        </Text>

        <Grid grow gutter={"md"} pb="md">
          {stats}
        </Grid>
        <Group position="right">
          <Button onClick={() => resetGame()}>Try Again</Button>
        </Group>
      </Paper>
    </Container>
  );
}
