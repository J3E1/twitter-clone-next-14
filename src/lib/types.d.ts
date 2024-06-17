interface User {
	id: string;
	name: string;
	username: string;
	bio?: string | null;
	email: string;
	emailVerified?: Date | null;
	image?: string | null;
	coverImage?: string | null;
	profileImage?: string | null;
	hashedPassword: string;
	createdAt: Date;
	updatedAt: Date;
	followingIds: string[];
	hasNotification?: boolean | null;
}

interface Post {
	id: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	likedIds: string[];
	image?: string | null;
}

interface Comment {
	id: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	postId: string;
}

interface Notification {
	id: string;
	body: string;
	userId: string;
	createdAt: Date;
	read: boolean;
	fromPostId: string | null;
	fromUserId: string | null;
	username: string | null;
	userPhoto: string | null;
}
