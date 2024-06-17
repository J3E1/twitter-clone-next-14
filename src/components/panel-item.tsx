import { auth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Session } from 'next-auth';
import Link from 'next/link';

type Props = {
	name: string;
	id: string;
	username: string;
	src: string | null;
	initials: string;
	session: Session | null;
};
export default async function PanelItem({
	name,
	id,
	username,
	src,
	initials,
	session,
}: Props) {
	const showFollowButton = session && !session.user.followingIds.includes(id);
	return (
		<Link href={`/user/${id}`} className='flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-foreground/10'>
			<div className='flex items-center gap-x-2 flex-1'>
				<div className='flex flex-1 xl:flex-none justify-center xl:justify-start'>
					<Avatar>
						{src ? <AvatarImage alt={name} src={src} /> : null}
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</div>
				<div className='hidden xl:flex flex-col '>
					<p className='text-base font-semibold'>{name}</p>
					<p className='text-sm text-muted-foreground font-medium'>
						@{username}
					</p>
				</div>
			</div>
			{showFollowButton ? (
				<div className=''>
					<Button size={'sm'}>Follow</Button>
				</div>
			) : null}
		</Link>
	);
}
