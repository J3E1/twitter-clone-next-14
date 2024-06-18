import Header from '@/components/header';
import Notification from '@/components/notification';
import { Label } from '@/components/ui/label';
import { getAllNotificationsOfCurrentUser } from '@/lib/queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Notifications',
};

export default async function NotificationPage() {
	const notifications = await getAllNotificationsOfCurrentUser();

	if (!notifications.length) {
		console.log("🚀 ~ file: page.tsx:10 ~ NotificationPage ~ !notifications.length:", !notifications.length);

		return (
			<>
				<Header title='Notifications' back />
				<Label className='block text-center my-8'>Noting to show</Label>
			</>
		);
	}

	return (
		<>
			<Header title='Notifications' back />
			<ul className='divide-y divide-input'>
				{notifications?.map(({ fromUser, notification }) => (
					<li
						key={notification.id}
						className='p-4 hover:cursor-pointer hover:bg-foreground/5'>
						<Notification
							id={notification.id}
							body={notification.body}
							createdAt={notification.createdAt}
							fromUserId={notification.fromUserId}
							fromPostId={notification.fromPostId}
							profileImage={fromUser?.profileImage}
							username={fromUser?.username}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
