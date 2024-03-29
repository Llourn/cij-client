import { createStyles, Paper, rem, Sx, Transition } from "@mantine/core";

interface AnswerResponseProps {
  children: React.ReactNode;
  customStyle?: Sx;
  isActive: boolean;
}

const useStyles = createStyles((theme) => ({
  response: {
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: rem(50),
  },
}));

export default function Notification({
  isActive,
  customStyle,
  children,
}: AnswerResponseProps) {
  const { classes } = useStyles();

  return (
    <Transition
      mounted={isActive}
      transition="slide-up"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <Paper
          className={classes.response}
          radius={"xl"}
          sx={customStyle}
          m="md"
          style={styles}
        >
          {children}
        </Paper>
      )}
    </Transition>
  );
}
