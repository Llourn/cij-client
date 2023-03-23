import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
  rem,
  Container,
} from "@mantine/core";
import {
  IconLanguageHiragana,
  IconUsers,
  IconMessageCircleExclamation,
  IconMailFast,
} from "@tabler/icons-react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(36),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: IconUsers,
    title: "Community",
    description:
      "Personalized user profiles, post blogs/articles and interact with other users' posts.",
  },
  {
    icon: IconLanguageHiragana,
    title: "Kana Quiz Leaderboard",
    description:
      "Compete with other users to see who can score the highest and complete the quiz the quickest.",
  },
  {
    icon: IconMessageCircleExclamation,
    title: "Notifications",
    description:
      "In app and email notifications to communicate updates and activity",
  },
  {
    icon: IconMailFast,
    title: "Suggestions?",
    description:
      "Email me at cyriouslyinjapan@gmail.com. I'd love to hear what you have to say!",
  },
];

export default function Dashboard() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "#c92a2a", to: "#B42525" }}
      >
        <feature.icon size={rem(26)} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <Container size={"lg"}>
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={5}>
            <Title className={classes.title} order={2}>
              Dashboard - Early Development
            </Title>
            <Text c="dimmed">
              This project is in the early development stages so features are
              pretty limited. Please read on for information on what features
              are currently in the pipe. If you would like to test your kana
              knowledge give the Kana Quiz a try!
            </Text>

            <Link href="/kanaquiz">
              <Button
                variant="gradient"
                gradient={{ deg: 133, from: "#c92a2a", to: "#B42525" }}
                size="lg"
                radius="md"
                mt="xl"
              >
                Kana Quiz
              </Button>
            </Link>
          </Col>
          <Col span={12} md={7}>
            <SimpleGrid
              cols={2}
              spacing={30}
              breakpoints={[{ maxWidth: "md", cols: 1 }]}
            >
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    </Container>
  );
}
