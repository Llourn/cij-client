import { Container, Title } from "@mantine/core";
import { FeaturesCards } from "../components/features-cards";

export default function Dashboard() {
  return (
    <Container size="lg">
      <Title>DASHBOARD</Title>
      <FeaturesCards />
    </Container>
  );
}
