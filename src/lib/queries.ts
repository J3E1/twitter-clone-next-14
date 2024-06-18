import prisma from '@/lib/prisma';
import { auth } from './auth';
export const getAllPosts = async () => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
				comments: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return posts;
	} catch (error) {
		console.log('🚀 ~ file: queries.ts:4 ~ getAllPosts ~ error:', error);
		throw new Error((error as Error).message);
	}
};
export const getAllByUserId = async (userId: string) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				userId: userId,
			},
			include: {
				user: true,
				comments: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return posts;
	} catch (error) {
		console.log('🚀 ~ file: queries.ts:4 ~ getAllPosts ~ error:', error);
		throw new Error((error as Error).message);
	}
};

export const getUserById = async (userId: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
			include: {
				posts: {
					include: {
						comments: true,
						user: true,
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (!user) throw new Error('User not found');
		const followersCount = await prisma.user.count({
			where: {
				followingIds: {
					has: user.id,
				},
			},
		});
		return { ...user, followersCount };
	} catch (error) {
		console.log('🚀 ~ file: queries.ts:26 ~ getUserByUsername ~ error:', error);
		throw new Error((error as Error).message);
	}
};

export const getWhoToFollow = async () => {
	try {
		const session = await auth();
		let followUsers = [];

		if (session?.user) {
			followUsers = await prisma.user.findMany({
				where: {
					id: {
						notIn: [...session?.user.followingIds, session.user.id as string],
					},
				},
				take: 4,
				orderBy: {
					createdAt: 'desc',
				},
				select: {
					id: true,
					username: true,
					name: true,
					profileImage: true,
				},
			});
		} else {
			followUsers = await prisma.user.findMany({
				take: 4,
				orderBy: {
					createdAt: 'desc',
				},
				select: {
					id: true,
					username: true,
					name: true,
					profileImage: true,
				},
			});
		}

		return followUsers;
	} catch (error) {
		console.log('🚀 ~ file: queries.ts:24 ~ getWhoToFollow ~ error:', error);
		throw new Error((error as Error).message);
	}
};

export const getPostById = async (postId: string) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
			include: {
				user: true,
				comments: {
					include: {
						user: true,
					},
					orderBy: {
						createdAt: 'asc',
					},
				},
			},
		});
		return post;
	} catch (error) {
		console.log('🚀 ~ file: queries.ts:115 ~ getPostById ~ error:', error);
		throw new Error((error as Error).message);
	}
};

export const getAllNotificationsOfCurrentUser = async () => {
	try {
		const session = await auth();
		if (!session?.user.id)
			throw new Error('You need to be logged in to get notifications');
		const notifications = await prisma.notification.findMany({
			where: {
				userId: session.user.id,
			},
			select: {
				id: true,
				body: true,
				userId: true,
				read: true,
				createdAt: true,
				fromUserId: true,
				fromPostId: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		let notificationsWithUser: {
			notification: {
				id: string;
				createdAt: Date;
				body: string;
				userId: string;
				read: boolean;
				fromPostId: string | null;
				fromUserId: string | null;
			};
			fromUser: {
				id: string;
				name: string;
				username: string;
				profileImage: string | null;
			};
		}[] = [];
		// get users data from fromUserId and add it to that notification
		for (const notification of notifications) {
			const user = await prisma.user.findUnique({
				where: {
					id: notification.fromUserId!,
				},
				select: {
					id: true,
					name: true,
					username: true,
					profileImage: true,
				},
			});
			notificationsWithUser.push({
				notification,
				fromUser: user!,
			});
		}
		return notificationsWithUser;
	} catch (error) {
		console.log(
			'🚀 ~ file: queries.ts:151 ~ getAllNotificationsOfCurrentUser ~ error:',
			error
		);
		throw new Error((error as Error).message);
	}
};

export const getFollowersByUserId = async (
	userId: string,
	type: 'following' | 'followers'
) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: { followingIds: true, username: true },
		});

		if (!user) throw new Error('User not found');
		let followers;
		if (type === 'following') {
			followers = await prisma.user.findMany({
				where: {
					id: {
						in: user.followingIds,
					},
				},
				select: {
					id: true,
					name: true,
					username: true,
					profileImage: true,
				},
			});
		} else {
			followers = await prisma.user.findMany({
				where: {
					followingIds: {
						has: userId,
					},
				},
				select: {
					id: true,
					name: true,
					username: true,
					profileImage: true,
				},
			});
		}

		return { user, followers };
	} catch (error) {
		console.log(
			'🚀 ~ file: queries.ts:183 ~ getFollowersByUserId ~ error:',
			error
		);

		throw new Error((error as Error).message);
	}
};
