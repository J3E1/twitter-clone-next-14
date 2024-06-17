import Comment from "./comment";

export default function CommentsFeed({
	comments,
}: {
	comments: Array<Comment & { user: User }>;
}) {
	return (
		<ul className='divide-y divide-input'>
			{comments?.map(
				({ id, user, body, createdAt }) => (
					<li
						key={id}
						className='p-4 hover:cursor-pointer hover:bg-foreground/5'>
						<Comment
							id={id}
							userId={user.id}
							name={user.name}
							username={user.username}
							body={body}
							postedAt={createdAt}
							profileImage={user.profileImage}
						/>
					</li>
				)
			)}
		</ul>
	);
}
