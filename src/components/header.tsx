'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = { title: string; back?: boolean };
export default function Header({ title, back = false }: Props) {
	const router = useRouter();
	return (
		<div className='sticky bg-background/60 z-10 backdrop-blur-md top-0'>
			<div className='flex items-center justify-between px-4 py-3'>
				<div>
					<h2 className='text-lg font-bold flex items-center justify-start gap-4'>
						{back && (
							<ArrowLeft className='cursor-pointer' onClick={router.back} />
						)}
						{title}
					</h2>
				</div>
			</div>
		</div>
	);
}
