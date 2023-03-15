import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
} as AuthOptions;

export default NextAuth(authOptions);
