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
// authorize 함수 부분만 이렇게 바꿔보세요
async authorize(credentials) {
  try {
    const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      body: JSON.stringify({
        username: credentials?.username,
        password: credentials?.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const user = await res.json();

    // 로그에 찍어서 실제로 워드프레스가 뭐라고 답하는지 확인 (디버깅용)
    console.log("WP Response:", user);

    if (res.ok && user.token) {
      return {
        id: user.user_id || user.user_email,
        name: user.user_display_name,
        email: user.user_email,
        // user_role이 없을 경우를 대비해 기본값 설정
        role: (user.user_role && user.user_role.length > 0) ? user.user_role[0] : "individual_member",
      };
    }
    return null;
  } catch (error) {
    console.error("Auth Fetch Error:", error);
    return null;
  }
}
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