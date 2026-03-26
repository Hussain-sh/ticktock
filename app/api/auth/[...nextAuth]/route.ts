import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/app/lib/mockData/users";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email:    { type: "email"    },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email    === credentials?.email &&
            u.password === credentials?.password
        );
        return user ?? null;
      },
    }),
  ],
  pages:   { signIn: "/login" },
  session: { strategy: "jwt"  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id     = user.id;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id     = token.id     as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };