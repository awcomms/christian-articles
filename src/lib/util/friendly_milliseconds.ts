export const friendly_milliseconds = (milliseconds: number): string => {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const years = Math.floor(days / 365);
	const centuries = Math.floor(years / 100);
	const millenia = Math.floor(centuries / 10);

	if (milliseconds < 1000) {
		return `${milliseconds} milliseconds`;
	} else if (seconds < 60) {
		return `${seconds} seconds and ${milliseconds % 1000} milliseconds`;
	} else if (minutes < 60) {
		return `${minutes} minutes, ${seconds % 60} seconds and ${milliseconds % 1000} milliseconds`;
	} else if (hours < 24) {
		return `${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds and ${
			milliseconds % 1000
		} milliseconds`;
	} else if (days < 365) {
		return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${
			seconds % 60
		} seconds and ${milliseconds % 1000} milliseconds`;
	} else if (years < 100) {
		return `${years} years, ${days % 365} days, ${hours % 24} hours, ${minutes % 60} minutes, ${
			seconds % 60
		} seconds and ${milliseconds % 1000} milliseconds`;
	} else if (centuries < 10) {
		return `${centuries} centuries, ${years % 100} years, ${days % 365} days, ${
			hours % 24
		} hours, ${minutes % 60} minutes, ${seconds % 60} seconds and ${
			milliseconds % 1000
		} milliseconds`;
	} else {
		return `${millenia} millenia, ${centuries % 10} centuries, ${years % 100} years, ${
			days % 365
		} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds and ${
			milliseconds % 1000
		} milliseconds`;
	}
};
