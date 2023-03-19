import { useEffect, useState } from "react";
import {
  createStyles,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderBase } from "./header-base";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfilePic from "./profile-pic";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  container: {
    display: "flex",
    gap: rem(10),
  },
}));

interface HeaderAuthProps {
  imageUrl: string | null | undefined;
}

const locallinks = [
  {
    link: "/dashboard",
    label: "Home",
  },
  {
    link: "/kanaquiz",
    label: "Kana Quiz",
  },
  {
    link: "/community",
    label: "Community",
  },
];

export function HeaderAuth({ imageUrl }: HeaderAuthProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(locallinks[0].link);
  const { classes, cx } = useStyles();

  const router = useRouter();

  useEffect(() => {
    const basepath = router.asPath;
    setActive(basepath);
  }, [router.asPath]);

  const items = locallinks.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  const signOutItem = (
    <Link
      key="Sign Out"
      href="#"
      className={classes.link}
      onClick={() => {
        signOut({ redirect: true, callbackUrl: "/" });
        close();
      }}
    >
      Sign Out
    </Link>
  );

  return (
    <HeaderBase>
      <div className={classes.container}>
        <ProfilePic imageUrl={imageUrl} />
        <Group spacing={5} className={classes.links}>
          {items}
          {signOutItem}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </div>

      <Transition transition="slide-down" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            {items}
            {signOutItem}
          </Paper>
        )}
      </Transition>
    </HeaderBase>
  );
}
