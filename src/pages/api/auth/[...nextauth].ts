import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
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
import axiosInstance from '@/api/axiosInstance'

// Extend types for session, user, and JWT
declare module 'next-auth' {
  interface Session {
    accessToken?: string
    id?: string
    role?: string
  }
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

// We export authOptions type so getServerSession can use it
export const authOptions = (baseUrl: string): AuthOptions => ({
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
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
      async authorize(credentials) {
        if (!credentials) return null
        try {
          const resToken = await loginAccessTokenLoginPost({
            username: credentials.email,
            password: credentials.password,
          })
          const token = resToken?.data?.access_token
          const userResp = await axiosInstance.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const u = userResp.data.data
          if (!u || !token) return null
          return {
            id: u.id?.toString() || '',
            name: u.full_name,
            email: u.email,
            accessToken: token,
            role: u.role || 'user',
          }
        } catch (error) {
          console.error('Authorize error:', error)
          return null
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GithubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          redirect_uri: `${baseUrl}/api/auth/callback/google`,
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID!,
      clientSecret: process.env.AUTH0_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      const allowed = (process.env.NEXTAUTH_URL_ALLOW_LIST || '')
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean)
      if (allowed.some((domain) => url.startsWith(domain))) {
        return url
      }
      return baseUrl
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = (user as any).accessToken
        token.role = (user as any).role
      }
      console.log('JWT callback:', account)
      if (account?.provider === 'google') {
        try {
          const data = await googleCallbackLoginGoogleCallbackGet({
            id_token_params: account.id_token as string,
          })
          console.log('google', data)
          const googleData = data as { data: { access_token: string; user: { role: string } } }
          token.role = googleData.data.user.role
          token.accessToken = googleData.data.access_token
        } catch (error: any) {
          console.error('Google OAuth callback error:', error)
          console.error('Google OAuth failed', error)
        }
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
    signIn: `${baseUrl}/auth/login`,
    error: `${baseUrl}/auth/error`,
    signOut: `${baseUrl}/auth/signout`,
    newUser: `${baseUrl}/auth/new-user`,
  },
  theme: { colorScheme: 'light' },
})

// Default export handler constructing baseUrl dynamically
export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || ''
  const proto =
    req.headers['x-forwarded-proto'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http')
  const baseUrl = `${proto}://${host}`
  return NextAuth(req, res, authOptions(baseUrl))
}

// Usage in API routes or getServerSession:
// import { getServerSession } from 'next-auth';
// import authHandler, { authOptions } from './[...nextauth]';
//
// // In API route
// const session = await getServerSession(req, res, authOptions(`${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`));
