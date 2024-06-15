import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Feather } from 'lucide-react';
import TweetForm from './tweet-form';
import { AuthForm } from './auth-dialog';
export default function TweetDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='h-10 w-10 lg:h-12 lg:w-full mt-5 space-x-4'
					size={'icon'}>
					<Feather className='w-6 h-6' />
					<span className='hidden lg:inline font-semibold'>Tweet</span>
				</Button>
			</DialogTrigger>
			<DialogContent className=''>
				{/* <TweetForm isModal/> */}
        <AuthForm/>
			</DialogContent>
		</Dialog>
	);
}
