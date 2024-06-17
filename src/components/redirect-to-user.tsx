'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

export default function RedirectTo({
	children,
	href,
    className
}: {
	children: ReactNode;
	href: string;
	className: string;
}) {
	const router = useRouter();

	const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		router.push(href);
        return;
	};
	return <div onClick={clickHandler} className={className}>{children}</div>;
}
