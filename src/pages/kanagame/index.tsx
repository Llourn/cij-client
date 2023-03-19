import ImageCheckbox from "@/src/components/image-checkbox";
import { Button, Container, Group, Paper, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { KanaOptions } from "@/src/context/kanagame";

const hiraganaOptions = [
  {
    title: "Hiragana",
    label: "hiraganaBase",
    image: "/images/hiragana-base.svg",
  },
  {
    title: "Hiragana - dakuten (濁点)",
    label: "hiraganaDakuten",
    image: "/images/hiragana-dakuten.svg",
  },
  {
    title: "Hiragana - handakuten (半濁点)",
    label: "hiraganaHandakuten",
    image: "/images/hiragana-handakuten.svg",
  },
  {
    title: "Hiragana - You-on (拗音)",
    label: "hiraganaCombo",
    image: "/images/hiragana-combo.svg",
  },
];

const katakanaOptions = [
  {
    title: "Katakana",
    label: "katakanaBase",
    image: "/images/katakana-base.svg",
  },
  {
    title: "Katakana - dakuten (濁点)",
    label: "katakanaDakuten",
    image: "/images/katakana-dakuten.svg",
  },
  {
    title: "Katakana - handakuten (半濁点)",
    label: "katakanaHandakuten",
    image: "/images/katakana-handakuten.svg",
  },
  {
    title: "Katakana - You-on (拗音)",
    label: "katakanaCombo",
    image: "/images/katakana-combo.svg",
  },
];

export default function Kanagame() {
  const router = useRouter();

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

  const selectAll = {
    hiraganaBase: true,
    hiraganaDakuten: true,
    hiraganaHandakuten: true,
    hiraganaCombo: true,
    katakanaBase: true,
    katakanaDakuten: true,
    katakanaHandakuten: true,
    katakanaCombo: true,
  };

  function startGame(values: KanaOptions) {
    router.push({
      pathname: "/kanagame/play",
      query: { ...values },
    });
  }

  return (
    <Container size="sm">
      <Paper my={"xl"} p="xl" shadow="md">
        <form onSubmit={form.onSubmit((values) => startGame(values))}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <SimpleGrid cols={1}>
              {hiraganaOptions.map((option) => {
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
              {katakanaOptions.map((option) => {
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
            <Button variant="light" onClick={() => form.setValues(selectAll)}>
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
