const deleteShowApi = async (showId) => {
    try {
        const response = await fetch(`https://localhost:7104/shows/${showId}`, {  // Added await and fixed the URL structure
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.ok;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return false;
    }
}

export default deleteShowApi;