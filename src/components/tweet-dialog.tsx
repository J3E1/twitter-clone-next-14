'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Feather } from 'lucide-react';
import TweetForm from './tweet-form';
import { AuthForm } from './auth-dialog';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
export default function TweetDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className='h-10 w-10 lg:h-12 lg:w-full mt-5 space-x-4'
					size={'icon'}>
					<Feather className='h-4 w-4 sm:w-6 sm:h-6' />
					<span className='hidden lg:inline font-semibold'>Tweet</span>
				</Button>
			</DialogTrigger>
			<DialogContent className=''>
				<TweetForm isModal onOpenChange={setOpen} />
			</DialogContent>
		</Dialog>
	);
}
