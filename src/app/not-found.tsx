import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='mt-60 flex flex-col items-center justify-center bg-background/60'>
			<div className='bg-background shadow-md rounded-lg p-6 max-w-lg text-center'>
				<h1 className='text-3xl font-bold text-red-600'>Oops!</h1>
				<p className='mt-4 text-lg text-muted-foreground'>
					Something went wrong. We can&apos;t find the page you&apos;re looking for.
				</p>
				<div className='mt-6'>
					<Link href='/'>Go to Home</Link>
				</div>
			</div>
		</div>
	);
}
