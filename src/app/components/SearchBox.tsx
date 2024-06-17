import { cn } from '@/utils/cn';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

type Props = {
	className?: string;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
	return (
		<form onSubmit={props.onSubmit} className={cn('flex relative items-center justify-center h-10', props.className)}>
			<input
				onChange={props.onChange}
				className="h-full px-2 py-2 appearance-none bor bg-transparent border-2 border-gray-200 text-gray-700 rounded-l-md hover:border-gray-300"
				type="text"
				placeholder="Search"
				value={props.value}
			/>
			<button className="rounded-r-md h-full px-2 bg-yellow-300 hover:bg-yellow-400">
				<IoSearchOutline className="text-2xl " />
			</button>
		</form>
	);
}
