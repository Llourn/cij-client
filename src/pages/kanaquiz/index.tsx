import KanaquizConfig from "@/src/components/kanaquiz/kanaquiz-config";
import KanaquizGame from "@/src/components/kanaquiz/kanaquiz-game";
import { KanaOptions } from "@/src/types/kanaquiz";
import { useState } from "react";

export default function Kanaquiz() {
  const [kanaOptions, setKanaOptions] = useState<KanaOptions>({
    hiraganaBase: false,
    hiraganaDakuten: false,
    hiraganaHandakuten: false,
    hiraganaCombo: false,
    katakanaBase: false,
    katakanaDakuten: false,
    katakanaHandakuten: false,
    katakanaCombo: false,
  });

  return (
    <>
      <KanaquizConfig setKanaOptions={setKanaOptions} />
      <KanaquizGame kanaOptions={kanaOptions} />
    </>
  );
}
