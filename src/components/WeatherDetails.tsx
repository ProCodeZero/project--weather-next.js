import { ReactNode } from 'react';
import { BiTachometer } from 'react-icons/bi';
import { CgDrop } from 'react-icons/cg';
import { FaWind } from 'react-icons/fa6';
import { FiEye, FiSunrise, FiSunset } from 'react-icons/fi';

export interface WeatherDetailsProps {
	visibility: string;
	humidity: string;
	windSpeed: string;
	airPressure: string;
	sunrise: string;
	sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
	const { visibility, humidity, windSpeed, airPressure, sunrise, sunset } = props;

	return (
		<>
			<SingleWeatherDetail icon={<FiEye />} information="Visibility" value={visibility} />
			<SingleWeatherDetail icon={<CgDrop />} information="Humidity" value={humidity} />
			<SingleWeatherDetail icon={<FaWind />} information="Wind Speed" value={windSpeed} />
			<SingleWeatherDetail icon={<BiTachometer />} information="Air Pressure" value={airPressure} />
			<SingleWeatherDetail icon={<FiSunrise />} information="Sunrise" value={sunrise} />
			<SingleWeatherDetail icon={<FiSunset />} information="Sunset" value={sunset} />
		</>
	);
}

export interface SingleWeatherDetailProps {
	information: string;
	icon: ReactNode;
	value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
	return (
		<div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
			<p className="whitespace-nowrap">{props.information}</p>
			<div className="text-3xl">{props.icon}</div>
			<p>{props.value}</p>
		</div>
	);
}
