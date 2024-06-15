import Feed from '@/components/feed';
import Header from '@/components/header';
import TweetForm from '@/components/tweet-form';

export default function PostPage() {
	return (
		<>
			<Header title='Tweet' back />
			<Feed />
            <TweetForm />
			<Feed />
		</>
	);
}
