import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Nav from '@/components/nav';
import Search from '@/components/search';
import WhatsHappeningPanel from '@/components/what-happening-panel';
import FollowPanel from '@/components/follow-panel';
import Footer from '@/components/footer';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import { Toaster } from '@/components/ui/toaster';

const fontSans = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: {
		template: '%s | Litter',
		default: 'Litter',
	},
	description:
		'Litter - A modern Twitter clone built with Next.js 14, showcasing the latest web technologies and design patterns.',
	openGraph: {
		title: 'Litter',
		description:
			'Litter - Connect and share with friends and the world around you.',
		url: 'https://litter-v2.vercel.app/',
		siteName: 'Litter',
		images: [
			{
				url: '/image.jpg',
				width: 1200,
				height: 630,
				alt: 'Litter',
			},
		],
		type: 'website',
	},
	icons: {
		icon: '/favicon.ico',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang='en' className='dark'>
			<SessionProvider session={session}>
				<body
					className={cn(
						'min-h-screen bg-background text-foreground font-sans antialiased',
						fontSans.variable
					)}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange>
						<div className='min-h-screen flex max-w-7xl mx-auto lg:grid lg:grid-cols-10 gap-5'>
							<Nav session={session} />
							<main className='mr-0 lg:mr-5 xl:mr-0 col-span-8 xl:col-span-5 w-full border border-x-input'>
								{children}
							</main>
							<aside className='col-span-3 hidden xl:flex flex-col w-[350px]'>
								<div className='sticky top-0'>
									<Search />
									<FollowPanel session={session} />
									<WhatsHappeningPanel />
									<Footer />
								</div>
							</aside>
						</div>
						<Toaster />
					</ThemeProvider>
				</body>
			</SessionProvider>
		</html>
	);
}
