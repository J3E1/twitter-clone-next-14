'use client';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EditUserSchema, editUserSchema } from '@/lib/schemas';
import { toast } from './ui/use-toast';
import { convertImageToBase64 } from '@/lib/utils';

type Props = { username: string; name: string; bio: string };
export default function EditProfile({ bio, name, username }: Props) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const editForm = useForm<EditUserSchema>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			name: name,
			username: username,
			bio: bio,
		},
	});
	async function onSubmit(values: EditUserSchema) {
		try {
			setIsLoading(true);
			let profileImage: null | string = null,
				coverImage: null | string = null;

			if (values.coverImage)
				coverImage = await convertImageToBase64(values.coverImage as File);

			if (values.profileImage)
				profileImage = await convertImageToBase64(values.profileImage as File);

			const userObj = {
				name: values.name,
				bio: values.bio,
				username: values.username,
				profileImage: profileImage,
				coverImage: coverImage,
			};

			const res: { message: string } = await fetch('/api/user/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userObj),
			}).then(res => res.json());

			toast({
				title: res.message,
				variant: 'success',
			});
			editForm.reset();
			router.refresh();
			setOpen(false);
		} catch (err) {
			toast({
				title: (err as Error).message,
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	}

	const coverImageRef = editForm.register('coverImage');
	const profileImageRef = editForm.register('profileImage');

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant={'outline'}>Edit</Button>
				</DialogTrigger>
				<DialogContent className=''>
					<Card className='mx-auto border-0 w-full'>
						<CardHeader>
							<CardTitle className='text-2xl'>Edit Profile</CardTitle>
							<CardDescription>Edit your profile details</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...editForm}>
								<form
									onSubmit={editForm.handleSubmit(onSubmit)}
									className='space-y-3'>
									<FormField
										control={editForm.control}
										name='coverImage'
										render={({ field }) => {
											return (
												<FormItem>
													<FormLabel>Cover Image</FormLabel>
													<FormControl>
														<Input
															disabled={isLoading}
															type='file'
															placeholder='shadcn'
															{...coverImageRef}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											);
										}}
									/>
									<FormField
										control={editForm.control}
										name='profileImage'
										render={({ field }) => {
											return (
												<FormItem>
													<FormLabel>Profile Image</FormLabel>
													<FormControl>
														<Input
															disabled={isLoading}
															type='file'
															placeholder='shadcn'
															{...profileImageRef}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											);
										}}
									/>
									<FormField
										control={editForm.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														disabled={isLoading}
														placeholder='John Doe'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={editForm.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input
														disabled={isLoading}
														placeholder='john@56'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={editForm.control}
										name='bio'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bio</FormLabel>
												<FormControl>
													<Input
														disabled={isLoading}
														placeholder='I like...'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type='submit' className='w-full'>
										Edit
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</DialogContent>
			</Dialog>
		</>
	);
}
