import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { ReactNode, LinkHTMLAttributes } from 'react';

export interface ButtonProps
  extends LinkHTMLAttributes<HTMLAnchorElement> {
  href:string
}

export default function NavItem({ children, href}: ButtonProps) {
	return (
		<Link className='flex items-center space-x-4 px-4 lg:pl-4 lg:pr-5 py-3 hover:bg-foreground/10 text-foreground my-1 max-w-fit rounded-full' href={href}>
			{children}
		</Link>
	);
}
