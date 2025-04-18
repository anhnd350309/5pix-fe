import NextAuth, { AuthOptions, Session, User } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import {
  googleCallbackLoginGoogleCallbackGet,
  loginAccessTokenLoginPost,
} from '@/services/login/login'
import { detailMeUsersMeGet } from '@/services/user/user'
import { UserRole } from '@/schemas/userRole'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    id?: string
    role?: string
  }
}

declare module 'next-auth' {
  interface User {
    accessToken?: string
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    role?: string
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
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
          const res = await loginAccessTokenLoginPost({
            username: credentials.email,
            password: credentials.password,
          })
          const token = res?.data?.access_token

          const userData = await detailMeUsersMeGet({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.5pix.org',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const user = {
            id: userData?.data?.data?.id?.toString() || '',
            name: userData?.data?.data?.full_name,
            email: userData?.data?.data?.email,
            accessToken: token,
            role: userData?.data?.data?.role || 'user',
          }

          if (!user) {
            return null
          }

          return user
        } catch (error) {
          console.error('Error during authentication:', error)
          return null
        }
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
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken
        token.role = user.role
      }
      if (account?.provider === 'google') {
        const data = await googleCallbackLoginGoogleCallbackGet({
          id_token_params: account?.id_token as string,
        })
        const googleData = data as { data: { access_token: string } }
        token.accessToken = googleData.data.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.role = token.role as string
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    signOut: '/auth/signout',
    newUser: '/auth/new-user',
  },
}

export default NextAuth(authOptions)
