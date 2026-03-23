import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "WordPress",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. WordPress에 로그인을 요청하여 토큰을 받아옵니다.
        const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // 2. 로그인이 성공하면 유저 정보(역할 포함)를 반환합니다.
        if (res.ok && user) {
          return {
            id: user.user_id,
            name: user.user_display_name,
            email: user.user_email,
            role: user.user_role[0], // WordPress에서의 역할 (member 등)
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // 세션에 'role' 정보를 포함시켜서 클라이언트에서 사용할 수 있게 합니다.
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };