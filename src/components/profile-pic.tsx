import { Avatar } from "@mantine/core";

interface ProfilePicProps {
  imageUrl: string | null | undefined;
}

export default function ProfilePic({ imageUrl }: ProfilePicProps) {
  return <Avatar radius="xl" src={imageUrl} />;
}
