'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';

export function AuthForm({
	onOpenChange,
	open
}: {
	open:boolean
	onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
	const [registerMode, setRegisterMode] = useState(false);


	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button size='sm' className='w-full'>
					Sign In
				</Button>
			</DialogTrigger>
			<DialogContent className=''>
				{registerMode ? (
					<RegisterForm setMode={setRegisterMode} onOpenChange={onOpenChange} />
				) : (
					<LoginForm setMode={setRegisterMode} onOpenChange={onOpenChange} />
				)}
			</DialogContent>
		</Dialog>
	);
}
