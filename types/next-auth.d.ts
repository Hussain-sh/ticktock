import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    avatar: string;
  }

  interface Session {
    user: {
      id: string;
      avatar: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    avatar?: string;
  }
}
