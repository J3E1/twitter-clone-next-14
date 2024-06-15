'use client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type Props = { isModal?: boolean };
export default function TweetForm({ isModal = false }: Props) {
	const [input, setInput] = useState('');
	return (
		<div className={cn('flex flex-1 gap-x-2',isModal ? '':'p-4 border-b border-input')}>
			<Avatar className='mt-1'>
				<AvatarImage
					alt='Roy Quilor'
					src='https://pbs.twimg.com/profile_images/1489998205236527108/q2REh8nW_400x400.jpg'
				/>
				<AvatarFallback>{'RQ'}</AvatarFallback>
			</Avatar>
			<form className='flex flex-col flex-1 gap-y-4'>
				<div className='flex flex-1'>
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						type='text'
						placeholder="What's up?"
						className='w-full px-4 py-3 text-xl border-transparent placeholder:text-muted-foreground outline-0 focus:outline-0 focus:outline-none appearance-none focus:ring-0 focus:border-transparent bg-background'
					/>
				</div>
				<div className='self-end'>
					<Button disabled={!input}>Tweet</Button>
				</div>
			</form>
		</div>
	);
}
