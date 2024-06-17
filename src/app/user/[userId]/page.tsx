import Feed from '@/components/feed';
import Header from '@/components/header';
import UserBio from '@/components/user-bio';
import UserHero from '@/components/user-hero';
import { auth } from '@/lib/auth';
import { getUserById } from '@/lib/queries';

export default async function UserProfile({
	params,
}: {
	params: { userId: string };
}) {
	const session = await auth();
	const user = await getUserById(params.userId);

	if (!user) return <h3>No user found</h3>;

	return (
		<>
			<Header title={user.username} back />
			<UserHero
				profileImage={user.profileImage}
				coverImage={user.coverImage}
				name={user.name}
			/>
			<UserBio
				bio={user.bio}
				createdAt={user.createdAt}
				followersCount={user.followersCount}
				followingIds={user.followingIds}
				name={user.name}
				session={session}
				userId={user.id}
				username={user.username}
			/>
			<Feed
				session={session}
				posts={user.posts as Array<Post & { user: User; comments: Comment[] }>}
			/>
		</>
	);
}
