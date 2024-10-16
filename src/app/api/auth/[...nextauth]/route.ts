import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authenticateUser } from "@/services/authService"
import CredentialsProvider from 'next-auth/providers/credentials'; 

const authHandler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: 'Email', type: 'text' },
              password: { label: 'Password', type: 'password' },
           },
            async authorize(credentials) {
              if (!credentials || !credentials.email || !credentials.password) {
                return null;
              }

              let user = await authenticateUser(credentials.email, credentials.password);
              if (user) {
                return {
                  id: user.id,
                  email: user.identifier,
                  name: user.name || user.firstName,
                  userType: user.userType, 
                };
              } else {
                return null;
              }
            },
          }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signup', 
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url === '/api/auth/session' || url === baseUrl) {
              return `${baseUrl}/main/home`;
            }

            if (url === '/api/auth/signout') {
              return `${baseUrl}/auth/login`;
            }
            
            return baseUrl;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.email = user.email as string;
                token.name = user.name as string | undefined;
                token.image = user.image as string | undefined;
                token.userType = user.userType as string | undefined;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string | undefined,
                    image: token.image as string | undefined,
                    userType: token.userType as string | undefined,
                };
            }
            return session;
        }
    }
});

export const GET = authHandler;
export const POST = authHandler;


