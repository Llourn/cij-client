import { percentAsInt } from "@/src/utilities/general";
import { Paper, Group, Progress, Text } from "@mantine/core";

interface ProgressBarProps {
  total: number;
  value: number;
}

export default function ProgressBar({ total, value }: ProgressBarProps) {
  return (
    <Paper p={"xl"}>
      <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Progress
        </Text>
        <Text fz="sm" color="dimmed">
          {percentAsInt(total, value)}%
        </Text>
      </Group>
      <Progress
        size="xl"
        value={percentAsInt(total, value)}
        striped
        mt={"md"}
      />
    </Paper>
  );
}
