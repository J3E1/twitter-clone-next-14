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
