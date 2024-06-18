import Header from '@/components/header';
import PanelItem from '@/components/panel-item';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/auth';
import { getFollowersByUserId } from '@/lib/queries';

type Props = { params: { userId: string; type: 'following' | 'followers' } };

export async function generateMetadata({ params: { type } }: Props) {
	return {
		title: type === 'following' ? `Users's Following` : `Users's Followers`,
	};
}

export default async function UserFollowDetailsPage({
	params: { type, userId },
}: Props) {
	const session = await auth();
	const data = await getFollowersByUserId(userId, type);
	const title =
		type === 'following'
			? `${data.user.username}'s Following`
			: `${data.user.username}'s Followers`;
	return (
		<>
			<Header title={title} back />
			{!data.followers.length ? (
				<Label className='block text-center my-8'>{`No ${type}`}</Label>
			) : (
				data.followers.map(user => (
					<PanelItem
						id={user.id}
						key={user.id}
						src={user.profileImage}
						name={user.name}
						username={user.username}
						initials={user.name[0]}
						session={session}
					/>
				))
			)}
		</>
	);
}
