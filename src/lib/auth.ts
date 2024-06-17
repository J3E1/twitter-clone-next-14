import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './schemas';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's profile image. */
			profileImage: string;
			/** The user's name. */
			name: string;
			/** The user's username. */
			username: string;
			/** The ids of the users that the user is following. */
			followingIds: string[];
			/** If the user has notifications */
			hasNotification: boolean;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession['user'];
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	// adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				try {
					const { email, password } = await loginSchema.parseAsync(credentials);

					const user = await prisma.user.findUnique({
						where: {
							email: email,
						},
						select: {
							id: true,
							hashedPassword: true,
						},
					});

					if (!user) {
						throw new Error('User not found.');
					}
					const isPasswordIncorrect = await bcrypt.compare(
						password,
						user.hashedPassword
					);

					if (!isPasswordIncorrect) throw new Error('Invalid password');

					return user;
				} catch (error) {
					return null;
				}
			},
		}),
	],
	debug: process.env.NODE_ENV !== 'production',
	callbacks: {
		session: async ({ session, token }) => {
			if (!token.sub) return session;
			const user = await prisma.user.findUnique({
				where: {
					id: token.sub,
				},
				select: {
					id: true,
					name: true,
					username: true,
					profileImage: true,
					followingIds: true,
					email: true,
					hashedPassword: true,
					hasNotification: true,
				},
			});
			if (!user) return session;

			session.user.name = user.name as string;
			session.user.id = user.id as string;
			session.user.profileImage = user.profileImage as string;
			session.user.username = user.username as string;
			session.user.email = user.username as string;
			session.user.followingIds = user.followingIds as string[];
			session.user.hasNotification = user.hasNotification as boolean;

			return session;
		},
	},
});
