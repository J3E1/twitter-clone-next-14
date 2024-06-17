import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const editUserSchema = z.object({
	username: z
		.string({ required_error: 'Please enter a username' })
		.min(3, { message: 'Please enter a valid username' })
		.max(20, { message: 'Username is too long' }),
	name: z.string({ required_error: 'Please enter a name' }).min(2).max(50),
	bio: z.string().optional(),
	profileImage: z.string().optional(),
	coverImage: z.string().optional(),
});

export const PUT = async (req: NextRequest, res: NextResponse) => {
	try {
		const session = await auth();
		const currentUserId = session?.user?.id;

		if (!session || !currentUserId) throw new Error('You need to be logged in');

		// Validate input data
		const validatedData = editUserSchema.parse(req.body);

		const user = await prisma.user.findUnique({
			where: {
				id: currentUserId,
			},
			select: {
				id: true,
				profileImage: true,
				coverImage: true,
			},
		});

		if (!user) throw new Error('User not found');

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUserId,
			},
			data: {
				name: validatedData.name,
				username: validatedData.username,
				bio: validatedData.bio,
				profileImage: validatedData.profileImage || user.profileImage,
				coverImage: validatedData.coverImage || user.coverImage,
			},
		});

		return NextResponse.json({ message: 'Profile updated' });
	} catch (error) {
		console.error('Error updating profile:', error);
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 400 }
		);
	}
};


