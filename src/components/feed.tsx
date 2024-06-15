import Post from "./post";

const items = [
	{
		name: 'John Doe',
		username: 'johndoe',
		following: '138',
		followers: '2,218',
		content: 'I love Figma',
		description: 'I design and hug auto layout everyday',
		date: '2h',
		src: 'https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
];
type Props = {};
export default function Feed({}: Props) {
	return (
		<>
			<ul className='divide-y divide-input'>
				{items.map(
					(
						{
							name,
							username,
							content,
							date,
							src,
							initials,
							following,
							followers,
							description,
						},
						i
					) => (
						<li key={`username-${i}`} className='p-4'>
							<Post
								name={name}
								username={username}
								content={content}
								date={date}
								src={src}
								initials={initials}
								description={description}
								followers={followers}
								following={following} />
						</li>
					)
				)}
			</ul>
		</>
	);
}
