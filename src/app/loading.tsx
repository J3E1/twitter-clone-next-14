import LoadingSpinner from '@/components/loading-spinner';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Loading',
};
export default function LoadingPage() {
	return (
		<div className='flex justify-center items-center mt-72'>
			<LoadingSpinner className='h-10 w-10' />
		</div>
	);
}
