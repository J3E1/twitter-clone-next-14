import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
	title: string;
	href: string;
	children: ReactNode;
};
export default function Panel({ children, href, title }: Props) {
	return (
		<div className='bg-background rounded-xl mb-3 border border-input'>
			<div className='px-4 py-4'>
				<h2 className='text-xl font-bold leading-none'>{title}</h2>
			</div>
			{children}
			<div className='px-4 py-4'>
				<Link className='text-sm font-medium text-blue-600' href={href}>
					Show more
				</Link>
			</div>
		</div>
	);
}
