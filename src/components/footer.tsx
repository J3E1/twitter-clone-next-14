import Link from 'next/link';

type Props = {};
export default function Footer({}: Props) {
	return (
		<div className='flex flex-wrap gap-x-3 gap-y-2 px-4 py-4 text-xs text-slate-600 mb-3'>
			<Link href='/'>Terms of Service</Link>
			<Link href='/'>Privacy Policy</Link>
			<Link href='/'>Cookie Policy</Link>
			<Link href='/'>Accessibility</Link>
			<Link href='/'>Ads info</Link>
			<Link href='/'>More</Link>
			<div className=''>© 2024</div>
		</div>
	);
}
