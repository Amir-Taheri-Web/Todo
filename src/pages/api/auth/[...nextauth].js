import User from "@/models/user";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { validateEmail, validatePassword } from "@/utils/validate";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Connection to database failed");
        }

        const session = await getSession({ req });

        if (session) throw new Error("You are already signed in!");

        const { email, password } = credentials;

        if (!email.trim() || !email.trim())
          throw new Error("Please fill all fields");

        if (!validateEmail(email)) throw new Error("Email is not valid");

        if (!validatePassword(password))
          throw new Error(
            "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character(~`! @#$%^&*()-_+={}[]|;:<>,./?)"
          );

        const user = await User.findOne({ email: email });

        if (!user) throw new Error("Email does not exist");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("Email or password is incorrect");

        return { email };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
