import { Ellipsis } from "lucide-react";
import Link from "next/link";

type Props = { category: string; title: string; stat: string };
export default function PanelItemTrends({ category, title, stat }: Props) {
	return (
		<div className='flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-foreground/10'>
			<div className='flex flex-col gap-y-1 gap-x-2 flex-1'>
				<p className='text-xs text-muted-foreground font-medium'>
					{category} · Trending
				</p>
				<p className='text-sm font-bold text-foreground'>{title}</p>
				<p className='text-xs text-muted-foreground font-medium'>{stat} Tweets</p>
			</div>
			<div className=''>
				<Link href='/'>
					<Ellipsis  className='w-6 h-6' />
				</Link>
			</div>
		</div>
	);
}
