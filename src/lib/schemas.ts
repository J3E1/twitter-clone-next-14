import { z } from 'zod';

export const registerSchema = z.object({
	username: z
		.string({ required_error: 'Please enter a username' })
		.min(3, { message: 'Please enter a valid username' })
		.max(20, { message: 'Username is too long' }),
	name: z.string({ required_error: 'Please enter a name' }).min(2).max(50),
	email: z
		.string({ required_error: 'Please enter an email' })
		.email({ message: 'Please enter a valid email' }),
	password: z
		.string({ required_error: 'Please enter a password' })
		.min(4)
		.max(20),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const editUserSchema = z.object({
	username: z
		.string({ required_error: 'Please enter a username' })
		.min(3, { message: 'Please enter a valid username' })
		.max(20, { message: 'Username is too long' }),
	name: z.string({ required_error: 'Please enter a name' }).min(2).max(50),
	bio: z.string().optional(),
	profileImage: z
		.custom<FileList>()
		.transform(file => file.length > 0 && file.item(0))
		.refine(file => !file || (!!file && file.size <= 2 * 1024 * 1024), {
			message: 'The profile picture must be a maximum of 2MB.',
		})
		.refine(file => !file || (!!file && file.type?.startsWith('image')), {
			message: 'Only images are allowed.',
		}),
	coverImage: z
		.custom<FileList>()
		.transform(file => file.length > 0 && file.item(0))
		.refine(file => !file || (!!file && file.size <= 2 * 1024 * 1024), {
			message: 'The profile picture must be a maximum of 2MB.',
		})
		.refine(file => !file || (!!file && file.type?.startsWith('image')), {
			message: 'Only images are allowed.',
		}),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Please enter an email' })
		.email({ message: 'Please enter a valid email' })
		.max(50),
	password: z
		.string({ required_error: 'Please enter a password' })
		.min(4, { message: 'Please enter a valid password' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
