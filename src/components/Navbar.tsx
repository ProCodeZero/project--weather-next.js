import { loadingCityAtom, placeAtom } from '@/app/atom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { FormEvent, useState } from 'react';
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import SearchBox from './SearchBox';
type Props = { location: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {
	const [city, setCity] = useState('');
	const [error, setError] = useState('');
	//
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const [place, setPlace] = useAtom(placeAtom);
	const [_, setLoadingCity] = useAtom(loadingCityAtom);

	async function handleInputChange(value: string) {
		setCity(value);
		if (value.length >= 3) {
			try {
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/find?q=${value}&apiid=${API_KEY}`
				);
				const suggestions = response.data.list.map((item: any) => item.name);
				setSuggestions(suggestions);
				setError('');
				setShowSuggestions(true);
			} catch (error) {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}

	function handleSuggestionClick(value: string) {
		setCity(value);
		setShowSuggestions(false);
	}

	function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
		setLoadingCity(true);
		e.preventDefault();
		if (suggestions.length === 0) {
			setError('Location not found');
			setLoadingCity(false);
		} else {
			setTimeout(() => {
				setError('');
				setPlace(city);
				setLoadingCity(false);
				setShowSuggestions(false);
			}, 500);
		}
	}

	function handleCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				try {
					setLoadingCity(true);

					const response = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
					);

					setTimeout(() => {
						setLoadingCity(false);
						setPlace(response.data.name);
					}, 500);
				} catch (error) {
					setLoadingCity(false);
				}
			});
		}
	}

	return (
		<>
			<nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
				<div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
					<div className="flex items-center justify-center gap-2">
						<h2 className="text-gray-500 text-3xl">Weather</h2>
						<MdWbSunny className="text-3xl mt-1 text-yellow-300" />
					</div>
					<section className="flex gap-2  items-center">
						<MdMyLocation
							title="Your current location"
							className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
							onClick={handleCurrentLocation}
						/>
						<MdOutlineLocationOn className="text-3xl text-gray-700" />
						<p className="text-slate-900/80 text-sm">{location}</p>
						<div className="relative hidden md:flex">
							<SearchBox
								value={city}
								onSubmit={handleSubmitSearch}
								onChange={(e) => handleInputChange(e.target.value)}
							/>
							<SuggestionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
						</div>
					</section>
				</div>
			</nav>
			<section className="flex max-w-7xl px-3 md:hidden">
				<div className="relative">
					<SearchBox
						value={city}
						onSubmit={handleSubmitSearch}
						onChange={(e) => handleInputChange(e.target.value)}
					/>
					<SuggestionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
				</div>
			</section>
		</>
	);
}

export interface SuggestionBoxProps {
	showSuggestions: boolean;
	suggestions: string[];
	handleSuggestionClick: (item: string) => void;
	error: string;
}

function SuggestionBox(props: SuggestionBoxProps) {
	const { showSuggestions, suggestions, handleSuggestionClick, error } = props;
	return (
		<>
			{((showSuggestions && suggestions.length > 1) || error) && (
				<ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
					{error && suggestions.length < 1 && <li className="text-red-500 p-1">{error}</li>}
					{suggestions.map((item, i) => (
						<li
							key={i}
							onClick={() => handleSuggestionClick(item)}
							className="cursor-pointer rounded p-1 hover:bg-gray-200"
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</>
	);
}
