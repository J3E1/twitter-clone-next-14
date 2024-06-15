import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {};
export default function UserHero({}: Props) {
	return (
		<>
			<div className='bg-muted-foreground/20 h-44 relative'>
				{/* {coverImage && (
					<Image
						src={coverImage}
						fill
						alt='Cover Image'
						style={{ objectFit: 'cover' }}
					/>
				)} */}
				<div className='absolute -bottom-16 left-4'>
					<Avatar className='mt-1 border-4 border-background h-32 w-32'>
						<AvatarImage
							alt='Roy Quilor'
							src='https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
						/>
						<AvatarFallback>{'RQ'}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</>
	);
}
