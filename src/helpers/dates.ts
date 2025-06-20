export function isToday(someDate: Date): boolean {
	const today = new Date(); // Get the current date and time
	return someDate.getDate() === today.getDate() &&
		someDate.getMonth() === today.getMonth() &&
		someDate.getFullYear() === today.getFullYear();
}