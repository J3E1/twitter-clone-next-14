import { ReactNode } from 'react';
import { Bell, Home, LogOut, Search, Twitter, User } from 'lucide-react';
import NavItem from './nav-item';
import AccountNavItem from './account-nav-item';
import TweetDialog from './tweet-dialog';
import { Button } from './ui/button';
import LogoutButton from './log-out';
import TwitterIcon from './twitter-icon';

interface NavLinkItem {
	href: string;
	text: string;
	icon?: ReactNode;
}

const items: NavLinkItem[] = [
	{
		href: '/user/6562342e0bdffda6d74b3dd9',
		text: 'Home',
		icon: <Home className='w-6 h-6' />,
	},
	// {
	// 	href: '/explore',
	// 	text: 'Explore',
	// 	icon: <Search className='w-6 h-6' />,
	// },
	{
		href: '/post/6562342e0bdffda6d74b3dd9',
		text: 'Notifications',
		icon: <Bell className='w-6 h-6' />,
	},
	{
		href: '/profile',
		text: 'Profile',
		icon: <User className='w-6 h-6' />,
	},
];

export default function Nav() {
	return (
		<header className='flex w-14 mx-0 lg:mx-2 xl:mx-0 lg:col-span-2 '>
			<div className='flex flex-1 xl:w-60 flex-col fixed h-full'>
				<div className='flex flex-col flex-1 items-center lg:items-stretch'>
					<NavItem href='/home'>
						<TwitterIcon className='h-6 w-6'/>
					</NavItem>
					{items.map(({ href, text, icon }, i) => (
						<div
							key={`header-${i}`}
							// value={`item-${i + 1}`}
							className='rounded-lg focus:outline-none overflow-hidden'>
							<NavItem href={href}>
								{icon}
								<div className='hidden lg:inline-flex flex-none text-lg font-medium'>
									{text}
								</div>
							</NavItem>
						</div>
					))}
					<LogoutButton />
					{/* <MoreSettings /> */}
					<TweetDialog />
				</div>
				<div>
					<AccountNavItem />
				</div>
			</div>
		</header>
	);
}
