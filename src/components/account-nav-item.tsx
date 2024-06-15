import ThemeToggle from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {};
export default function AccountNavItem({}: Props) {
	return (
		<div className='flex flex-1 items-center gap-x-2 px-4 py-8 '>
			<div className='hidden lg:flex items-center gap-x-3 flex-1'>
				<div className='flex flex-1 lg:flex-none justify-center lg:justify-start'>
					<Avatar>
						<AvatarImage
							alt={'Roy Quilor'}
							src={
								'https://pbs.twimg.com/profile_images/1489998205236527108/q2REh8nW_400x400.jpg'
							}
						/>
						<AvatarFallback>{'RQ'}</AvatarFallback>
					</Avatar>
				</div>
				<div className='hidden lg:flex flex-col'>
					<p className='text-base font-semibold'>Roy Quilor</p>
					<p className='text-sm text-muted-foreground font-medium'>
						@RoyQuilor
					</p>
				</div>
			</div>
			<div className=''>
				<ThemeToggle />
				{/* <Link href='/'>
					<HiOutlineEllipsisHorizontal className='w-6 h-6' />
				</Link> */}
			</div>
		</div>
	);
}
