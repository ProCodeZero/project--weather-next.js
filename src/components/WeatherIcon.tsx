import { cn } from '@/utils/cn';
import Image from 'next/image';
import { HTMLProps } from 'react';

export default function WeatherIcon(props: HTMLProps<HTMLDivElement> & { icon_name: string }) {
	return (
		<div {...props} className={cn('relative h-20 w-20')}>
			<Image
				width={100}
				height={100}
				alt="weather icon"
				className="absolute h-full w-full"
				src={`https://openweathermap.org/img/wn/${props.icon_name}@4x.png`}
			/>
		</div>
	);
}
