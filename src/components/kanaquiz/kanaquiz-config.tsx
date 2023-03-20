import {
  Container,
  Paper,
  SimpleGrid,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ImageCheckbox from "../image-checkbox";
import { KanaOptions } from "@/src/types/kanaquiz";
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
  startGame: (options: KanaOptions) => void;
}

export default function KanaquizConfig({ startGame }: KanaquizConfigProps) {
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
        const element = form.values[checkbox as keyof KanaOptions];
        if (element) return false;
      }
    }
    return true;
  };

  const handleSubmit = (values: KanaOptions) => {
    if (isEmptyForm()) {
      form.resetTouched();
    } else {
      startGame(values);
    }
  };

  return (
    <Container size="sm">
      <Paper my={"xl"} p="xl" shadow="md">
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
