import { Anchor, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function community() {
  return (
    <Container size="lg">
      <Title order={1}>Community</Title>
      <Text>
        Currently in development. See the <Anchor href="/">Dashboard</Anchor>{" "}
        for more information.
      </Text>
    </Container>
  );
}
