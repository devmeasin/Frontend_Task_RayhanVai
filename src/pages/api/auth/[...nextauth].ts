import "next-auth";
import { parseCookies, setCookie } from 'nookies';

import { login, refreshToken } from "http/index";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IRefreshTokenData } from "http/type";


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


const refreshAccessToken =  async function (refreshTokenX : string) {

  try {
    
    const { data }:any = await refreshToken({refresh_token: refreshTokenX, mode: 'json'});
    // const cookies = parseCookies();
    const tokenDataJson =  JSON.stringify({
      access_token:data?.access_token,
      refresh_token: data?.refresh_token,
      accessTokenExpires : new Date(Date.now() + Number(data.expires) * 1000).toISOString(),
    });

    setCookie(null, 'tokenData', tokenDataJson);

    return {
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
      accessTokenExpires:  new Date(Date.now() + Number(data.expires) * 1000).toISOString(),
    }

  } catch (error) {
    console.log(error);
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

        // jwt: async ({ token, user } :any) => {
        //   user && (token.user = user)
        //   return token
        //  },
        // session: async ({ session, token } :any) => {
        //     session.user = token.user
        //     return session
        // }


        async jwt({ token, user, account }) {
          // Initial sign in
          if (account && user) {
            return {
              accessToken: account.access_token,
              accessTokenExpires: Date.now() + account.expires_at * 1000,
              refreshToken: account.refresh_token,
              user,
            }
          }
    
          // Return previous token if the access token has not expired yet
          if (Date.now() < token.accessTokenExpires) {
            return token
          }
    
          // Access token has expired, try to update it
          return refreshAccessToken(token);
        },
        async session({ session, token }) {
          session.user = token.user
          session.accessToken = token.accessToken
          session.error = token.error
    
          return session
        },

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