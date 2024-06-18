'use client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { toast } from './ui/use-toast';
import { postComment, postTweet } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
	isModal?: boolean;
	onOpenChange?: Dispatch<SetStateAction<boolean>>;
	postId?: string;
};
export default function TweetForm({
	isModal = false,
	onOpenChange,
	postId,
}: Props) {
	const router = useRouter();
	const session = useSession();
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const submitTweet = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const formData = new FormData();
			if (!input) throw new Error('Tweet can not be empty!');
			formData.append('body', input);
			const res = await postTweet(formData);
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
			setInput('');
			router.refresh();
			onOpenChange && onOpenChange(false);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};
	const submitComment = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const formData = new FormData();
			if (!input) throw new Error('Comment can not be empty!');
			formData.append('body', input);
			const res = await postComment(formData, postId!);
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
			setInput('');
			router.refresh();
			onOpenChange && onOpenChange(false);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};
	return (
		<div
			className={cn(
				'flex flex-1 gap-x-2',
				isModal ? '' : 'p-4 border-b border-input'
			)}>
			<Avatar className='mt-1'>
				{session.data?.user.profileImage ? (
					<AvatarImage
						src={session.data.user.profileImage}
						alt={session.data.user.name}
					/>
				) : null}
				<AvatarFallback>{`${session.data?.user.name[0] || ''}`}</AvatarFallback>
			</Avatar>
			<form className='flex flex-col flex-1 gap-y-4' onSubmit={submitTweet}>
				<div className='flex flex-1'>
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						type='text'
						name='tweetInput'
						placeholder="What's up?"
						disabled={isLoading}
						className='w-full px-4 py-3 text-xl border-transparent placeholder:text-muted-foreground outline-0 focus:outline-0 focus:outline-none appearance-none focus:ring-0 focus:border-transparent bg-background'
					/>
				</div>
				<div className='self-end'>
					<Button
						disabled={!input || isLoading}
						onClick={postId ? submitComment : submitTweet}>
						Tweet
					</Button>
				</div>
			</form>
		</div>
	);
}
