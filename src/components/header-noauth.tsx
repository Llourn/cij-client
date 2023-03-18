import { createStyles, Group, Button } from "@mantine/core";
import { signIn } from "next-auth/react";
import { HeaderBase } from "./header-base";

const useStyles = createStyles((theme) => ({}));

export function HeaderNoauth() {
  return (
    <HeaderBase>
      <Group spacing={5}>
        <Button variant="outline" onClick={() => signIn()}>
          Log In
        </Button>
        <Button variant="filled" onClick={() => signIn()}>
          Sign Up
        </Button>
      </Group>
    </HeaderBase>
  );
}
