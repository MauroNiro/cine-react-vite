const getShows = async () => {
    try {
        const response = await fetch("https://localhost:7104/shows");

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const shows = await response.json();
        return shows;
    } catch (error) {
        console.error('There was a problem with the fetch petition:', error);
    }
};
export default getShows