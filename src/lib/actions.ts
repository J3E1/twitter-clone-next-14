'use server';
import { revalidatePath } from 'next/cache';
import { auth, signIn } from './auth';
import prisma from './prisma';
import { EditUserSchema, LoginSchema, RegisterSchema } from './schemas';
import { addNotification, convertImageToBase64 } from './utils';
import bcrypt from 'bcrypt';

export const signInAction = async (values: LoginSchema) => {
	try {
		const res = await signIn('credentials', {
			...values,
			redirect: false,
		});
		revalidatePath('/');
		return { message: 'Sign in successful' };
	} catch (error) {
		if(error instanceof Error){
			return { error: error.message}
		} else {
			console.log('🚀 ~ file: actions.ts:22 ~ signInAction ~ error:', error);
			return { error: 'Something went wrong!'}
		}
	}
};

export const postTweet = async (post: FormData) => {
	try {
		const session = await auth();
		const userId = session?.user?.id;

		if (!session || !userId)
			throw new Error('You need to be logged in to post a tweet');

		if (!post.get('body')) throw new Error('Tweet cannot be empty');

		const tweet = await prisma.post.create({
			data: {
				body: post.get('body') as string,
				userId: userId,
			},
		});

		return { message: 'Tweet created' };
	} catch (error) {
		if(error instanceof Error){
			return { error: error.message}
		} else {
			console.log('🚀 ~ file: actions.ts:43 ~ postTweet ~ error:', error);
			return { error: 'Something went wrong!'}
		}
	}
};

export const postComment = async (form: FormData, postId: string) => {
	try {
		const session = await auth();
		const userId = session?.user?.id;

		if (!session || !userId)
			throw new Error('You need to be logged in to post a comment');

		if (!form.get('body')) throw new Error('Comment cannot be empty');

		if (!postId || typeof postId !== 'string') throw new Error('Invalid ID');

		await prisma.comment.create({
			data: {
				body: form.get('body') as string,
				userId: userId,
				postId,
			},
		});

		await addNotification(postId, 'reply', session.user.username, userId);

		return { message: 'Comment added' };
	} catch (error) {
		if(error instanceof Error){
			return { error: error.message}
		} else {
			console.log('🚀 ~ file: actions.ts:106 ~ submitComment ~ error:', error);
			return { error: 'Something went wrong!'}
		}
	}
};

export const likePost = async (postId: string) => {
	try {
		const session = await auth();
		const userId = session?.user?.id;

		if (!session || !userId)
			throw new Error('You need to be logged in to like a tweet');
		if (!postId || typeof postId !== 'string') {
			throw new Error('Invalid ID');
		}

		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			throw new Error('Post not found');
		}

		let updatedLikedIds = [...(post.likedIds || [])];
		let liked = false;

		if (updatedLikedIds.includes(userId)) {
			updatedLikedIds = updatedLikedIds.filter(likedId => likedId !== userId);
		} else {
			liked = true;
			updatedLikedIds.push(userId);
		}

		if (liked)
			await addNotification(postId, 'like', session.user.username, userId);

		const updatedPost = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likedIds: updatedLikedIds,
			},
		});

		return { message: liked ? 'Liked' : 'Like removed' };
	} catch (error) {
		if(error instanceof Error){
			return { error: error.message}
		} else {
			console.log('🚀 ~ file: actions.ts:114 ~ likePost ~ error:', error);
			return { error: 'Something went wrong!'}
		}
	}
};

export const followAction = async (userId: string) => {
	try {
		const session = await auth();
		const currentUserId = session?.user?.id;

		if (!session || !currentUserId)
			throw new Error('You need to be logged in to follow');
		if (!userId || typeof userId !== 'string') {
			throw new Error('Invalid ID');
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
			},
		});

		if (!user) {
			throw new Error('User not found');
		}

		let updatedFollowingIds = [...(session.user.followingIds || [])];
		let followed = false;
		if (updatedFollowingIds.includes(userId)) {
			updatedFollowingIds = updatedFollowingIds.filter(
				followingId => followingId !== userId
			);
		} else {
			followed = true;
			updatedFollowingIds.push(userId);
		}

		if (followed)
			await addNotification(
				userId,
				'follow',
				session.user.username,
				currentUserId
			);

		const res = await prisma.user.update({
			where: {
				id: currentUserId,
			},
			data: {
				followingIds: updatedFollowingIds,
			},
			select: {
				id: true,
			},
		});

		return { message: followed ? 'Followed' : 'Unfollowed' };
	} catch (error) {
		if(error instanceof Error){
			return { error: error.message}
		} else {
			console.log('🚀 ~ file: queries.ts:139 ~ followAction ~ error:', error);
			return { error: 'Something went wrong!'}
		}
	}
};

export const registerUser = async (values: RegisterSchema) => {
	try {
		const hashedPassword = await bcrypt.hash(values.password, 12);

		const user = await prisma.user.create({
			data: {
				hashedPassword,
				name: values.name,
				username: values.username,
				email: values.email,
			},
		});
		await signIn('credentials', {
			...{ email: values.email, password: values.password },
			redirect: false,
		});
		return { message: 'Sign up successful' };
	} catch (error) {
		if(error instanceof Error){
			return { error: error.message}
		} else {
			console.log('🚀 ~ file: actions.ts:148 ~ registerUser ~ error:', error);
			return { error: 'Something went wrong!'}
		}
	}
};
