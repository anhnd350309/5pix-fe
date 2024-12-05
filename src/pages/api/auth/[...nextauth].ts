import NextAuth, { AuthOptions, Session, User } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import { loginAccessTokenLoginPost } from '@/services/login/login'
import { detailMeUsersMeGet } from '@/services/user/user'
declare module 'next-auth' {
  interface Session {
    accessToken?: string
    id?: string
  }
}

declare module 'next-auth' {
  interface User {
    accessToken?: string
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 1 day
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Please input your email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Please input your password',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            return null
          }
          console.log(credentials)
          const res = await loginAccessTokenLoginPost({
            username: credentials.email,
            password: credentials.password,
          })
          const token = res?.data?.access_token
          // how to save token to session here

          console.log(token)
          const userData = await detailMeUsersMeGet({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dapi.5pix.org',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(userData)
          const user = {
            id: userData?.data?.data?.id?.toString() || '',
            name: userData?.data?.data?.full_name,
            email: userData?.data?.data?.email,
            accessToken: token,
          }

          // If no user was found, return null
          if (!user) {
            return null
          }

          // Return user object if authentication was successful
          return user
        } catch (error) {
          console.error('Error during authentication:', error)
          return null
        }
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
  pages: {
    signIn: '/auth/login', // custom login page
  },
}

export default NextAuth(authOptions)
