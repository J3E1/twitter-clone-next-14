'use client';
import { useState } from 'react';
import LoginForm from './login-form';
import RegisterForm from './register-form';

export function AuthForm() {
	const [registerMode, setRegisterMode] = useState(false);

	return registerMode ? (
		<RegisterForm setMode={setRegisterMode} />
	) : (
		<LoginForm setMode={setRegisterMode} />
	);
}
