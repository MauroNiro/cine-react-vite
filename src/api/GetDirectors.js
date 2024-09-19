const getDirectors = async () => {
    try {
        const response = await fetch("https://localhost:7104/directors");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const directors = await response.json();
        return directors;
    } catch (error) {
        console.error('There was a problem with the fetch petition:', error);
    }
};
export default getDirectors;