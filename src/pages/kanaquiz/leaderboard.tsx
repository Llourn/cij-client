import LeaderboardEntry from "@/src/components/kanaquiz/leaderboard-entry";
import { ClassNames } from "@emotion/react";
import { Container, createStyles, Paper, Text } from "@mantine/core";
import kanaLeaderboard from "../../data/kana-leaderboard.json";

const useStyles = createStyles((theme) => ({
  leaderboardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
  },
  rankAndId: {
    display: "flex",
    alignItems: "center",
    gap: "5rem",
  },
  rank: {
    width: "3ch",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
  },
  score: {
    width: "4ch",
  },
}));

export default function Leaderboard() {
  const { classes } = useStyles();

  const leaderBoardList = kanaLeaderboard.topTen.map((entry, index) => {
    const entryInfo = {
      rank: index + 1,
      ...entry,
    };
    return <LeaderboardEntry key={index} entryData={entryInfo} />;
  });

  return (
    <Container size="lg">
      <Container size="sm" className={classes.leaderboardContainer}>
        <Paper p={"md"} pb="0" className={classes.header}>
          <div className={classes.rankAndId}>
            <Text>Rank</Text>
            <Text>User</Text>
          </div>
          <div className={classes.stats}>
            <Text>Score</Text>
            <Text>Time</Text>
          </div>
        </Paper>
        {leaderBoardList}
      </Container>
    </Container>
  );
}
