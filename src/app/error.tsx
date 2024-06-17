'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);
	return (
		<div className='mt-60 flex flex-col items-center justify-center bg-background/60'>
			<div className='bg-background shadow-md rounded-lg p-6 max-w-lg text-center'>
				<h1 className='text-3xl font-bold text-red-600'>Oops!</h1>
				<p className='mt-4 text-lg text-muted-foreground'>Something went wrong.</p>
				<div className='mt-6'>
					<Button onClick={router.back} className='mr-4'>
						Go Back
					</Button>
					<Button
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset()
						}
						variant='outline'>
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}
