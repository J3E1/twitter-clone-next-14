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
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { RegisterSchema, registerSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useToast } from './ui/use-toast';
import { registerUser } from '../lib/actions';
import OAuthButton from './o-auth-button';

export default function RegisterForm({
	setMode,
	onOpenChange,
}: {
	setMode: Dispatch<SetStateAction<boolean>>;
	onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
	const session = useSession();

	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const { toast } = useToast();

	const [isPending, startTransition] = useTransition();

	const registerForm = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			name: '',
			username: '',
			password: '',
		},
	});
	function onSubmit(values: RegisterSchema) {
		startTransition(() => {
			session.status === 'unauthenticated' &&
				registerUser(values)
					.then(res => {
						router.refresh();
						if (res.message) {
							toast({
								title: res.message,
								variant: 'success',
							});
						} else {
							toast({
								title: res.error,
								variant: 'destructive',
							});
						}
						onOpenChange(false);
					})
					.catch(err => {
						toast({
							title: (err as Error).message,
							variant: 'destructive',
						});
					});
		});
	}
	return (
		<Card className='mx-auto border-0 w-full'>
			<CardHeader>
				<CardTitle className='text-2xl'>Register</CardTitle>
				<CardDescription>
					Enter your details to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...registerForm}>
					<form
						onSubmit={registerForm.handleSubmit(onSubmit)}
						className='space-y-3'>
						<FormField
							control={registerForm.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder='John Doe'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={registerForm.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder='john@56'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={registerForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder='john@doe.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={registerForm.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												disabled={isPending}
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

						<Button disabled={isPending} type='submit' className='w-full'>
							Register
						</Button>
						<OAuthButton />
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<span
						onClick={() => setMode(false)}
						className='underline cursor-pointer'>
						Sign up
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
