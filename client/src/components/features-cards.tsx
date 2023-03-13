import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from '@mantine/core';
import { IconGoGame, IconPlaneTilt, IconUserPlus } from '@tabler/icons-react';

const mockdata = [
  {
    title: 'Kana Game',
    description:
      'Test your kana knowledge of all levels of Hirigana and Katakana. Compete against other users for top spot on the leaderboards!',
    icon: IconGoGame,
  },
  {
    title: 'Places to Visit',
    description:
      'Make a list of all the amazing places you want to visit when you get to Japan! Upload inspirational photos and list all the things you want to do when you get there.',
    icon: IconPlaneTilt,
  },
  {
    title: 'Connect with others',
    description:
      "Post your successes and struggles! Everyone here is moving toward a similar goal, let's help eachother out!",
    icon: IconUserPlus,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Let&apos;s gooooo!
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        がんばってね！
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Check out all the cool stuff you can do here! I&apos;m sure I&apos;ll
        have some better stuff written here at some point.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
