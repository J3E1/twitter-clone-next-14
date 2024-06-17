'use client';
import { LogOutIcon } from 'lucide-react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import TwitterIcon from './twitter-icon';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';

export default function LogoutButton() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const logoutHandler = async () => {
		try {
			setIsLoading(true);
			await signOut({ redirect: false });
			router.replace('/');
			router.refresh();
			setOpen(false);
			setIsLoading(false);
			toast({
				title: 'Logged out',
				variant: 'success',
			});
		} catch (error) {
			setIsLoading(false);
			toast({
				title: (error as Error).message,
				variant: 'destructive',
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className='flex items-center space-x-4 px-4 lg:pl-4 lg:pr-5 py-3 hover:bg-foreground/10 text-foreground my-1 max-w-fit rounded-full'>
					<LogOutIcon className='w-6 h-6' />
					<span className='hidden lg:inline-flex flex-none text-lg font-medium'>
						Logout
					</span>
				</button>
			</DialogTrigger>
			<DialogContent className='max-w-xs'>
				<DialogHeader>
					<div className='my-4 flex justify-center'>
						<TwitterIcon className='h-8 w-8' />
					</div>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						You can always log back in at any time.
					</DialogDescription>
				</DialogHeader>
				<div className='space-y-3'>
					<Button
						type='button'
						disabled={isLoading}
						className='w-full'
						onClick={logoutHandler}>
						Log out
					</Button>
					<DialogClose asChild>
						<Button
							disabled={isLoading}
							type='button'
							id='close-logout'
							variant='secondary'
							className='w-full'>
							Close
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
