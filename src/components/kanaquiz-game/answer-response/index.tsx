import { createStyles } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import Notification from "./notification";

interface AnswerResponseProps {
  showFailResponse: boolean;
  showSuccessResponse: boolean;
  formIsEmpty: boolean;
}

const useStyles = createStyles((theme) => ({
  errorResponse: { position: "absolute" },
  successResponse: { position: "absolute", right: 0 },
}));

export default function AnswerResponse({
  showFailResponse,
  showSuccessResponse,
  formIsEmpty,
}: AnswerResponseProps) {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.errorResponse}>
        <Notification
          isActive={showFailResponse && formIsEmpty}
          customStyle={{ backgroundColor: "red" }}
        >
          <IconX size={36} strokeWidth={3} color={"white"} />
        </Notification>
      </div>
      <div className={classes.successResponse}>
        <Notification
          isActive={showSuccessResponse && formIsEmpty}
          customStyle={{ backgroundColor: "green" }}
        >
          <IconCheck size={36} strokeWidth={3} color={"white"} />
        </Notification>
      </div>
    </>
  );
}
