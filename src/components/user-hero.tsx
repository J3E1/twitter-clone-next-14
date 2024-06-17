import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
	coverImage: string | null;
	profileImage: string | null;
	name: string;
};
export default function UserHero({ coverImage, profileImage, name }: Props) {
	return (
		<>
			<div className='bg-muted-foreground/20 h-44 relative'>
				{coverImage && (
					<Image
						src={coverImage}
						fill
						alt='Cover Image'
						style={{ objectFit: 'cover' }}
					/>
				)}
				<div className='absolute -bottom-16 left-4'>
					<Avatar className='mt-1 border-4 border-background h-32 w-32'>
						{profileImage ? (
							<AvatarImage alt={name} src={profileImage} />
						) : null}
						<AvatarFallback className='text-5xl'>{name[0]}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</>
	);
}
