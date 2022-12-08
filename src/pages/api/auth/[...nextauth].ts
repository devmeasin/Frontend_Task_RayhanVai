import "next-auth";
import { login } from "api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


declare module "next-auth" {
  type TData = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }

  interface IUser2 {
    data: TData;
  }
  interface IUser {
    user: IUser2;
  }

  interface Session {
    user: IUser;
  }
}

export const authOptions = {

  secret: process.env.NEXTAUTH_SECRET,

  providers: [

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      async authorize (credentials, req) {

        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
          try {
            const { email, password } = credentials;
            const { data } :any = await login({ email: email, password: password });
            return { jwt: data?.access_token, user: data };
          } catch (error) {
            console.warn(error);
          }

      }
    })],
  callbacks: {

    // jwt: async ({ token, user } :any) => {
    //   console.log('jwt', token, user);
    //   if (user) {
    //     token.access_token = user?.access_token;
    //     token.refresh_token = user?.refresh_token;
    //   }
    //   return token;
    // },

    // session: async ({ session , token  } :any) => {
    //   console.log('session', session, token);
    //   session.access_token = token?.access_token;
    //   session.refresh_token = token?.refresh_token;
    //   return session;
    // },

        jwt: async ({ token, user } :any) => {
          user && (token.user = user)
          return token
         },
        session: async ({ session, token } :any) => {
            session.user = token.user
            return session
        }

  },

  session: {
    jwt: true
  },


  pages: {
    signIn: '/auth/login',
    // newUser: '/auth/register',
    // New users will be directed here on first sign in (leave the property out if not of interest)
    // signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
  }

}

export default NextAuth(authOptions as any);