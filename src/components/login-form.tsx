'use client';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
	LoginSchema,
	loginSchema,
} from '@/lib/schemas';

export default function LoginForm({setMode}: {
	setMode: Dispatch<SetStateAction<boolean>>;
}) {
	const [showPassword, setShowPassword] = useState(false);

	const loginForm = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	function onSubmit(values: LoginSchema) {
		console.log(values);
	}
	return (
		<Card className='mx-auto border-0 w-full'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...loginForm}>
					<form
						onSubmit={loginForm.handleSubmit(onSubmit)}
						className='space-y-3'>
						<FormField
							control={loginForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='john@doe.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={loginForm.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												id='password'
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>

											{showPassword ? (
												<EyeOff
													className='absolute right-4 top-2 text-muted-foreground hover:text-foreground focus:text-foreground cursor-pointer transition-colors'
													onClick={() => setShowPassword(false)}
												/>
											) : (
												<Eye
													className='absolute right-4 top-2 text-muted-foreground hover:text-foreground focus:text-foreground cursor-pointer transition-colors'
													onClick={() => setShowPassword(true)}
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full'>
							Login
						</Button>
						<Button variant='outline' className='w-full'>
							Continue with Google
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<span
						onClick={() => setMode(true)}
						className='underline cursor-pointer'>
						Sign up
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
