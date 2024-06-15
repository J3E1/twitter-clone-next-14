import Header from '@/components/header';
import Feed from '@/components/feed';
import TweetForm from '@/components/tweet-form';

export default function Home() {
	return (
		<>
			<Header title='Home' />
			<TweetForm />
			<Feed />
		</>
	);
}
