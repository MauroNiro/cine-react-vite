const putShow = async (newShow, showId) => {
    try {
        const response = await fetch(`https://localhost:7104/shows/${showId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                price: newShow.price,
                date: newShow.date
            })
        })
        if (!response.ok) {
            throw new Error("response not ok")
        }
        return response.ok
    }
    catch (error) {
        console.error('There was a problem with the fetch petition:', error);
        return false;
    }
}
export default putShow