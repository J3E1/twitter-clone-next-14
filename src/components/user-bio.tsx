import { CalendarDays } from 'lucide-react';
import { Button } from './ui/button';
import { Session } from 'next-auth';
import FollowButton from './follow-button';
import EditProfile from './edit-profile';
import Link from 'next/link';

type Props = {
	userId: string;
	session: Session | null;
	name: string;
	username: string;
	bio: string | null;
	followersCount: number;
	createdAt: Date;
	followingIds: string[];
};
export default function UserBio({
	bio,
	name,
	username,
	followersCount,
	createdAt,
	session,
	userId,
	followingIds,
}: Props) {
	const isMyProfile = session?.user.id === userId;
	const isFollowing = session?.user.followingIds.includes(userId as string);

	return (
		<div className='border-b border-muted-foreground/20 pb-4'>
			<div className='flex justify-end pt-2 px-4'>
				{isMyProfile ? (
					<EditProfile bio={bio || ''} name={name} username={username} />
				) : (
					<FollowButton isFollowing={isFollowing || false} userId={userId} />
				)}
			</div>
			<div className='mt-8 px-4'>
				<div className='flex flex-col'>
					<p className='text-foreground text-2xl font-semibold'>{name}</p>
					<p className='text-md text-muted-foreground'>@{username}</p>
				</div>
				<div className='flex flex-col mt-4'>
					<p className='text-foreground'>{bio}</p>
					<div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
						<CalendarDays className='w-4 h-4' />
						<p>Joined {createdAt.toUTCString()}</p>
					</div>
				</div>
				<div className='flex flex-row items-center text-sm mt-4 gap-6'>
					<div className='flex flex-row items-center gap-1'>
						<p className='text-foreground font-semibold'>
							{followingIds.length}
						</p>
						<Link
							href={`/user/${userId}/following`}
							className='text-muted-foreground'>
							Following
						</Link>
					</div>
					<div className='flex flex-row items-center gap-1'>
						<p className='text-foreground font-semibold'>{followersCount}</p>
						<Link
							href={`/user/${userId}/followers`}
							className='text-muted-foreground'>
							Followers
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
