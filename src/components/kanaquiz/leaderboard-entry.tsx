import { secondsToMinAndSec } from "@/src/utilities/general";
import { createStyles, Paper, rem, Text } from "@mantine/core";
import ProfilePic from "../profile-pic";

const useStyles = createStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
  },
  rankAndId: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  rank: {
    width: "3ch",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  score: {
    width: "4ch",
  },
}));

const medalRank = (rank: number) => {
  if (rank > 3) return rank;
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
};

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  imageUrl: string;
  profileUrl: string;
  score: number;
  timeInSeconds: number;
}

export default function LeaderboardEntry({
  entryData,
}: {
  entryData: LeaderboardEntryProps;
}) {
  const { classes } = useStyles();

  return (
    <Paper
      className={classes.container}
      shadow="sm"
      withBorder
      p={"md"}
      component="a"
      href={entryData.profileUrl}
    >
      <div className={classes.rankAndId}>
        <Text className={classes.rank} ta={"center"} size={"lg"}>
          {medalRank(entryData.rank)}
        </Text>
        <ProfilePic imageUrl={entryData.imageUrl} />
        <Text>{entryData.name}</Text>
      </div>
      <div className={classes.stats}>
        <Text className={classes.score} ta={"center"}>
          {entryData.score}
        </Text>
        <Text>{secondsToMinAndSec(entryData.timeInSeconds)}</Text>
      </div>
    </Paper>
  );
}
