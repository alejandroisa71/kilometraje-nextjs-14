// import { Credentials } from 'next-auth/providers/credentials';
// export { GET, POST } from "@/auth"

// import { NextResponse } from "next/server";

// export function GET(){
//    return NextResponse.json('hello world')
// }

// import NextAuth from 'next-auth/next';
// import CredentialsProvider from 'next-auth/providers/credentials';

// const AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
//         password: { label: 'Password', type: 'password' },
//       },
//         authorize(credentials, req) {
//         return null;
//       },
//     }),
//   ],
// };

// const handler = NextAuth(AuthOptions);

// export { handler as GET, handler as POST };

// import CredentialsProvider from "next-auth/providers/credentials";
// // import GoogleProvider from "next-auth/providers/google";
// import db from "@/libs/db";
// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password", placeholder: "*****" },
//       },

//       async authorize(credentials) {
//         const userFound = await db.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!userFound) throw new Error("Invalid credentials");

//         const matchPassword = await bcrypt.compare(
//           credentials.password,
//           userFound.password
//         );

//         if (!matchPassword) throw new Error("Invalid credentials");

//         return {
//           id: userFound.id,
//           name: userFound.username,
//           email: userFound.email,
//         };
//       },
//     }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user;

//       return { id: token.id, user: token.user, email: token.email };
//     },

//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//       // return NextResponse.json(
//       // { session, message: "Successful registration" },
//       // { status: 201 }
//     // );
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

export { GET, POST } from "@/auth"