import CommentsFeed from '@/components/comments-feed';
import Header from '@/components/header';
import Post from '@/components/post';
import TweetForm from '@/components/tweet-form';
import { auth } from '@/lib/auth';
import { getPostById } from '@/lib/queries';

export default async function PostPage({
	params,
}: {
	params: { postId: string };
}) {
	const session = await auth();
	const post = await getPostById(params.postId);

	if (!post) return <h3>No post found</h3>;
	return (
		<>
			<Header title='Tweet' back />
			<div className='p-4 hover:cursor-pointer hover:bg-foreground/5 border-b border-input'>
				<Post
					id={post.id}
					userId={post.user.id}
					name={post.user.name}
					username={post.user.username}
					body={post.body}
					postedAt={post.createdAt}
					profileImage={post.user.profileImage}
					image={post.image}
					comments={post.comments.length}
					likes={post.likedIds.length}
					liked={post.likedIds.includes(session?.user.id || '')}
				/>
			</div>
			{session ? <TweetForm postId={post.id} /> : null}
			<CommentsFeed
				comments={post.comments as Array<Comment & { user: User }>}
			/>
		</>
	);
}
