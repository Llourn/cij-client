import {
  Container,
  Paper,
  SimpleGrid,
  Group,
  Button,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ImageCheckbox from "../image-checkbox";
import { KanaCharacterSet } from "@/src/types/kanaquiz";
import kanaOptionsData from "../../data/kanaOptions.json";

const allKana = {
  hiraganaBase: true,
  hiraganaDakuten: true,
  hiraganaHandakuten: true,
  hiraganaCombo: true,
  katakanaBase: true,
  katakanaDakuten: true,
  katakanaHandakuten: true,
  katakanaCombo: true,
};

interface KanaquizConfigProps {
  startCountDown: (options: KanaCharacterSet) => void;
}

export default function KanaquizConfig({
  startCountDown,
}: KanaquizConfigProps) {
  const form = useForm({
    initialValues: {
      hiraganaBase: false,
      hiraganaDakuten: false,
      hiraganaHandakuten: false,
      hiraganaCombo: false,
      katakanaBase: false,
      katakanaDakuten: false,
      katakanaHandakuten: false,
      katakanaCombo: false,
    },
  });

  const isEmptyForm = () => {
    console.log(form.values);
    for (const checkbox in form.values) {
      if (Object.prototype.hasOwnProperty.call(form.values, checkbox)) {
        const element = form.values[checkbox as keyof KanaCharacterSet];
        if (element) return false;
      }
    }
    return true;
  };

  const handleSubmit = (values: KanaCharacterSet) => {
    if (isEmptyForm()) {
      // TODO: display warning
    } else {
      startCountDown(values);
    }
  };

  return (
    <Container size="sm">
      <Paper my={"xl"} p="xl" shadow="md">
        <Title order={1}>Kana Quiz</Title>
        <Text c="dimmed" pb={"md"}>
          Welcome to the Kana Quiz! Please choose at least one of the following
          collections and then click PLAY.
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <SimpleGrid cols={1}>
              {kanaOptionsData.hiragana.map((option) => {
                return (
                  <ImageCheckbox
                    key={option.title}
                    title={option.title}
                    image={option.image}
                    {...form.getInputProps(option.label, { type: "checkbox" })}
                  />
                );
              })}
            </SimpleGrid>
            <SimpleGrid cols={1}>
              {kanaOptionsData.katakana.map((option) => {
                return (
                  <ImageCheckbox
                    key={option.title}
                    title={option.title}
                    image={option.image}
                    {...form.getInputProps(option.label, { type: "checkbox" })}
                  />
                );
              })}
            </SimpleGrid>
          </SimpleGrid>
          <Group spacing="md" mt="lg" position="right">
            <Button variant="light" onClick={() => form.setValues(allKana)}>
              Select All
            </Button>
            <Button variant="light" onClick={() => form.reset()}>
              Clear
            </Button>
            <Button type="submit" variant="filled" uppercase>
              Play
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
