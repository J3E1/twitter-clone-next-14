import { ReactNode } from 'react';
import {
	Bell,
	BellDot,
	Home,
	LogOut,
	Search,
	Twitter,
	User,
} from 'lucide-react';
import NavItem from './nav-item';
import AccountNavItem from './account-nav-item';
import TweetDialog from './tweet-dialog';
import { Button } from './ui/button';
import LogoutButton from './log-out';
import TwitterIcon from './twitter-icon';
import { auth } from '@/lib/auth';
import { Session } from 'next-auth';
import AuthCard from './auth-card';

interface NavLinkItem {
	href: string;
	text: string;
	icon?: ReactNode;
}

export default async function Nav({ session }: { session: Session | null }) {
	return (
		<header className='flex w-14 mx-0 lg:mx-2 xl:mx-0 lg:col-span-2 '>
			<div className='flex flex-1 lg:w-48 xl:w-60 flex-col fixed h-full'>
				<div className='flex flex-col flex-1 items-center lg:items-stretch'>
					<NavItem href='/home'>
						<TwitterIcon className='h-6 w-6' />
					</NavItem>
					{session ? (
						<>
							<NavItem href='/'>
								<Home className='w-6 h-6' />
								<div className='hidden lg:inline-flex flex-none text-lg font-medium'>
									Home
								</div>
							</NavItem>
							<div className='rounded-lg focus:outline-none overflow-hidden'>
								<NavItem href='/notification'>
									{session.user.hasNotification ? (
										<BellDot className='w-6 h-6' />
									) : (
										<Bell className='w-6 h-6' />
									)}

									<div className='hidden lg:inline-flex flex-none text-lg font-medium'>
										Notifications
									</div>
								</NavItem>
							</div>
							<div className='rounded-lg focus:outline-none overflow-hidden'>
								<NavItem href={`/user/${session.user.id}`}>
									<User className='w-6 h-6' />
									<div className='hidden lg:inline-flex flex-none text-lg font-medium'>
										Profile
									</div>
								</NavItem>
							</div>
							<LogoutButton />
							<TweetDialog />
						</>
					) : (
						<AuthCard />
					)}
					{/* <MoreSettings /> */}
				</div>
				<div>
					<AccountNavItem session={session} />
				</div>
			</div>
		</header>
	);
}
