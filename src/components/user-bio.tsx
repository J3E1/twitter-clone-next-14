import { CalendarDays } from 'lucide-react';
import { Button } from './ui/button';

const user = {
	name: 'John Doe',
	username: 'johndoe',
	following: '138',
	followers: '2,218',
	content: 'I love Figma',
	bio: 'I design and hug auto layout everyday',
	date: '2h',
	src: 'https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
	initials: 'JD',
};

type Props = {};
export default function UserBio({}: Props) {
	const isMyProfile = true;
	const isFollowing = false;
	return (
		<div className='border-b border-muted-foreground/20 pb-4'>
			<div className='flex justify-end pt-2 px-4'>
				{isMyProfile ? (
					<Button variant={'outline'}>Edit</Button>
				) : (
					<Button variant={isFollowing ? 'outline' : 'default'}>
						{isFollowing ? 'Unfollow' : 'Follow'}
					</Button>
				)}
			</div>
			<div className='mt-8 px-4'>
				<div className='flex flex-col'>
					<p className='text-foreground text-2xl font-semibold'>{user.name}</p>
					<p className='text-md text-muted-foreground'>@{user?.username}</p>
				</div>
				<div className='flex flex-col mt-4'>
					<p className='text-foreground'>{user?.bio}</p>
					<div
						className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
						<CalendarDays className='w-4 h-4' />
						<p>Joined {new Date().toUTCString()}</p>
					</div>
				</div>
				<div className='flex flex-row items-center text-sm mt-4 gap-6'>
					<div className='flex flex-row items-center gap-1'>
						<p className='text-foreground font-semibold'>10</p>
						<p className='text-muted-foreground'>Following</p>
					</div>
					<div className='flex flex-row items-center gap-1'>
						<p className='text-foreground font-semibold'>20</p>
						<p className='text-muted-foreground'>Followers</p>
					</div>
				</div>
			</div>
		</div>
	);
}
