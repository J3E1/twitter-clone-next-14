import { Heart, MessageCircle, HeartIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';
import { MouseEvent } from 'react';
import RedirectTo from './redirect-to-user';
import LikeButton from './like-button';
import Image from 'next/image';

type Props = {
	name: string;
	userId: string;
	id: string;
	username: string;
	body: string;
	postedAt: Date;
	profileImage: string | null | undefined;
	image: string | null | undefined;
	comments: number;
	likes: number;
	liked: boolean;
};
export default function Post({
	body,
	image,
	id,
	userId,
	name,
	postedAt,
	profileImage,
	username,
	comments,
	likes,
	liked,
}: Props) {
	const date = formatDistanceToNowStrict(new Date(postedAt));

	return (
		<RedirectTo href={`/post/${id}`} className='flex flex-1 gap-x-4'>
			<RedirectTo href={`/user/${userId}`} className='flex-shrink-0'>
				<Avatar>
					{profileImage ? <AvatarImage src={profileImage} alt={name} /> : null}
					<AvatarFallback>{`${(name || 'test')[0]}`}</AvatarFallback>
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
				{image ? (
					<div className='w-full relative -z-10 h-80 mb-4'>
						<Image
							className='rounded-3xl'
							src={image}
							alt='Tweet image'
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
				) : null}
				<div>
					<ul className='flex gap-x-5 xl:gap-x-6 text-xs text-muted-foreground'>
						<li className='flex items-center hover:cursor-pointer hover:text-foreground justify-center gap-x-2'>
							<MessageCircle className='w-5 h-5' />
							{comments}
						</li>
						<LikeButton likes={likes} postId={id} liked={liked} />
					</ul>
				</div>
			</div>
		</RedirectTo>
	);
}
