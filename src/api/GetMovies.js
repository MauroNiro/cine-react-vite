const getMovies = async () => {
    try {
        const response = await fetch("https://localhost:7104/movies");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('There was a problem with the fetch petition:', error);
    }
};
export default getMovies;