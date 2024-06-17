import { Session } from 'next-auth';
import Panel from './panel';
import PanelItem from './panel-item';
import { getWhoToFollow } from '@/lib/queries';

export default async function FollowPanel({
	session,
}: {
	session: Session | null;
}) {
	const users = await getWhoToFollow();

	return (
		<Panel title='Who to follow' href='/'>
			{users.map(user => (
				<PanelItem
					id={user.id}
					key={user.id}
					src={user.profileImage}
					name={user.name}
					username={user.username}
					initials={user.name[0]}
					session={session}
				/>
			))}
		</Panel>
	);
}
