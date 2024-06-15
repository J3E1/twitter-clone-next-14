import { Heart, MessageCircle, HeartIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
	content: string;
	name: string;
	username: string;
	date: string;
	src: string;
	initials: string;
	followers: string;
	following: string;
	description: string;
};
export default function Post({
	content,
	name,
	username,
	date,
	src,
	initials,
	followers,
	following,
	description,
}: Props) {
	return (
		<div className='flex flex-1 gap-x-4'>
			<div className='flex-shrink-0'>
				<Avatar>
					<AvatarImage src={src} alt={name} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
			</div>
			<div className='flex flex-col flex-1'>
				<div className='flex flex-1'>
					<div className='flex flex-1 gap-x-1 text-sm'>
						<span className='text-foreground font-bold'>{name}</span>
						<span className='text-muted-foreground font-medium'>@{username}</span>·
						<span className='text-muted-foreground font-medium'>{date}</span>
					</div>
					<div className=''></div>
				</div>
				<div className='text-sm text-foreground mb-4'>{content}</div>
				<div>
					<ul className='flex gap-x-5 xl:gap-x-6 text-xs text-muted-foreground'>
						<li className='flex items-center hover:cursor-pointer hover:text-foreground justify-center gap-x-2'>
							<MessageCircle className='w-5 h-5' />
							20
						</li>
						<li className='flex items-center hover:cursor-pointer hover:text-foreground justify-center gap-x-2'>
							<HeartIcon className='w-5 h-5' />
							23
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
