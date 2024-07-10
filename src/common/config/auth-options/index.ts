import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		jwt: async ({ user, token, trigger, session }) => {
			if (trigger === 'update') {
				return { ...token, ...session.user }
			}
			return { ...token, ...user }
		},
	},
	secret: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
}
