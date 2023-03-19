import { KanaOptions } from "@/src/types/kanaquiz";
import { Container, createStyles, Paper, TextInput } from "@mantine/core";
import kana from "../../data/kana.json";

// get options
// compile array of characters.
// build out the UI
// countdown to start.
// progress bar
// timer

const useStyles = createStyles((theme) => ({
  kanaContainer: {
    fontSize: "10rem",
    textAlign: "center",
  },
}));

export default function KanaquizGame({
  kanaOptions,
}: {
  kanaOptions: KanaOptions | undefined;
}) {
  const { classes, cx } = useStyles();
  return (
    <Container size="sm">
      <Paper shadow={"sm"}>
        <h2>Kana Game - Play</h2>
        <Paper className={cx(classes.kanaContainer, "jp-sans")}>ぴょ</Paper>
        <TextInput />
      </Paper>
    </Container>
  );
}
