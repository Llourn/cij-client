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
  return percentCompleted(responseCollection, correctAnswers.length);
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
    progress = Math.floor(Math.random() * 100);

    if (colData) {
      return (
        <Paper withBorder radius="md" p="xs" key={colData.title}>
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
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {colData.title}
              </Text>
              <Text weight={700} size="xl">
                {progress}/100
              </Text>
            </div>
          </Group>
        </Paper>
      );
    } else {
      return <></>;
    }
  });

  return (
    <Container size="md" py="lg">
      <Paper shadow={"sm"} className={classes.resultsContainer}>
        <SimpleGrid
          p={"md"}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {stats}
        </SimpleGrid>
      </Paper>
    </Container>
  );
}
