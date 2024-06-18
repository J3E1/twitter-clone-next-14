'use client';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export default function OAuthButton() {
	const { toast } = useToast();

	const clickHandler = () => {
		toast({
			title: 'Not available at this moment',
			variant: 'warning',
		});
	};
	return (
		<Button variant='outline' type='button' className='w-full' onClick={clickHandler}>
			Continue with Google
		</Button>
	);
}
