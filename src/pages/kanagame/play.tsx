import { Container } from "@mantine/core";
import { useRouter } from "next/router";

export default function Play() {
  const router = useRouter();

  const {
    query: {
      hiraganaBase,
      hiraganaDakuten,
      hiraganaHandakuten,
      hiraganaCombo,
      katakanaBase,
      katakanaDakuten,
      katakanaHandakuten,
      katakanaCombo,
    },
  } = router;

  const props = {
    hiraganaBase,
    hiraganaDakuten,
    hiraganaHandakuten,
    hiraganaCombo,
    katakanaBase,
    katakanaDakuten,
    katakanaHandakuten,
    katakanaCombo,
  };

  return (
    <Container size="lg">
      <h2>Kana Game - Play</h2>
      {props.hiraganaBase && <p>hiraganaBase</p>}
      {props.hiraganaDakuten && <p>hiraganaDakuten</p>}
      {props.hiraganaHandakuten && <p>hiraganaHandakuten</p>}
      {props.hiraganaCombo && <p>hiraganaCombo</p>}
      {props.katakanaBase && <p>katakanaBase</p>}
      {props.katakanaDakuten && <p>katakanaDakuten</p>}
      {props.katakanaHandakuten && <p>katakanaHandakuten</p>}
      {props.katakanaCombo && <p>katakanaCombo</p>}
    </Container>
  );
}
