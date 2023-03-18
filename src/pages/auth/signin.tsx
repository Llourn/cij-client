import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import {
  Card,
  Group,
  Button,
  Image,
  Text,
  createStyles,
  Container,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({}));

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes, cx } = useStyles();

  return (
    <Container size="xs">
      <Card shadow="sm" my="lg" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80"
            height={260}
            alt="Japan"
          />
        </Card.Section>

        <Group position="center" mt="md" mb="xs">
          <Text size="xl" weight={500}>
            いらっしゃいませ!
          </Text>
        </Group>

        <Group position="center" mt="md" mb="xs">
          <Text size="sm" color="dimmed">
            Welcome, Please come in! Choose an option below to log in 😃
          </Text>
        </Group>

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button
              variant="light"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </Card>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
