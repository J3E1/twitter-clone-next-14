import { Search as SearchI } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

type Props = {};
export default function Search({}: Props) {
	return (
		<div className='sticky top-0 bg-background z-10 py-2 mb-3'>
			<form className='flex flex-col flex-1 gap-y-4'>
				<div className='flex flex-1 relative'>
					<SearchI className='w-5 h-5 left-2.5 top-2.5 absolute flex items-center text-muted-foreground' />
					<Input  placeholder='Search' className='pl-10'/>
					<Button className='sr-only'>
						Tweet
					</Button>
				</div>
			</form>
		</div>
	);
}
