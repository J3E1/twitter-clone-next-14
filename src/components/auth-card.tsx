'use client';
import { Suspense, useState } from 'react';
import { AuthForm } from './auth-dialog';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { PlusIcon } from 'lucide-react';
import LoadingSpinner from './loading-spinner';

export default function AuthCard() {
	const [open, setOpen] = useState(false);

	const spinner = (
		<div className='flex justify-center items-center mt-72'>
			<LoadingSpinner className='h-10 w-10' />
		</div>
	);
	return (
		<Suspense fallback={spinner}>
			<Button
				onClick={() => setOpen(true)}
				className='h-10 w-10 mt-5 lg:hidden'
				size={'icon'}>
				<PlusIcon className='w-6 h-6' />
			</Button>
			<Card className='hidden lg:block mt-3'>
				<CardHeader>
					<CardTitle>Sign In Now</CardTitle>
					<CardDescription>
						Unlock all of our features with one simple sign-in.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AuthForm onOpenChange={setOpen} open={open} />
				</CardContent>
			</Card>
		</Suspense>
	);
}
