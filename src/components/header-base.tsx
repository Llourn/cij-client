import { createStyles, Header, Container } from "@mantine/core";
import MainLogo from "./main-logo";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },
  header: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));

export function HeaderBase({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();

  return (
    <Header height={60} className={classes.root}>
      <Container size="lg" className={classes.header}>
        <MainLogo />
        {children}
      </Container>
    </Header>
  );
}
