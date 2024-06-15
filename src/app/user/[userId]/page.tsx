import Feed from '@/components/feed';
import Header from '@/components/header';
import UserBio from '@/components/user-bio';
import UserHero from '@/components/user-hero';

export default function UserProfile() {
	return (
		<>
			<Header title='Test user' back />
			<UserHero />
			<UserBio />
			<Feed />
		</>
	);
}
