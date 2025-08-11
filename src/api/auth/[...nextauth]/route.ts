import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
declare module "next-auth/jwt" {

  interface JWT extends DefaultJWT {
    accessToken?: string;
    role?: "ADMIN" | "USER";
    exp?: number;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: DefaultSession["user"] & {
      role?: "ADMIN" | "USER";
      exp?: number;
    };
  }

  interface User extends DefaultUser {
    accessToken?: string;
    role?: "ADMIN" | "USER";
    exp?: number;
  }
}

interface BackResponse {
  user: { user_id: string; email: string; role: "ADMIN" | "USER" };
  access_token: string;
}

export const handlerAuth = NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch('http://localhost:4000/auth/login', {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const json: BackResponse = await res.json();

          if (!res.ok) return null;

          const { exp } = jwtDecode<{ exp: number }>(json.access_token);

          return {
            id: json.user.user_id,
            email: json.user.email,
            accessToken: json.access_token,
            role: json.user.role,
            exp,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;      
        token.exp = user.exp;       
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.role   = token.role as "ADMIN" | "USER";
      session.user.exp    = token.exp as number;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handlerAuth as GET, handlerAuth as POST }