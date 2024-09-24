export const formatDate = (todoDueDate) => {
    const TodoIsoDate = todoDueDate
    const date = new Date(TodoIsoDate)

    // Helper function to get the ordinal suffix for the day
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    // Extract day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Short month name
    const year = date.getFullYear();

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;

    return formattedDate
}

