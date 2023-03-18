import { createStyles, Group, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signIn, signOut } from "next-auth/react";
import { HeaderBase } from "./header-base";

const useStyles = createStyles((theme) => ({}));

interface HeaderNoauthProps {
  links: { link: string; label: string }[];
}

export function HeaderNoauth({ links }: HeaderNoauthProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  return (
    <HeaderBase>
      <Group spacing={5}>
        <Button variant="outline" onClick={() => signIn()}>
          Log In
        </Button>
        <Button
          variant="outline"
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Log Out
        </Button>
        <Button variant="filled" onClick={open}>
          Sign Up
        </Button>
      </Group>
      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
        <h2>This is a drawer</h2>
      </Drawer>
    </HeaderBase>
  );
}
