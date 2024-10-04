// utils/extractTime.js
export const extractTime = (dateString) => {
	const date = new Date(dateString);
	if (isNaN(date)) {
	  return ""; // Return an empty string if the date is invalid
	}
	return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formats time to HH:MM
  };
  