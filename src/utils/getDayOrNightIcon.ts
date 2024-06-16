export function getDayOrNightIcon(icon_name: string, dateTimeString: string): string {
	const hours = new Date(dateTimeString).getHours();
	const isDayTime = hours >= 6 && hours <= 18;
	return isDayTime ? icon_name.replace(/.$/, 'd') : icon_name.replace(/.$/, 'n');
}
