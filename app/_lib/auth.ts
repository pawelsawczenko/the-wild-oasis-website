import NextAuth, { Session, User } from "next-auth";
import google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({
      auth,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      if (!user.email) return false;
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest && user.name)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      const guest = await getGuest(session.user?.email as string);
      if (guest) session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
