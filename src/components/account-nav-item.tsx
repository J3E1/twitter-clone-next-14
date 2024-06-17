import { auth } from '@/lib/auth';
import ThemeToggle from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Session } from 'next-auth';

type Props = { session: Session | null };
export default async function AccountNavItem({ session }: Props) {
	return (
		<div className='flex flex-1 items-center gap-x-2 px-4 py-8 '>
			{session ? (
				<div className='hidden lg:flex items-center gap-x-3 flex-1'>
					<div className='flex flex-1 lg:flex-none justify-center lg:justify-start'>
						<Avatar>
							{session.user.profileImage ? (
								<AvatarImage
									src={session.user.profileImage}
									alt={session.user.name}
								/>
							) : null}
							<AvatarFallback>{`${session.user.name[0]}`}</AvatarFallback>
						</Avatar>
					</div>
					<div className='hidden lg:flex flex-col'>
						<p className='text-base font-semibold'>{session.user.name}</p>
						<p className='text-sm text-muted-foreground font-medium'>
							@{session.user.username}
						</p>
					</div>
				</div>
			) : null}
			<div className=''>
				<ThemeToggle />
				{/* <Link href='/'>
					<HiOutlineEllipsisHorizontal className='w-6 h-6' />
				</Link> */}
			</div>
		</div>
	);
}
