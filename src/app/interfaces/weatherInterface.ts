interface WeatherData {
	cod: string;
	message: number;
	cnt: number;
	list: WeatherEntry[];
	city: CityInfo;
}

interface WeatherEntry {
	dt: number;
	main: MainInfo;
	weather: WeatherInfo[];
	clouds: CloudInfo;
	wind: WindInfo;
	visibility: number;
	pop: number;
	rain?: RainInfo;
	sys: SysInfo;
	dt_txt: string;
}

interface MainInfo {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	temp_kf: number;
}

interface WeatherInfo {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface CloudInfo {
	all: number;
}

interface WindInfo {
	speed: number;
	deg: number;
	gust: number;
}

interface RainInfo {
	'3h': number;
}

interface SysInfo {
	pod: string;
}

interface CityInfo {
	id: number;
	name: string;
	coord: CoordInfo;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}

interface CoordInfo {
	lat: number;
	lon: number;
}
