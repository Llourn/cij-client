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
} from "@mantine/core";
import kanaOptionsData from "../../data/kanaOptions.json";
import { percentCompleted } from "@/src/utilities/general";

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
  const { classes } = useStyles();

  const stats = kanaPool?.map((pool) => {
    const colData = [
      ...kanaOptionsData.hiragana,
      ...kanaOptionsData.katakana,
    ].find((item) => item.label === pool.name);

    let progress = percentCorrect(pool.collection);
    let totalKana = pool.collection.length;
    let totalCorrect = pool.collection.filter(
      (response) => response.guessedCorrectly
    ).length;
    // progress = Math.floor(Math.random() * 100);
    console.log("progress", progress);
    console.log("totalKana", totalKana);

    if (colData) {
      return (
        <Grid.Col xs={12} md={6} key={colData.title}>
          <Paper withBorder radius="md">
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: progress, color: "red" }]}
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
