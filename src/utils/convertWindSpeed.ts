export function convertWindSpeed(speed: number): string {
	const speedInKilometersPerHour = Math.floor(speed * 3.6);
	return `${speedInKilometersPerHour} km/h`;
}
