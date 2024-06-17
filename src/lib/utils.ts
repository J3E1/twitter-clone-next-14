import prisma from '@/lib/prisma';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const addNotification = async (
	postId: string,
	type: 'follow' | 'reply' | 'like',
	username: string | null,
	userId: string ,
) => {
	try {
		if (type !== 'follow') {
			const post = await prisma.post.findUnique({
				where: {
					id: postId,
				},
			});

			if (post?.userId) {
				await prisma.notification.create({
					data: {
						body:
							type === 'reply'
								? `@${username} replied to your post.`
								: `@${username} liked on your post.`,
						userId: post.userId,
						fromPostId: postId,
						fromUserId: userId,
					},
				});
				await prisma.user.update({
					where: {
						id: post.userId,
					},
					data: {
						hasNotification: true,
					},
				});
			}
		} else {
			await prisma.notification.create({
				data: {
					body: `@${username} started following you.`,
					userId: postId,
					fromUserId: userId,
				},
			});
			await prisma.user.update({
				where: {
					id: postId,
				},
				data: {
					hasNotification: true,
				},
			});
		}
	} catch (error) {
		console.log('🚀 ~ file: utils.ts:12 ~ addNotification ~ error:', error);
		throw new Error((error as Error).message);
	}
};

export const convertImageToBase64 = (file: File):Promise<string> => {
	
	return new Promise((resolve, reject) => {
		if (!file) resolve('');
		const reader = new FileReader();
		reader.onload = event => {
			const base64String = event?.target?.result as string;
			resolve(base64String);
		};
		reader.onerror = error => {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
};
