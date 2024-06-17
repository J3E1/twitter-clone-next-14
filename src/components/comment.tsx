import { formatDistanceToNowStrict } from 'date-fns';
import RedirectTo from './redirect-to-user';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
	name: string;
	userId: string;
	id: string;
	username: string;
	body: string;
	postedAt: Date;
	profileImage: string | null | undefined;
};
export default function Comment({
	body,
	userId,
	name,
	postedAt,
	profileImage,
	username,
}: Props) {
	const date = formatDistanceToNowStrict(new Date(postedAt));
	return (
		<div className='flex flex-1 gap-x-4'>
			<RedirectTo href={`/user/${userId}`} className='flex-shrink-0'>
				<Avatar>
					{profileImage ? <AvatarImage src={profileImage} alt={name} /> : null}
					<AvatarFallback>{`${(name || 'N')[0]}`}</AvatarFallback>
				</Avatar>
			</RedirectTo>
			<div className='flex flex-col flex-1'>
				<div className='flex flex-1'>
					<RedirectTo
						href={`/user/${userId}`}
						className='flex flex-1 gap-x-1 text-sm'>
						<span className='text-foreground font-bold hover:underline'>
							{name}
						</span>
						<span className='text-muted-foreground font-medium hover:underline'>
							@{username}
						</span>
						·<span className='text-muted-foreground font-medium'>{date}</span>
					</RedirectTo>
				</div>
				<div className='text-sm text-foreground mb-4'>{body}</div>
			</div>
		</div>
	);
}
