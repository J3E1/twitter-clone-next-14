import { getAllByUserId } from '@/lib/queries';
import Post from './post';
import { Session } from 'next-auth';

type Props = {
	posts: Array<Post & { user: User; comments: Comment[] }>;
	session: Session | null;
};

export default async function Feed({ posts, session }: Props) {
	return (
		<>
			<ul className='divide-y divide-input'>
				{posts?.map(
					({ id, user, body, createdAt, image, comments, likedIds }) => (
						<li
							key={id}
							className='p-4 hover:cursor-pointer hover:bg-foreground/5'>
							<Post
								id={id}
								userId={user.id}
								name={user.name}
								username={user.username}
								body={body}
								postedAt={createdAt}
								profileImage={user.profileImage}
								image={image}
								comments={comments.length}
								likes={likedIds.length}
								liked={likedIds.includes(session?.user.id || '')}
							/>
						</li>
					)
				)}
			</ul>
		</>
	);
}
