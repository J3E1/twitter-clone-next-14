'use client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useState,
} from 'react';
import { Button } from './ui/button';
import { cn, convertImageToBase64 } from '@/lib/utils';
import { toast } from './ui/use-toast';
import { postComment, postTweet } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input } from './ui/input';
import { Image } from 'lucide-react';

type Props = {
	isModal?: boolean;
	onOpenChange?: Dispatch<SetStateAction<boolean>>;
	postId?: string;
	isComment?: boolean;
};
export default function TweetForm({
	isModal = false,
	onOpenChange,
	postId,
	isComment = false,
}: Props) {
	const router = useRouter();
	const session = useSession();
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [attachedImage, setAttachedImage] = useState<File | null>(null);

	const submitTweet = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			if (!input) throw new Error('Tweet can not be empty!');
			if (input.length > 120)
				throw new Error(
					'You exceeded characters per tweet. 120 characters are allowed per tweet.'
				);
			let base64Image = attachedImage
				? await convertImageToBase64(attachedImage as File)
				: null;

			const res = await postTweet({ body: input, image: base64Image });
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
			setAttachedImage(null);
			onOpenChange && onOpenChange(false);
			setIsLoading(false);
		} catch (error) {
			toast({
				title: (error as Error).message,
				variant: 'destructive',
			});
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

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e?.target?.files ? e?.target?.files[0] : null;
		if (file) {
			const maxFileSizeMB = 1.5;
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

			if (allowedTypes.includes(file.type)) {
				if (file.size <= maxFileSizeMB * 1024 * 1024) {
					setAttachedImage(file);
				} else {
					toast({
						title: `File size exceeds ${maxFileSizeMB} MB limit`,
						variant: 'destructive',
					});
				}
			} else {
				toast({
					title: 'Invalid file type. Please select an image file (jpeg, png).',
					variant: 'destructive',
				});
			}
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
				<div className='flex items-center justify-end'>
					{!isComment && (
						<div className='flex items-center justify-start flex-1'>
							<Input
								className='hidden'
								type='file'
								accept='image/*'
								id='tweetImage'
								onChange={handleFileChange}
							/>
							<label htmlFor='tweetImage'>
								<Image className='w-5 h-5 hover:cursor-pointer' />
							</label>
							{attachedImage ? (
								<span className='ml-2 text-sm'>Image selected</span>
							) : null}
							<span className='sr-only'>Image</span>
						</div>
					)}
					<Button
						disabled={!input || isLoading}
						className='justify-self-end'
						onClick={postId ? submitComment : submitTweet}>
						Tweet
					</Button>
				</div>
			</form>
		</div>
	);
}
