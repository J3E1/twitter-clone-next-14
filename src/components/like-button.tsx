'use client';
import { likePost } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { toast } from './ui/use-toast';
import LikeIcon from './like-icon';

type Props = { likes: number; liked: boolean; postId: string };
export default function LikeButton({ likes, liked, postId }: Props) {
	const router = useRouter();

	const likeHandler = async (e: MouseEvent) => {
		try {
			e.stopPropagation();
			const res = await likePost(postId);
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
		} catch (error) {}
	};

	return (
		<li
			onClick={likeHandler}
			className={cn(
				'flex items-center justify-center gap-x-2 hover:cursor-pointer font-semibold',
				liked ? 'text-red-500 hover:text-red-600' : 'hover:text-foreground'
			)}>
			{liked ? (
				<LikeIcon className='w-5 h-5' />
			) : (
				<HeartIcon className='w-5 h-5' />
			)}
			{likes}
		</li>
	);
}
