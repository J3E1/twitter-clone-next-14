'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { followAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Props = { isFollowing: boolean; userId: string };
export default function FollowButton({ isFollowing, userId }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const clickHandler = async () => {
		try {
			setIsLoading(true);
			const res = await followAction(userId);
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
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	return (
		<Button
			disabled={isLoading}
			onClick={clickHandler}
			variant={isFollowing ? 'outline' : 'default'}>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
}
