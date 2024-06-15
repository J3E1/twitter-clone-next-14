import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

type Props = {
	name: string;
	username: string;
	src: string;
	initials: string;
};
export default function PanelItem({ name, username, src, initials }: Props) {
	return (
		<div className='flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-foreground/10'>
			<div className='flex items-center gap-x-2 flex-1'>
				<div className='flex flex-1 xl:flex-none justify-center xl:justify-start'>
					<Avatar>
						<AvatarImage alt={name} src={src} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</div>
				<div className='hidden xl:flex flex-col '>
					<p className='text-base font-semibold'>{name}</p>
					<p className='text-sm text-muted-foreground font-medium'>@{username}</p>
				</div>
			</div>
			<div className=''>
				<Button size={'sm'}>Follow</Button>
			</div>
		</div>
	);
}
