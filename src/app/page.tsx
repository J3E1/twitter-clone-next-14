import Header from '@/components/header';
import Feed from '@/components/feed';
import TweetForm from '@/components/tweet-form';
import { getAllPosts } from '@/lib/queries';
import { auth } from '@/lib/auth';

export default async function Home() {
	const session = await auth();
	const posts = await getAllPosts();

	return (
		<>
			<Header title='Home' />
			{session ? <TweetForm /> : null}
			<Feed
				session={session}
				posts={posts as Array<Post & { user: User; comments: Comment[] }>}
			/>
		</>
	);
}
