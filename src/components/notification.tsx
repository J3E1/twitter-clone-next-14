import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';

type Props = {
	profileImage: string | null;
	username: string;
	body: string;
	createdAt: Date;
	id: string;
	fromUserId: string | null;
	fromPostId: string | null;
};
export default function Notification({
	body,
	createdAt,
	profileImage,
	username,
	fromPostId,
	fromUserId,
}: Props) {
	const date = formatDistanceToNowStrict(new Date(createdAt));
	const href = fromPostId ? `/post/${fromPostId}` : `/user/${fromUserId}`;
	return (
		<Link href={href} className='flex flex-1 items-center gap-x-4'>
			<div className='flex-shrink-0'>
				<Avatar>
					{profileImage ? (
						<AvatarImage src={profileImage} alt={username} />
					) : null}
					<AvatarFallback>{`${username[0]}`}</AvatarFallback>
				</Avatar>
			</div>
			<div className='flex flex-1 text-sm text-foreground'>
				{body}{' '}
				<span className='text-muted-foreground font-medium'>· {date}</span>
			</div>
		</Link>
	);
}
