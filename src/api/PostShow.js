const postShow = async (newShow, movieId) => {
    try {
        const response = await fetch("https://localhost:7104/shows", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                movieId: movieId,
                price: newShow.price,
                date: newShow.date
            })
        })
        if (!response.ok) {
            throw new Error("response not ok")
        }
        return response.json()
    }
    catch (error) {
        console.error('There was a problem with the fetch petition:', error);
        return {}
    }
}
export default postShow;