import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubAuthProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  providers: [
    GitHubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile) {
        // find out the user
        await dbConnect();
        const oldUser = await User.findOne({ email: profile.email });
        // store new user inside db
        if (!oldUser) {
          const newUser = new User({
            email: profile.email,
            name: profile.name || profile.login,
            provider: "github",
            avatar: profile.avatar_url,
          });

          await newUser.save();
        }

        return profile;
      },
    }),
  ],
};

export default NextAuth(authOptions);
